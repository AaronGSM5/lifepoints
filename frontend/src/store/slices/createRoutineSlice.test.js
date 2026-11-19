import { createStore } from "zustand/vanilla";

import { getDateKey } from "@/utils/routineHelpers";

import { createRoutineSlice } from "./createRoutineSlice";

jest.mock("@/constants/TasksCatalog", () => ({
  tasksCatalog: [
    { id: 1, title: "Bed Boost", description: "Make your bed", xp: 300, lp: 1000, category: "selfcare", icon: "bed" },
    { id: 2, title: "Hydration", description: "Drink water", xp: 100, lp: 500, category: "health", icon: "water" }
  ]
}));

describe("createRoutineSlice", () => {
  let store;
  let mockAddLp;
  let mockAddExperience;
  let mockNotifyQuestSystem;

  const daily = { type: "daily", days: [], timesPerWeek: 3 };

  const createDailyRoutine = (taskIds = [1, 2]) =>
    store.getState().createRoutine({ title: " Morning ", icon: "sun", frequency: daily, taskIds });

  const getRoutine = (id) => store.getState().routines.find((r) => r.id === id);

  const addSteps = (routineId, taskId, count) => {
    for (let i = 0; i < count; i++) {
      store.getState().addRoutineSubStep(routineId, taskId, { title: `Step ${i + 1}` });
    }
    return getRoutine(routineId).tasks.find((task) => task.taskId === taskId).substeps;
  };

  beforeEach(() => {
    mockAddLp = jest.fn();
    mockAddExperience = jest.fn();
    mockNotifyQuestSystem = jest.fn();

    store = createStore((set, get) => ({
      ...createRoutineSlice(set, get),
      activities: [],
      addLp: mockAddLp,
      addExperience: mockAddExperience,
      notifyQuestSystem: mockNotifyQuestSystem
    }));
  });

  it("initializes with no routines", () => {
    expect(store.getState().routines).toEqual([]);
  });

  it("creates a routine with trimmed title and empty task substeps", () => {
    const id = createDailyRoutine();
    const routine = getRoutine(id);

    expect(routine.title).toBe("Morning");
    expect(routine.tasks).toEqual([
      { taskId: 1, substeps: [] },
      { taskId: 2, substeps: [] }
    ]);
    expect(routine.streak.best).toBe(0);
  });

  it("updates a routine and keeps substeps of retained tasks", () => {
    const id = createDailyRoutine();
    addSteps(id, 1, 1);

    store.getState().updateRoutine(id, { title: "Evening", taskIds: [1] });
    const routine = getRoutine(id);

    expect(routine.title).toBe("Evening");
    expect(routine.tasks).toHaveLength(1);
    expect(routine.tasks[0].substeps).toHaveLength(1);
  });

  it("deletes a routine", () => {
    const id = createDailyRoutine();
    store.getState().deleteRoutine(id);
    expect(store.getState().routines).toHaveLength(0);
  });

  it("adopts a public routine only once as editable copy", () => {
    const publicRoutine = {
      id: "pub_1",
      title: "Creator Routine",
      icon: "fire",
      authorUsername: "Mia",
      frequency: { type: "weekly", timesPerWeek: 2 },
      tasks: [{ taskId: 1, substeps: [{ title: "Do it" }] }]
    };

    const firstId = store.getState().adoptPublicRoutine(publicRoutine);
    const secondId = store.getState().adoptPublicRoutine(publicRoutine);
    const routine = getRoutine(firstId);

    expect(secondId).toBe(firstId);
    expect(store.getState().routines).toHaveLength(1);
    expect(routine.source).toEqual({ publicRoutineId: "pub_1", authorUsername: "Mia" });
    expect(routine.tasks[0].substeps[0]._id).toBeDefined();
    expect(routine.tasks[0].substeps[0].isCustom).toBe(false);
  });

  it("pays the split LP and XP per substep with an exact total", () => {
    const id = createDailyRoutine([1]);
    const steps = addSteps(id, 1, 3);

    steps.forEach((step) => store.getState().toggleRoutineSubStep(id, 1, step._id));

    const paidLp = mockAddLp.mock.calls.map(([amount]) => amount);
    const paidXp = mockAddExperience.mock.calls.map(([amount]) => amount);
    expect(paidLp).toEqual([333, 333, 334]);
    expect(paidXp).toEqual([100, 100, 100]);
    expect(store.getState().activities).toHaveLength(3);
    expect(mockNotifyQuestSystem).toHaveBeenCalledTimes(1);
    expect(mockNotifyQuestSystem).toHaveBeenCalledWith("TASK_COMPLETED", { category: "selfcare" });
  });

  it("does not pay a substep twice when it is unchecked and checked again", () => {
    const id = createDailyRoutine([1]);
    const [stepA] = addSteps(id, 1, 2);

    store.getState().toggleRoutineSubStep(id, 1, stepA._id);
    store.getState().toggleRoutineSubStep(id, 1, stepA._id);
    store.getState().toggleRoutineSubStep(id, 1, stepA._id);

    expect(mockAddLp).toHaveBeenCalledTimes(1);
    expect(mockAddLp).toHaveBeenCalledWith(500);
  });

  it("never pays more than the task LP when substeps are added afterwards", () => {
    const id = createDailyRoutine([1]);
    const [first] = addSteps(id, 1, 1);
    store.getState().toggleRoutineSubStep(id, 1, first._id);

    expect(mockAddLp).toHaveBeenLastCalledWith(1000);
    expect(store.getState().toggleRoutineSubStep(id, 1, first._id).completedTask).toBe(false);
    expect(mockAddLp).toHaveBeenCalledTimes(1);
  });

  it("completes a task without substeps with the full reward", () => {
    const id = createDailyRoutine();
    const result = store.getState().completeRoutineTask(id, 2);

    expect(result).toEqual({ completedTask: true, completedRoutine: false });
    expect(mockAddLp).toHaveBeenCalledWith(500);
    expect(mockAddExperience).toHaveBeenCalledWith(100);
  });

  it("pays only the remaining reward when finishing a partially done task", () => {
    const id = createDailyRoutine([1]);
    const [stepA] = addSteps(id, 1, 4);

    store.getState().toggleRoutineSubStep(id, 1, stepA._id);
    store.getState().completeRoutineTask(id, 1);

    expect(mockAddLp.mock.calls.map(([amount]) => amount)).toEqual([250, 750]);
    expect(store.getState().completeRoutineTask(id, 1).completedTask).toBe(false);
  });

  it("counts the streak only once all tasks are done", () => {
    const id = createDailyRoutine();

    store.getState().completeRoutineTask(id, 1);
    expect(getRoutine(id).completedKeys).toEqual([]);

    const result = store.getState().completeRoutineTask(id, 2);
    const routine = getRoutine(id);

    expect(result.completedRoutine).toBe(true);
    expect(routine.completedKeys).toEqual([getDateKey(new Date())]);
    expect(routine.streak.best).toBe(1);
  });

  it("deletes a custom substep", () => {
    const id = createDailyRoutine([1]);
    const [step] = addSteps(id, 1, 1);

    store.getState().deleteRoutineSubStep(id, 1, step._id);
    expect(getRoutine(id).tasks[0].substeps).toHaveLength(0);
  });
});
