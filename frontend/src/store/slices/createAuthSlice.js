import { mockProfile } from '@/constants/MockData';

export const createAuthSlice = (set, get) => ({
  profile: mockProfile,

  updateProfile: (newData) => set((state) => ({
    profile: { ...state.profile, ...newData }
  })),

  addXp: (amount) => set((state) => {
    let newXp = state.profile.profileXp + amount;
    let newLevel = state.profile.profileLevel;

    return {
      profile: { ...state.profile, profileXp: newXp, profileLevel: newLevel }
    };
  }),

  addLp: (amount) => set((state) => {
    const currentLp = state.profile.profileLp || 0
    return {
      profile: { ...state.profile, profileLp: currentLp + amount }
    }
  }),

  removeLp: (amount) => set((state) => {
    const currentLp = state.profile.profileLp || 0
    return {
      profile: { ...state.profile, profileLp: currentLp - amount }
    }
  }),
});