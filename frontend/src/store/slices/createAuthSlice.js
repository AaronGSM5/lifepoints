import { mockProfile } from '@/constants/MockData';

export const createAuthSlice = (set, get) => ({
  profile: mockProfile,

  // XP hinzufügen mit automatischer Level-Up Logik
  addXp: (amount) => set((state) => {
    let newXp = state.profile.profileXp + amount;
    let newLevel = state.profile.profileLevel;

    // Einfache Level-Up Logik: Alle 1000 XP ein Level
    if (newXp >= 1000) {
      newLevel += Math.floor(newXp / 1000);
      newXp = newXp % 1000;
    }

    return {
      profile: { ...state.profile, profileXp: newXp, profileLevel: newLevel }
    };
  }),

  updateProfile: (newData) => set((state) => ({
    profile: { ...state.profile, ...newData }
  })),
});