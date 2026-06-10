import * as Haptics from "expo-haptics";
import { getXpThreshold } from "../../utils/xpHelpers";
import { generateTripleLoot } from "@/utils/lootLogic";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";

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
  unlockedTrophies: [],
  justUnlockedTrophies: [],
  popupQueue: [],
  friends: [],
  // Loot Game
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
  eventStats: {},
}

export const createProfileSlice = (set, get) => ({
  profile: initialUserState,

  showInstaTrackingModal: true,

  trackEvent: (eventName, amount = 1) => {
    set((state) => {
      const currentCount = state.profile.eventStats[eventName] || 0;
      const newCount = currentCount + amount;

      const newlyUnlocked = trophiesCatalog.filter(t =>
        t.triggerEvent === eventName &&
        newCount >= t.goal &&
        !state.profile.unlockedTrophies.includes(t.id)
      );

      const newlyUnlockedIds = newlyUnlocked.map(t => t.id);

      return {
        profile: {
          ...state.profile,
          eventStats: { ...state.profile.eventStats, [eventName]: newCount },
          unlockedTrophies: [...state.profile.unlockedTrophies, ...newlyUnlockedIds],
          justUnlockedTrophies: [...(state.profile.justUnlockedTrophies || []), ...newlyUnlockedIds],
          popupQueue: [...(state.profile.popupQueue || []), ...newlyUnlockedIds]
        }
      };
    });
  },

  clearJustUnlockedTrophy: (trophyId) => {
    set((state) => ({
      profile: {
        ...state.profile,
        justUnlockedTrophies: (state.profile.justUnlockedTrophies || []).filter(id => id !== trophyId)
      }
    }));
  },

  shiftPopupQueue: () => set((state) => {
    const newQueue = [...(state.profile.popupQueue || [])];
    newQueue.shift();
    return {
      profile: {
        ...state.profile,
        popupQueue: newQueue
      }
    };
  }),

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
    if (profile.friends.includes(userId)) return
    set((state) => ({
      profile: {
        ...state.profile,
        friends: [...state.profile.friends, userId]
      }
    }))
  },

  resetProfile: () => {
    const { updateProfile } = get()
    updateProfile(initialUserState)
  }
});