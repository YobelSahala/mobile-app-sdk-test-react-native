// hooks/usePageTracking.ts
import { useEffect } from 'react';
import { usePathname } from 'expo-router';
import tracker from '../../react-native-tracking-sdk/src/index';

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when the path changes
    tracker.trackEvent('screen_viewed', {
      screen_name: pathname,
      timestamp: new Date().toISOString()
    });
  }, [pathname]);
}