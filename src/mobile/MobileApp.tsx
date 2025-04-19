
import React, { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { App as CapacitorApp } from '@capacitor/app';

const MobileApp: React.FC = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Handle back button for Android
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          CapacitorApp.exitApp();
        } else {
          window.history.back();
        }
      });
      
      console.log('Running on a native platform');
    } else {
      console.log('Running in browser');
    }
    
    return () => {
      // Cleanup listeners
      if (Capacitor.isNativePlatform()) {
        CapacitorApp.removeAllListeners();
      }
    };
  }, []);
  
  return null; // This component doesn't render anything, just sets up mobile functionality
};

export default MobileApp;
