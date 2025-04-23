// src/network.js - Handles API communication

import NetInfo from '@react-native-community/netinfo';

class Network {
  constructor() {
    this.isConnected = true;
    this.setupNetworkListener();
  }

  setupNetworkListener() {
    NetInfo.addEventListener(state => {
      this.isConnected = state.isConnected;
    });
  }

  async checkConnection() {
    try {
      const networkState = await NetInfo.fetch();
      return networkState.isConnected;
    } catch (error) {
      console.error('Failed to check network connection', error);
      return this.isConnected; // Fall back to last known state
    }
  }

  async sendEvents(endpoint, apiKey, events) {
    // First check if we have network connectivity
    const hasConnection = await this.checkConnection();
    
    if (!hasConnection) {
      return {
        success: false,
        error: 'No network connection available'
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ReactNativeTrackingSDK/1.0'
        },
        body: JSON.stringify({
          events,
          sent_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data
        };
      } else {
        return {
          success: false,
          error: `Server responded with status ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default Network;