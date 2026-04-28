import * as Haptics from "expo-haptics";
import { getXpThreshold } from "../../utils/xpHelpers";
import { mockProfile } from '@/constants/MockData';

export const createProfileSlice = (set, get) => ({
  profile: {
    ...mockProfile,
    profileLevel: mockProfile.profileLevel || 1,
    profileXp: mockProfile.profileXp || 0,
    profileLp: mockProfile.profileLp || 0,
  },

  showLevelUpModal: false,
  setShowLevelUpModal: (visible) => set({ showLevelUpModal: visible }),

  updateProfile: (newData) => set((state) => ({
    profile: { ...state.profile, ...newData }
  })),

  addLp: (amount) => set((state) => ({
    profile: { ...state.profile, profileLp: state.profile.profileLp + amount }
  })),

  removeLp: (amount) => set((state) => ({
    profile: { ...state.profile, profileLp: state.profile.profileLp - amount }
  })),

  addExperience: (amount) => {
    const { profile } = get();
    let newXP = profile.profileXp + amount;
    let newLevel = profile.profileLevel;
    let hasLeveledUp = false;

    while (newXP >= getXpThreshold(newLevel)) {
      newXP -= getXpThreshold(newLevel);
      newLevel++;
      hasLeveledUp = true;
    }

    if (hasLeveledUp) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    set((state) => ({
      profile: {
        ...state.profile,
        profileLevel: newLevel,
        profileXp: newXP,
      },
      showLevelUpModal: hasLeveledUp ? true : state.showLevelUpModal
    }));
  }
});