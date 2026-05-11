import * as Haptics from "expo-haptics";
import { getXpThreshold } from "../../utils/xpHelpers";
import { generateTripleLoot } from "@/utils/lootLogic";

const initialUserState = {
  name: "New User",
  username: 'newuser',
  description: "",
  avatar: "",
  level: 1,
  leagueIndex: 0,
  rankIndex: 0,
  profileLp: 0,
  profileXp: 0,
  activeFrame: 'f0',
  unlockedFrames: ['f0'],
  unlockedCollectibles: [],
  friends: [],
  isLootGameActive: false,
  currentLootSet: [],
  chosenLootIndex: null,
  isLootRevealed: false,
  // Onboarding
  surveyAnswers: {
    goals: [],
    interests: [],
  },
  claimedOnboardingGuideRewards: [],
}

export const createProfileSlice = (set, get) => ({
  profile: initialUserState,

  startLootGame: () => set({
    isLootGameActive: true,
    currentLootSet: generateTripleLoot(),
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
    let newLevel = profile.level;
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
        level: newLevel,
        profileXp: newXP,
      },
      showLevelUpModal: hasLeveledUp ? true : state.showLevelUpModal
    }));
  },

  claimOnboardingReward: (questId, amount) => {
    const { profile, addLp } = get();
    const alreadyClaimed = profile.claimedOnboardingGuideRewards?.includes(questId);

    if (!alreadyClaimed) {
      addLp(amount);

      set((state) => ({
        profile: {
          ...state.profile,
          claimedOnboardingGuideRewards: [...(state.profile.claimedOnboardingGuideRewards || []), questId]
        }
      }));
    }
  },

  setActiveFrame: (frameId) => set((state) => ({
    profile: {
      ...state.profile,
      activeFrame: frameId
    }
  })),

  resetProfile: () => {
    const { updateProfile } = get()
    updateProfile(initialUserState)
  }
});