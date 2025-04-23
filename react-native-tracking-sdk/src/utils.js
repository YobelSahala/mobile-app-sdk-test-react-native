// src/utils.js - Utility functions

import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
 * Generate a UUID v4
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Get device information
 */
export const getDeviceInfo = async () => {
  const { width, height } = Dimensions.get('window');
  
  return {
    device_id: await DeviceInfo.getUniqueId(),
    device_manufacturer: await DeviceInfo.getManufacturer(),
    device_model: await DeviceInfo.getModel(),
    os_name: Platform.OS,
    os_version: Platform.Version,
    screen_width: width,
    screen_height: height,
    app_version: await DeviceInfo.getVersion(),
    app_build_number: await DeviceInfo.getBuildNumber(),
    carrier: await DeviceInfo.getCarrier(),
    timezone: DeviceInfo.getTimezone(),
    locale: DeviceInfo.getDeviceLocale(),
    is_tablet: DeviceInfo.isTablet(),
  };
};

/**
 * Get the current timestamp in ISO format
 */
export const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Safely parse JSON
 */
export const safeJsonParse = (json, fallback = null) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return fallback;
  }
};

/**
 * Safely stringify JSON
 */
export const safeJsonStringify = (obj, fallback = '{}') => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return fallback;
  }
};

/**
 * Get current timestamp in milliseconds
 */
export const now = () => {
  return Date.now();
};

/**
 * Simple debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

/**
 * Create a throttled version of a function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};