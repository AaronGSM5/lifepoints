import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createDataSlice } from './slices/createDataSlice';
import { createProfileSlice } from './slices/createProfileSlice';
import { createQuestSlice } from './slices/createQuestSlice';
import { createUISlice } from './slices/createUISlice';

const logger = (config) => (set, get, api) => config(
  (args, replace, actionName) => {
    set(args, replace);
    const nextState = get();

    if (__DEV__) {
      const label = actionName || 'UNKNOWN_ACTION';

      console.group(`🚀 Zustand ➔ [${label}]`);

      console.log('Änderungen:', args);
      console.log('✅ Aktueller Zustand:', nextState);

      console.groupEnd();
    }
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
          isAuthenticated: state.isAuthenticated,
          isDarkMode: state.isDarkMode,
          showInstaTrackingModal: state.showInstaTrackingModal
        }),
      }
    )
  )
);

export default useStore