// src/index.js - Main SDK entry point

import Storage from './storage';
import Network from './network';
import { generateUUID, getDeviceInfo, DeviceInfo } from './utils';

class TrackingSDK {
  constructor() {
    this.initialized = false;
    this.apiKey = null;
    this.userId = null;
    this.sessionId = null;
    this.config = {
      batchSize: 10,
      batchInterval: 30000, // 30 seconds
      endpoint: 'http://localhost:3000/events',
      flushOnBackground: true,
      debug: false
    };
    
    this.eventQueue = [];
    this.deviceInfo = null;
    this.storage = new Storage();
    this.network = new Network();
    this.batchIntervalId = null;
  }

  async initialize(apiKey, customConfig = {}) {
    if (this.initialized) {
      this.log('SDK already initialized');
      return;
    }

    try {
      this.apiKey = apiKey;
      this.config = { ...this.config, ...customConfig };
      this.deviceInfo = await getDeviceInfo();
      
      // Restore any unsent events from storage
      this.eventQueue = await this.storage.getUnsentEvents() || [];
      
      // Start batch sending interval
      this.startBatchInterval();
      
      // Start a new session
      this.startSession();
      
      this.initialized = true;
      this.log('SDK initialized successfully');
      
      // Track app opened event
      this.trackEvent('app_opened');

      return true;
    } catch (error) {
      this.log('Failed to initialize SDK', error);
      return false;
    }
  }

  log(message, error = null) {
    if (this.config.debug) {
      console.log(`[TrackingSDK] ${message}`, error || '');
    }
  }

  startBatchInterval() {
    if (this.batchIntervalId) {
      clearInterval(this.batchIntervalId);
    }
    
    this.batchIntervalId = setInterval(() => {
      this.sendBatchIfNeeded();
    }, this.config.batchInterval);
  }

  stopBatchInterval() {
    if (this.batchIntervalId) {
      clearInterval(this.batchIntervalId);
      this.batchIntervalId = null;
    }
  }

  async startSession() {
    this.sessionId = generateUUID();
    const timestamp = new Date().toISOString();
    
    await this.trackEvent('session_start', {
      session_id: this.sessionId,
      timestamp
    });
    
    await this.storage.setSessionData({
      id: this.sessionId,
      startTime: timestamp
    });
  }

  async endSession() {
    if (!this.sessionId) return;
    
    const sessionData = await this.storage.getSessionData();
    const sessionDuration = new Date() - new Date(sessionData.startTime);
    
    await this.trackEvent('session_end', {
      session_id: this.sessionId,
      duration: sessionDuration,
      timestamp: new Date().toISOString()
    });
    
    // Force send all events when session ends
    await this.sendBatch(true);
    
    this.sessionId = null;
    await this.storage.clearSessionData();
  }

  async identifyUser(userId, userTraits = {}) {
    if (!this.initialized) {
      this.log('SDK not initialized');
      return false;
    }
    
    this.userId = userId;
    await this.storage.setUserData({ id: userId, traits: userTraits });
    
    await this.trackEvent('user_identified', {
      user_id: userId,
      traits: userTraits
    });
    
    return true;
  }

  async trackEvent(eventName, properties = {}) {
    if (!this.initialized) {
      this.log('SDK not initialized');
      return false;
    }
    
    const timestamp = new Date().toISOString();
    const userData = await this.storage.getUserData() || {};
    
    const event = {
      id: generateUUID(),
      name: eventName,
      properties,
      timestamp,
      session_id: this.sessionId,
      user_id: userData.id || null,
      device: this.deviceInfo
    };
    
    this.eventQueue.push(event);
    this.log(`Event tracked: ${eventName}`);
    
    // Save to storage immediately to prevent data loss
    await this.storage.addEvent(event);
    
    // Check if we need to send a batch
    if (this.eventQueue.length >= this.config.batchSize) {
      await this.sendBatch();
    }
    
    return true;
  }

  async sendBatchIfNeeded() {
    if (this.eventQueue.length > 0) {
      await this.sendBatch();
    }
  }

  async sendBatch(forceAll = false) {
    if (!this.initialized || this.eventQueue.length === 0) {
      return false;
    }
    
    try {
      // Take either the batch size or all events if forceAll is true
      const eventsToSend = forceAll 
        ? [...this.eventQueue] 
        : this.eventQueue.slice(0, this.config.batchSize);
      
      const result = await this.network.sendEvents(
        this.config.endpoint, 
        this.apiKey, 
        eventsToSend
      );
      
      if (result.success) {
        // Remove sent events from queue
        this.eventQueue = this.eventQueue.slice(eventsToSend.length);
        
        // Remove sent events from storage
        await this.storage.removeEvents(eventsToSend.map(e => e.id));
        
        this.log(`Successfully sent ${eventsToSend.length} events`);
        return true;
      } else {
        this.log('Failed to send events', result.error);
        return false;
      }
    } catch (error) {
      this.log('Error sending batch', error);
      return false;
    }
  }

  // Lifecycle methods to be called from the app
  onAppBackground() {
    if (this.config.flushOnBackground) {
      this.sendBatchIfNeeded();
    }
    this.stopBatchInterval();
  }

  onAppForeground() {
    this.startBatchInterval();
    // Optionally track app foregrounded event
    this.trackEvent('app_foregrounded');
  }
}

// Singleton instance
const tracker = new TrackingSDK();
// const tracker = 'hello tracker'
export default tracker;