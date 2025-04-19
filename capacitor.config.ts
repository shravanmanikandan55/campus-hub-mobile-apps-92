
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b72ca3c14a764f67b6148be4c425f464',
  appName: 'campus-hub-mobile-apps',
  webDir: 'dist',
  server: {
    url: 'https://b72ca3c1-4a76-4f67-b614-8be4c425f464.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
