import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mindpad.app',
  appName: 'MindPad',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Preferences: {
      group: 'MindPad'
    }
  },
  android: {
    buildOptions: {
      keystorePath: 'debug.keystore',
      keystorePassword: 'android',
      keystoreAlias: 'androiddebugkey',
      keystoreAliasPassword: 'android',
    }
  }
};

export default config;