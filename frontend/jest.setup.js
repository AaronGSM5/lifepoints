/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';
import 'react-native-reanimated/mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);