import { createStore } from "zustand/vanilla";

import { createDataSlice } from "./createDataSlice";

jest.mock("@/constants/TasksCatalog", () => ({
  tasksCatalog: [
    { id: "task_1", title: "Standard Task", description: "Test", category: "health", lp: 50, icon: "heart" }
  ]
}));

jest.mock("@/mocks/FeaturedTasks", () => ({
  recommendedTasks: [
    { id: "task_2", title: "Featured Task", description: "Test", category: "mind", lp: 100, icon: "brain" }
  ]
}));

jest.mock("@/constants/RewardsCatalog", () => ({
  rewardsCatalog: [
    { id: "reward_1", points: 200 }
  ]
}));

jest.mock("@/constants/FeaturedRewards", () => ({
  featuredRewards: [
    { id: "reward_2", points: 500, discount: { newPrice: 300 } }
  ]
}));

describe("createDataSlice", () => {
  let store;
  let mockAddLp;
  let mockRemoveLp;

  beforeEach(() => {
    mockAddLp = jest.fn();
    mockRemoveLp = jest.fn();

    store = createStore((set, get) => ({
      ...createDataSlice(set, get),
      addLp: mockAddLp,
      removeLp: mockRemoveLp,
      profile: { profileLp: 1000 }
    }));
  });

  it("should initialize with default data", () => {
    const state = store.getState()

    expect(state.myCommunities).toEqual([])
    expect(state.activities).toEqual([])
    expect(state.activeTaskIds).toEqual([])
    expect(state.completedTaskIds).toEqual([])
  });

  it("should track a task by adding it to activeTaskIds", () => {
    store.getState().trackTask("task_1")

    expect(store.getState().activeTaskIds).toEqual(["task_1"])
  });

  it("should not add duplicate tasks to activeTaskIds when tracking", () => {
    store.getState().trackTask("task_1")
    store.getState().trackTask("task_1")

    expect(store.getState().activeTaskIds).toEqual(["task_1"])
  });

  it("should cancel a task by removing it from activeTaskIds", () => {
    store.getState().trackTask("task_1")
    store.getState().cancelTask("task_1")

    expect(store.getState().activeTaskIds).toEqual([])
  });

  it("should complete a task: move it from active to completed, log activity, and award LP", () => {
    store.getState().trackTask("task_1")
    store.getState().completeTask("task_1")

    expect(store.getState().activeTaskIds).toEqual([])
    expect(store.getState().completedTaskIds).toEqual(["task_1"])
    expect(store.getState().activities.length).toBe(1)
    expect(mockAddLp).toHaveBeenCalledWith(50)
  });

  it("should do nothing if completing a non-existent task", () => {
    store.getState().completeTask("not_existent")

    expect(store.getState().activities.length).toBe(0)
    expect(mockAddLp).not.toHaveBeenCalled()
  });

  it("should join a community if valid and not already joined", () => {
    store.getState().joinCommunity({ _id: "comm_1", name: "LifePoints Fans" })

    expect(store.getState().myCommunities.length).toBe(1)
  });

  it("should not join a community if it is already in myCommunities", () => {
    store.getState().joinCommunity({ _id: "comm_1", name: "LifePoints Fans" })
    store.getState().joinCommunity({ _id: "comm_1", name: "LifePoints Fans" })

    expect(store.getState().myCommunities.length).toBe(1)
  });

  it("should leave a community by its ID", () => {
    store.getState().joinCommunity({ _id: "comm_1", name: "LifePoints Fans" })
    store.getState().leaveCommunity("comm_1")

    expect(store.getState().myCommunities.length).toBe(0)
  });

  it("should create a new community and add it to myCommunities", () => {
    store.getState().createCommunity({
      name: "Devs",
      description: "Test description",
      icon: "💻",
      banner: "img",
      badges: []
    });

    const createdCommunity = store.getState().myCommunities[0];

    expect(createdCommunity.id).toBe("Devs");
    expect(createdCommunity.title).toBe("Devs");
    expect(createdCommunity.desc).toBe("Test description");
  });

  it("should redeem a standard reward and deduct the correct points", () => {
    store.getState().redeemReward("reward_1");

    expect(mockRemoveLp).toHaveBeenCalledWith(200);
  });

  it("should redeem a discounted reward and deduct the discounted price", () => {
    store.getState().redeemReward("reward_2");

    expect(mockRemoveLp).toHaveBeenCalledWith(300);
  });

  it("should not redeem a reward if the user has insufficient LP", () => {
    store.setState({ profile: { profileLp: 50 } });

    store.getState().redeemReward("reward_1");

    expect(mockRemoveLp).not.toHaveBeenCalled();
  });

  it("should do nothing if the reward does not exist", () => {
    store.getState().redeemReward("fake_reward_123");

    expect(mockRemoveLp).not.toHaveBeenCalled();
  });

  describe("MVP core loop", () => {
    const apiTask = {
      _id: "665f00000000000000000001",
      title: "Morning Hydration",
      description: "Drink water",
      lifepoints: 10,
      category: ["Health", "Morning Routine"],
      icon: "water"
    };

    let mockAddExperience;
    let mockNotifyQuestSystem;

    beforeEach(() => {
      mockAddExperience = jest.fn();
      mockNotifyQuestSystem = jest.fn();
      store.setState({ addExperience: mockAddExperience, notifyQuestSystem: mockNotifyQuestSystem });
    });

    it("should track an API task object and keep a normalized snapshot", () => {
      store.getState().trackTask(apiTask);

      expect(store.getState().activeTaskIds).toEqual([apiTask._id]);
      expect(store.getState().trackedTasks[apiTask._id]).toMatchObject({
        id: apiTask._id,
        title: "Morning Hydration",
        lp: 10,
        xp: 10,
        category: "Health"
      });
    });

    it("should complete a tracked API task by ID and award LP, XP and quest progress", () => {
      store.getState().trackTask(apiTask);
      const completed = store.getState().completeTask(apiTask._id);

      expect(completed).toMatchObject({ id: apiTask._id, lp: 10 });
      expect(store.getState().activeTaskIds).toEqual([]);
      expect(store.getState().trackedTasks).toEqual({});
      expect(store.getState().activities[0]).toMatchObject({ taskId: apiTask._id, points: 10 });
      expect(mockAddLp).toHaveBeenCalledWith(10);
      expect(mockAddExperience).toHaveBeenCalledWith(10);
      expect(mockNotifyQuestSystem).toHaveBeenCalledWith("TASK_COMPLETED", { category: "Health" });
    });

    it("should complete an untracked API task object directly (insta-track)", () => {
      const completed = store.getState().completeTask(apiTask);

      expect(completed?.id).toBe(apiTask._id);
      expect(store.getState().completedTaskIds).toEqual([apiTask._id]);
      expect(mockAddLp).toHaveBeenCalledWith(10);
    });

    it("should return null when completing an unknown task ID", () => {
      expect(store.getState().completeTask("unknown")).toBeNull();
      expect(mockAddExperience).not.toHaveBeenCalled();
    });

    it("should remove the snapshot when a task is cancelled", () => {
      store.getState().trackTask(apiTask);
      store.getState().cancelTask(apiTask._id);

      expect(store.getState().trackedTasks).toEqual({});
    });
  });
});
