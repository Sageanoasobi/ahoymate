import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.boatmate.app',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    suppressCallJSMethodExceptions: false
  },
  ios: {
    discardUncaughtJsExceptions: false
  },
  name: 'BoatMate',
  version: '1.0.0',
  platformVersion: '8.5.0',
  cssParser: 'tailwind'
} as NativeScriptConfig;