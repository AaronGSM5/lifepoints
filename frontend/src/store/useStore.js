import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createDataSlice } from './slices/createDataSlice';
import { createProfileSlice } from './slices/createProfileSlice';
import { createQuestSlice } from './slices/createQuestSlice';
import { createUISlice } from './slices/createUISlice';

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
        ...createDataSlice(set, get, api),
        ...createProfileSlice(set, get, api),
        ...createQuestSlice(set, get, api),
      }),
      {
        name: 'lifepoints-storage',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          profile: state.profile,
          completedTaskIds: state.completedTaskIds,
          activeTaskIds: state.activeTaskIds,
          activities: state.activities,
          myCommunities: state.myCommunities,
          hasCompletedOnboarding: state.hasCompletedOnboarding,
          isDarkMode: state.isDarkMode,
          showInstaTrackingModal: state.showInstaTrackingModal
        }),
      }
    )
  )
);

export default useStore