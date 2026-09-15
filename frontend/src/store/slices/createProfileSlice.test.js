import * as Haptics from "expo-haptics";
import { createStore } from "zustand/vanilla";

import { createProfileSlice } from "./createProfileSlice";

jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: { Success: "Success" }
}));

jest.mock("@/constants/TrophiesCatalog", () => ({
  trophiesCatalog: [
    { id: "trophy_first_login", triggerEvent: "LOGIN", goal: 1 }
  ]
}));

jest.mock("@/utils/lootHelpers", () => ({
  generateTripleLoot: jest.fn(() => [
    { type: "XP", amount: 50 },
    { type: "LP", amount: 100 },
    { type: "COLLECTIBLE", id: "rare_frame" }
  ])
}));

jest.mock("../../utils/xpHelpers", () => ({
  getRequiredXpForNextLevel: jest.fn(() => 100)
}));

describe("createProfileSlice", () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStore((set, get) => ({
      ...createProfileSlice(set, get)
    }));
  });

  describe("Initialization & Basic Management", () => {
    it("should initialise store with initial profile data", () => {
      const state = store.getState();

      expect(state.profile.name).toBe("New User");
      expect(state.profile.level).toBe(1);
      expect(state.profile.profileLp).toBe(0);
      expect(state.profile.profileXp).toBe(0);
      expect(state.profile.activeFrame).toBe("frame_default");
      expect(state.profile.unlockedCustomizables).toEqual(["frame_default"]);
      expect(state.profile.friends).toEqual([]);
      expect(state.profile.surveyAnswers).toEqual({ goals: [], interests: [] });
      expect(state.showInstaTrackingModal).toBe(true);
      expect(state.isLootGameActive).toBe(false);
    });

    it("should update specific profile data via updateProfile", () => {
      store.getState().updateProfile({ name: "TestName", username: "test_user" });
      const state = store.getState();

      expect(state.profile.name).toBe("TestName");
      expect(state.profile.username).toBe("test_user");
    });

    it("should reset the profile to the initial state", () => {
      store.getState().updateProfile({ name: "ChangedName", profileLp: 500 });
      store.getState().resetProfile();

      const newState = store.getState();
      expect(newState.profile.name).toBe("New User");
      expect(newState.profile.profileLp).toBe(0);
    });
  });

  describe("XP & Level System", () => {
    it("should correctly update XP, trigger a single level up, and trigger haptics", () => {
      store.getState().addExperience(150);
      const state = store.getState();

      expect(state.profile.level).toBe(2);
      expect(state.profile.profileXp).toBe(50);
      expect(state.showLevelUpModal).toBe(true);
      expect(Haptics.notificationAsync).toHaveBeenCalledWith(Haptics.NotificationFeedbackType.Success);
    });

    it("should handle multi-level ups correctly when massive XP is gained", () => {
      store.getState().addExperience(250);
      const state = store.getState();

      expect(state.profile.level).toBe(3);
      expect(state.profile.profileXp).toBe(50);
    });

    it("should toggle the visibility of the level up modal via setShowLevelUpModal", () => {
      store.getState().setShowLevelUpModal(true);
      expect(store.getState().showLevelUpModal).toBe(true);

      store.getState().setShowLevelUpModal(false);
      expect(store.getState().showLevelUpModal).toBe(false);
    });
  });

  describe("LP & Economy", () => {
    it("should correctly add LP", () => {
      store.getState().addLp(100);
      expect(store.getState().profile.profileLp).toBe(100);
    });

    it("should correctly remove LP", () => {
      store.getState().addLp(150);
      store.getState().removeLp(30);
      expect(store.getState().profile.profileLp).toBe(120);
    });
  });

  describe("Events & Trophies", () => {
    it("should track an event, increment statistics, and unlock matching trophies", () => {
      store.getState().trackEvent("LOGIN", 1);
      const state = store.getState();

      expect(state.profile.eventStats["LOGIN"]).toBe(1);
      expect(state.profile.unlockedTrophies).toContain("trophy_first_login");
      expect(state.profile.justUnlockedTrophies).toContain("trophy_first_login");
      expect(state.profile.popupQueue).toContain("trophy_first_login");
    });

    it("should clear a specific trophy from justUnlockedTrophies", () => {
      store.setState({
        profile: { ...store.getState().profile, justUnlockedTrophies: ["trophy_1"] }
      });

      store.getState().clearJustUnlockedTrophy("trophy_1");
      expect(store.getState().profile.justUnlockedTrophies).toEqual([]);
    });

    it("should shift the popup queue when shiftPopupQueue is called", () => {
      store.setState({
        profile: { ...store.getState().profile, popupQueue: ["item_1", "item_2"] }
      });

      store.getState().shiftPopupQueue();
      expect(store.getState().profile.popupQueue).toEqual(["item_2"]);
    });
  });

  describe("Loot Game System", () => {
    it("should start the loot game and generate a loot set", () => {
      store.getState().startLootGame();
      const state = store.getState();

      expect(state.isLootGameActive).toBe(true);
      expect(state.currentLootSet.length).toBe(3);
      expect(state.chosenLootIndex).toBeNull();
      expect(state.isLootRevealed).toBe(false);
    });

    it("should set the chosen loot index and prevent changing it once chosen", () => {
      store.getState().chooseLoot(0);
      expect(store.getState().chosenLootIndex).toBe(0);

      store.getState().chooseLoot(2);
      expect(store.getState().chosenLootIndex).toBe(0);
    });

    it("should reveal final loot via revealFinalLoot", () => {
      store.getState().revealFinalLoot();
      expect(store.getState().isLootRevealed).toBe(true);
    });

    it("should collect XP loot and properly add it to the profile", () => {
      store.setState({
        currentLootSet: [{ type: "XP", amount: 50 }],
        chosenLootIndex: 0,
        isLootGameActive: true
      });

      store.getState().collectLoot();
      const state = store.getState();

      expect(state.profile.profileXp).toBe(50);
      expect(state.isLootGameActive).toBe(false);
    });

    it("should collect LP loot and properly add it to the profile", () => {
      store.setState({
        currentLootSet: [{ type: "LP", amount: 150 }],
        chosenLootIndex: 0,
        isLootGameActive: true
      });

      store.getState().collectLoot();
      const state = store.getState();

      expect(state.profile.profileLp).toBe(150);
      expect(state.isLootGameActive).toBe(false);
    });

    it("should collect a collectible loot item and add it to unlockedCustomizables", () => {
      store.setState({
        currentLootSet: [{ type: "COLLECTIBLE", id: "rare_frame" }],
        chosenLootIndex: 0,
        isLootGameActive: true
      });

      store.getState().collectLoot();
      const state = store.getState();

      expect(state.profile.unlockedCustomizables).toContain("rare_frame");
      expect(state.profile.justUnlockedCustomizables).toContain("rare_frame");
      expect(state.isLootGameActive).toBe(false);
    });

    it("should not duplicate a collectible if it is already unlocked", () => {
      store.setState({
        profile: {
          ...store.getState().profile,
          unlockedCustomizables: ["frame_default", "rare_frame"]
        },
        currentLootSet: [{ type: "COLLECTIBLE", id: "rare_frame" }],
        chosenLootIndex: 0,
        isLootGameActive: true
      });

      store.getState().collectLoot();
      const state = store.getState();

      const count = state.profile.unlockedCustomizables.filter(id => id === "rare_frame").length;
      expect(count).toBe(1);
    });
  });

  describe("Customizables & Social", () => {
    it("should set the active frame", () => {
      store.getState().setActiveFrame("frame_fire");
      expect(store.getState().profile.activeFrame).toBe("frame_fire");
    });

    it("should set the active status badge", () => {
      store.getState().setActiveStatusBadge("badge_vip");
      expect(store.getState().profile.activeStatusBadge).toBe("badge_vip");
    });

    it("should add a friend to the friends list and prevent duplicate entries", () => {
      store.getState().addFriend("user_123");
      expect(store.getState().profile.friends).toEqual(["user_123"]);

      store.getState().addFriend("user_123");
      expect(store.getState().profile.friends).toEqual(["user_123"]);
    });

    it("should remove a specific customizable from justUnlockedCustomizables", () => {
      store.setState({
        profile: { ...store.getState().profile, justUnlockedCustomizables: ["item_1", "item_2"] }
      });

      store.getState().clearJustUnlockedCustomizable("item_1");
      expect(store.getState().profile.justUnlockedCustomizables).toEqual(["item_2"]);
    });
  });

  describe("Settings & Onboarding", () => {
    it("should set notification permission settings and push token", () => {
      store.getState().setNotificationPermissionSettings(true, "ExponentPushToken[xxx]");
      const state = store.getState();

      expect(state.profile.hasSeenNotificationPrompt).toBe(true);
      expect(state.profile.pushToken).toBe("ExponentPushToken[xxx]");
    });

    it("should disable the insta tracking modal via disableInstaTrackingModal", () => {
      store.getState().disableInstaTrackingModal();
      expect(store.getState().showInstaTrackingModal).toBe(false);
    });

    it("should claim an onboarding reward, add LP, and prevent duplicate claims", () => {
      store.getState().claimOnboardingReward("quest_1", 100);
      let state = store.getState();

      expect(state.profile.profileLp).toBe(100);
      expect(state.profile.claimedOnboardingGuideRewards).toContain("quest_1");

      store.getState().claimOnboardingReward("quest_1", 100);
      state = store.getState();

      expect(state.profile.profileLp).toBe(100);
    });
  });
});