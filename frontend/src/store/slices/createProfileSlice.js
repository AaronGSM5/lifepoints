import * as Haptics from "expo-haptics";
import { getXpThreshold } from "../../utils/xpHelpers";
import { mockProfile } from '@/constants/MockData';
import { generateTripleLoot } from "@/utils/lootLogic";

export const createProfileSlice = (set, get) => ({
  profile: {
    ...mockProfile,
    profileLevel: mockProfile.profileLevel || 1,
    leagueIndex: 0,
    rankIndex: 0,
    profileXp: mockProfile.profileXp || 0,
    profileLp: mockProfile.profileLp || 0,
    activeFrame: null,
    unlockedFrames: [],
    pinnedCollectibles: [],
    unlockedCollectibles: [],
    isLootGameActive: false,
    currentLootSet: [],
    chosenLootIndex: null,
    isLootRevealed: false,
  },

  startLootGame: () => set({
    isLootGameActive: true,
    currentLootSet: generateTripleLoot(), // Zieht 3 Items aus der utils-Datei
    chosenLootIndex: null,
    isLootRevealed: false
  }),

  chooseLoot: (index) => {
    if (get().chosenLootIndex !== null) return;
    set({ chosenLootIndex: index });
  },

  revealFinalLoot: () => set({ isLootRevealed: true }),

  collectLoot: () => {
    const { currentLootSet, chosenLootIndex, addExperience, addLp } = get();
    const finalReward = currentLootSet[chosenLootIndex];

    if (finalReward.type === 'XP') {
      addExperience(finalReward.amount);
    }
    else if (finalReward.type === 'LP') {
      addLp(finalReward.amount);
    }
    else if (finalReward.type === 'FRAME') {
      set((state) => {
        // SICHERHEIT: Falls unlockedFrames undefined ist, nimm ein leeres Array
        const currentFrames = state.profile.unlockedFrames || [];
        const hasFrame = currentFrames.includes(finalReward.id);

        if (hasFrame) return state;

        return {
          profile: {
            ...state.profile,
            unlockedFrames: [...currentFrames, finalReward.id]
          }
        };
      });
    }
    else if (finalReward.type === 'COLLECTIBLE') {
      set((state) => {
        // SICHERHEIT: Falls unlockedCollectibles undefined ist, nimm ein leeres Array
        const currentCollectibles = state.profile.unlockedCollectibles || [];
        const hasItem = currentCollectibles.includes(finalReward.id);

        if (hasItem) return state;

        return {
          profile: {
            ...state.profile,
            unlockedCollectibles: [...currentCollectibles, finalReward.id]
          }
        };
      });
    }

    // Modal schließen
    set({
      isLootGameActive: false,
      currentLootSet: [],
      chosenLootIndex: null,
      isLootRevealed: false
    });
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