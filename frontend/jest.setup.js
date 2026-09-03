/* global jest */
import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated/mock';

process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID = 'mock-project-id';
process.env.EXPO_PUBLIC_APPWRITE_PLATFORM = 'com.lifepoints.app';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('react-native-safe-area-context');
jest.mock('react-i18next');

const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('SafeAreaView has been deprecated')) {
    return;
  }
  originalWarn(...args);
};