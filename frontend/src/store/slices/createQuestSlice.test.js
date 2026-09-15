import { createStore } from "zustand/vanilla";

import { createQuestSlice } from "./createQuestSlice";

jest.mock("@/constants/QuestCatalog", () => ({
  questCatalog: {
    today: [
      { id: "daily_login", trigger: "LOGIN", target: 1, points: 10 },
      { id: "daily_health", trigger: "TASK_COMPLETED", target: 2, points: 20, metadata: { taskCategory: "health" } }
    ],
    week: [
      { id: "weekly_login", trigger: "LOGIN", target: 5, points: 50 }
    ]
  }
}));

describe("createQuestSlice", () => {
  let store;
  let mockAddLp;

  beforeEach(() => {
    mockAddLp = jest.fn();

    store = createStore((set, get) => ({
      ...createQuestSlice(set, get),
      addLp: mockAddLp
    }));
  });

  it("should initialize with an empty questProgress object", () => {
    expect(store.getState().questProgress).toEqual({})
  });

  it("should manually update quest progress via updateQuestProgress", () => {
    store.getState().updateQuestProgress("weekly_login", 2)

    expect(store.getState().questProgress["weekly_login"].progress).toBe(2)
    expect(store.getState().questProgress["weekly_login"].isCollected).toBeFalsy()
  });

  it("should cap quest progress at the target value", () => {
    store.getState().updateQuestProgress("daily_login", 5)

    expect(store.getState().questProgress["daily_login"].progress).toBe(1)
  });

  it("should remove only daily quests when resetDailyQuests is called", () => {
    store.getState().updateQuestProgress("daily_login", 1);
    store.getState().updateQuestProgress("weekly_login", 1);

    store.getState().resetDailyQuests();

    const state = store.getState();
    expect(state.questProgress["daily_login"]).toBeUndefined();
    expect(state.questProgress["weekly_login"].progress).toBe(1);
  });

  it("should increment progress for all quests matching the trigger", () => {
    store.getState().notifyQuestSystem("LOGIN");

    const state = store.getState();
    expect(state.questProgress["daily_login"].progress).toBe(1);
    expect(state.questProgress["weekly_login"].progress).toBe(1);
  });

  it("should not increment progress if the quest is already completed or collected", () => {
    store.getState().updateQuestProgress("weekly_login", 5);

    store.getState().notifyQuestSystem("LOGIN");

    expect(store.getState().questProgress["weekly_login"].progress).toBe(5);
  });

  it("should increment progress for TASK_COMPLETED only if the category matches", () => {
    store.getState().notifyQuestSystem("TASK_COMPLETED", { category: "health" });

    expect(store.getState().questProgress["daily_health"].progress).toBe(1);
  });

  it("should not increment progress for TASK_COMPLETED if the category does not match", () => {
    store.getState().notifyQuestSystem("TASK_COMPLETED", { category: "mind" });

    expect(store.getState().questProgress["daily_health"]).toBeUndefined();
  });

  it("should claim reward, add LP, and set isCollected to true if target is reached", () => {
    store.getState().updateQuestProgress("daily_login", 1);

    const result = store.getState().claimQuestReward("daily_login");

    const state = store.getState();
    expect(result).toBeTruthy();
    expect(state.questProgress["daily_login"].isCollected).toBeTruthy();
    expect(mockAddLp).toHaveBeenCalledWith(10);
  });

  it("should return false and not add LP if quest target is not met", () => {
    store.getState().updateQuestProgress("weekly_login", 2);

    const result = store.getState().claimQuestReward("weekly_login");

    expect(result).toBeFalsy();
    expect(mockAddLp).not.toHaveBeenCalled();
  });

  it("should return false and not add LP if quest is already collected", () => {
    store.getState().updateQuestProgress("daily_login", 1);
    store.getState().claimQuestReward("daily_login");

    mockAddLp.mockClear();

    const result = store.getState().claimQuestReward("daily_login");

    expect(result).toBeFalsy();
    expect(mockAddLp).not.toHaveBeenCalled();
  });

});