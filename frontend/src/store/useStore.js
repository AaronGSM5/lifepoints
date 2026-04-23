import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native';
import { applyTheme } from '@/constants/Colors';

import { createUISlice } from './slices/createUISlice';
import { createAuthSlice } from './slices/createAuthSlice';
import { createDataSlice } from './slices/createDataSlice';

const logger = (config) => (set, get, api) => config(
  (args) => {
    console.group('Zustand Update 🚀');
    const prevState = get();
    set(args);
    console.log('🔄 VORHER:', prevState);
    console.log('✅ NACHHER:', get());
    console.groupEnd();
  },
  get,
  api
);

const useStore = create(
  logger(
    persist(
      (set, get, api) => ({
        ...createUISlice(set, get, api),
        ...createAuthSlice(set, get, api),
        ...createDataSlice(set, get, api),
      }),
      {
        name: 'lifepoints-storage',
        storage: createJSONStorage(() =>
          Platform.OS === 'web' ? window.localStorage : AsyncStorage
        ),
      }
    )
  )
);

export default useStore