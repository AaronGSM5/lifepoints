import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createDataSlice } from './slices/createDataSlice';
import { createFeedSlice } from './slices/createFeedSlice';
import { createProfileSlice } from './slices/createProfileSlice';
import { createQuestSlice } from './slices/createQuestSlice';
import { createUISlice } from './slices/createUISlice';

const logger = (config) => (set, get, api) => config(
  (args, replace, actionName) => {
    const prevState = get();
    set(args, replace);
    const nextState = get();

    const isTestEnvironment = process.env.NODE_ENV === 'test' || typeof jest !== 'undefined';

    if (__DEV__ && !isTestEnvironment) {
      let label = actionName;

      if (!label) {
        const changedKeys = Object.keys(nextState).filter(
          (key) => prevState[key] !== nextState[key]
        );
        label = changedKeys.length > 0
          ? `UPDATE: ${changedKeys.join(", ")}`
          : "STATE_UPDATE";
      }

      console.groupCollapsed(`🚀 Zustand ➔ [${label}] Changes:`, args);
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
        ...createFeedSlice(set, get, api),
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