import * as Haptics from "expo-haptics";
import { getXpThreshold } from "../../utils/xpHelpers";
import { generateTripleLoot } from "@/utils/lootLogic";
import { publicProfile } from "@/mocks/PublicProfile";

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
  activeFrame: 'frame_default',
  activeStatusBadge: null,
  unlockedCustomizables: ['frame_default'],
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

  showInstaTrackingModal: true,

  startLootGame: () => {
    const { profile } = get();
    set({
      isLootGameActive: true,
      currentLootSet: generateTripleLoot(profile.unlockedCustomizables),
      chosenLootIndex: null,
      isLootRevealed: false
    })
  },

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
    else if (finalReward.type === 'COLLECTIBLE') {
      set((state) => {
        const currentCustomizables = state.profile.unlockedCustomizables || [];
        const hasItem = currentCustomizables.includes(finalReward.id);

        if (hasItem) return state;

        return {
          profile: {
            ...state.profile,
            unlockedCustomizables: [...currentCustomizables, finalReward.id]
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

  disableInstaTrackingModal: () => set({ showInstaTrackingModal: false }),

  setActiveFrame: (frameId) => set((state) => ({
    profile: {
      ...state.profile,
      activeFrame: frameId
    }
  })),

  setActiveStatusBadge: (badgeId) => set((state) => ({
    profile: {
      ...state.profile,
      activeStatusBadge: badgeId
    }
  })),

  addFriend: (userId) => {
    const { profile } = get()
    const userProfile = publicProfile
    if (profile.friends.includes(userId)) return
    set((state) => ({
      profile: {
        ...state.profile,
        friends: [...state.profile.friends, userProfile.id]
      }
    }))
  },

  resetProfile: () => {
    const { updateProfile } = get()
    updateProfile(initialUserState)
  }
});