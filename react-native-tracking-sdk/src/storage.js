// src/storage.js - Handles local data persistence

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  EVENTS: '@TrackingSDK:events',
  USER: '@TrackingSDK:user',
  SESSION: '@TrackingSDK:session'
};

class Storage {
  async getUnsentEvents() {
    try {
      const eventsJson = await AsyncStorage.getItem(KEYS.EVENTS);
      return eventsJson ? JSON.parse(eventsJson) : [];
    } catch (error) {
      console.error('Failed to get unsent events', error);
      return [];
    }
  }

  async addEvent(event) {
    try {
      const events = await this.getUnsentEvents();
      events.push(event);
      await AsyncStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    } catch (error) {
      console.error('Failed to add event', error);
    }
  }

  async removeEvents(eventIds) {
    try {
      const events = await this.getUnsentEvents();
      const filteredEvents = events.filter(event => !eventIds.includes(event.id));
      await AsyncStorage.setItem(KEYS.EVENTS, JSON.stringify(filteredEvents));
    } catch (error) {
      console.error('Failed to remove events', error);
    }
  }

  async getUserData() {
    try {
      const userJson = await AsyncStorage.getItem(KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Failed to get user data', error);
      return null;
    }
  }

  async setUserData(userData) {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to set user data', error);
    }
  }

  async getSessionData() {
    try {
      const sessionJson = await AsyncStorage.getItem(KEYS.SESSION);
      return sessionJson ? JSON.parse(sessionJson) : null;
    } catch (error) {
      console.error('Failed to get session data', error);
      return null;
    }
  }

  async setSessionData(sessionData) {
    try {
      await AsyncStorage.setItem(KEYS.SESSION, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Failed to set session data', error);
    }
  }

  async clearSessionData() {
    try {
      await AsyncStorage.removeItem(KEYS.SESSION);
    } catch (error) {
      console.error('Failed to clear session data', error);
    }
  }

  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([KEYS.EVENTS, KEYS.USER, KEYS.SESSION]);
    } catch (error) {
      console.error('Failed to clear all data', error);
    }
  }
}

export default Storage;