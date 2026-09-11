import { createStore } from "zustand/vanilla";

import { createProfileSlice } from "./createProfileSlice";

jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: { Success: "Success" }
}));

jest.mock("@/constants/TrophiesCatalog", () => ({
  trophiesCatalog: []
}));

jest.mock("@/utils/lootHelpers", () => ({
  generateTripleLoot: jest.fn(() => [])
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
    }))
  })

  it("should initialise store with initial profile data", () => {
    const state = store.getState()

    expect(state.profile.name).toBe("New User");
    expect(state.profile.level).toBe(1);
    expect(state.profile.profileLp).toBe(0);
    expect(state.profile.profileXp).toBe(0);
    expect(state.profile.activeFrame).toBe("frame_default");

    expect(state.profile.unlockedCustomizables).toEqual(["frame_default"]);
    expect(state.profile.friends).toEqual([]);
    expect(state.profile.surveyAnswers).toEqual({ goals: [], interests: [] });

    expect(state.showInstaTrackingModal).toBe(true);
    expect(state.profile.isLootGameActive).toBe(false);
  })

  it("should correctly update XP and trigger a level up", () => {
    store.getState().addExperience(150)
    const state = store.getState()

    expect(state.profile.level).toBe(2)
    expect(state.profile.profileXp).toBe(50)
    expect(state.showLevelUpModal).toBe(true)
  })

  it("should correctly add LP", () => {
    store.getState().addLp(100)
    const state = store.getState()

    expect(state.profile.profileLp).toBe(100)
  })

  it("should correctly remove LP", () => {
    store.getState().addLp(150)
    store.getState().removeLp(30)
    const state = store.getState()

    expect(state.profile.profileLp).toBe(120)
  })

  it("should update specific profile data via updateProfile", () => {
    store.getState().updateProfile({ name: "TestName", username: "test_user" })
    const state = store.getState()

    expect(state.profile.name).toBe("TestName")
    expect(state.profile.username).toBe("test_user")
  })

  it("should reset the profile to the initial state", () => {
    store.getState().updateProfile({ name: "ChangedName", profileLp: 500 })
    const oldState = store.getState()
    expect(oldState.profile.name).toBe("ChangedName")
    expect(oldState.profile.profileLp).toBe(500)

    store.getState().resetProfile()

    const newState = store.getState()
    expect(newState.profile.name).toBe("New User")
    expect(newState.profile.profileLp).toBe(0)
  })

  it("should track an event and increment its statistics", () => { });

  it("should clear a specific trophy from justUnlockedTrophies", () => { });

  it("should shift the popup queue when shiftPopupQueue is called", () => { });

  it("should start the loot game and generate a loot set", () => { });

  it("should set the chosen loot index and prevent changing it once already chosen", () => { });

  it("should reveal final loot via revealFinalLoot", () => { });

  it("should collect XP loot and properly add it to the profile", () => { });

  it("should collect LP loot and properly add it to the profile", () => { });

  it("should collect a collectible loot item and add it to unlockedCustomizables", () => { });

  it("should not duplicate a collectible if it is already unlocked", () => { });

  it("should set the active frame", () => { });

  it("should set the active status badge", () => { });

  it("should add a friend to the friends list and prevent duplicate entries", () => { });

  it("should remove a specific customizable from justUnlockedCustomizables", () => { });

  it("should set notification permission settings and push token", () => { });

  it("should disable the insta tracking modal via disableInstaTrackingModal", () => { });

  it("should toggle the visibility of the level up modal via setShowLevelUpModal", () => { });

  it("should claim an onboarding reward, add LP, and prevent duplicate claims for the same quest", () => { });
})