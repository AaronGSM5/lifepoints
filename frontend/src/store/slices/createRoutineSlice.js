import { tasksCatalog } from "@/constants/TasksCatalog";
import {
  calculateStreak,
  createRoutineId,
  createStepId,
  getDateKey,
  getTaskProgress,
  getTodayProgress,
  isRoutineFullyDone,
  splitReward
} from "@/utils/routineHelpers";
import { buildTaskActivity } from "@/utils/taskHelpers";

const findCatalogTask = (taskId) => tasksCatalog.find((task) => String(task.id) === String(taskId));

const normalizeFrequency = (frequency = {}) => ({
  type: frequency.type || "daily",
  days: Array.isArray(frequency.days) ? [...frequency.days] : [],
  timesPerWeek: frequency.timesPerWeek || 3
});

const buildRoutineTasks = (taskIds = [], existingTasks = []) =>
  taskIds.map((taskId) => {
    const existing = existingTasks.find((task) => String(task.taskId) === String(taskId));
    return existing || { taskId, substeps: [] };
  });

export const createRoutineSlice = (set, get) => {
  const updateRoutineById = (routineId, updater) =>
    set((state) => ({
      routines: state.routines.map((routine) => (routine.id === routineId ? updater(routine) : routine))
    }));

  // Schreibt den heutigen Fortschritt eines Tasks und prüft danach Routine-Abschluss & Streak
  const commitTaskProgress = (routineId, taskId, nextTaskProgress) => {
    const now = new Date();
    const todayKey = getDateKey(now);
    let completedRoutine = false;

    updateRoutineById(routineId, (routine) => {
      const updated = {
        ...routine,
        progress: {
          dateKey: todayKey,
          tasks: { ...getTodayProgress(routine, now), [String(taskId)]: nextTaskProgress }
        }
      };

      if (isRoutineFullyDone(updated, now) && !(updated.completedKeys || []).includes(todayKey)) {
        completedRoutine = true;
        updated.completedKeys = [...(updated.completedKeys || []), todayKey];
      }

      const current = calculateStreak(updated, now);
      updated.streak = { best: Math.max(routine.streak?.best || 0, current) };
      return updated;
    });

    return completedRoutine;
  };

  const payout = (task, lp, xp) => {
    if (lp > 0) {
      get().addLp?.(lp);
      set((state) => ({ activities: [buildTaskActivity(task, lp), ...(state.activities || [])].slice(0, 100) }));
    }
    if (xp > 0) get().addExperience?.(xp);
  };

  return {
    routines: [],

    createRoutine: ({ title, icon, frequency, taskIds, source = null, substepsByTask = {} }) => {
      const id = createRoutineId();
      const tasks = buildRoutineTasks(taskIds).map((task) => ({
        ...task,
        substeps: (substepsByTask[task.taskId] || []).map((step) => ({ ...step, _id: step._id || createStepId() }))
      }));

      const routine = {
        id,
        title: title.trim(),
        icon: icon || "sun",
        createdAt: new Date().toISOString(),
        frequency: normalizeFrequency(frequency),
        source,
        tasks,
        progress: null,
        completedKeys: [],
        streak: { best: 0 }
      };

      set((state) => ({ routines: [routine, ...state.routines] }));
      return id;
    },

    updateRoutine: (routineId, { title, icon, frequency, taskIds }) =>
      updateRoutineById(routineId, (routine) => ({
        ...routine,
        title: title !== undefined ? title.trim() : routine.title,
        icon: icon || routine.icon,
        frequency: frequency ? normalizeFrequency(frequency) : routine.frequency,
        tasks: taskIds ? buildRoutineTasks(taskIds, routine.tasks) : routine.tasks
      })),

    deleteRoutine: (routineId) =>
      set((state) => ({ routines: state.routines.filter((routine) => routine.id !== routineId) })),

    // Übernimmt eine öffentliche Routine als frei bearbeitbare Kopie
    adoptPublicRoutine: (publicRoutine) => {
      const existing = get().routines.find((routine) => routine.source?.publicRoutineId === publicRoutine.id);
      if (existing) return existing.id;

      const substepsByTask = {};
      publicRoutine.tasks.forEach((task) => {
        substepsByTask[task.taskId] = (task.substeps || []).map((step) => ({ ...step, _id: undefined, isCustom: false }));
      });

      return get().createRoutine({
        title: publicRoutine.title,
        icon: publicRoutine.icon,
        frequency: publicRoutine.frequency,
        taskIds: publicRoutine.tasks.map((task) => task.taskId),
        source: { publicRoutineId: publicRoutine.id, authorUsername: publicRoutine.authorUsername },
        substepsByTask
      });
    },

    addRoutineSubStep: (routineId, taskId, { title, description = "" }) =>
      updateRoutineById(routineId, (routine) => ({
        ...routine,
        tasks: routine.tasks.map((task) =>
          String(task.taskId) === String(taskId)
            ? { ...task, substeps: [...task.substeps, { _id: createStepId(), title, description, isCustom: true }] }
            : task
        )
      })),

    deleteRoutineSubStep: (routineId, taskId, stepId) =>
      updateRoutineById(routineId, (routine) => ({
        ...routine,
        tasks: routine.tasks.map((task) =>
          String(task.taskId) === String(taskId)
            ? { ...task, substeps: task.substeps.filter((step) => step._id !== stepId) }
            : task
        )
      })),

    // Schritt abhaken: zahlt den Anteil sofort aus (max. einmal pro Schritt und Tag).
    // Gibt { completedTask, completedRoutine } zurück, damit die UI Feedback geben kann.
    toggleRoutineSubStep: (routineId, taskId, stepId) => {
      const routine = get().routines.find((r) => r.id === routineId);
      const routineTask = routine?.tasks.find((task) => String(task.taskId) === String(taskId));
      const catalogTask = findCatalogTask(taskId);
      if (!routine || !routineTask || !catalogTask) return { completedTask: false, completedRoutine: false };

      const progress = getTaskProgress(routine, taskId);
      if (progress.done) return { completedTask: false, completedRoutine: false };

      const isChecked = progress.completedStepIds.includes(stepId);
      const completedStepIds = isChecked
        ? progress.completedStepIds.filter((id) => id !== stepId)
        : [...progress.completedStepIds, stepId];

      const stepCount = routineTask.substeps.length;
      const done = routineTask.substeps.every((step) => completedStepIds.includes(step._id));

      let lp = 0;
      let xp = 0;
      let paidStepIds = progress.paidStepIds;
      if (!isChecked && !paidStepIds.includes(stepId)) {
        lp = splitReward(catalogTask.lp, stepCount, progress.paidLp, done);
        xp = splitReward(catalogTask.xp, stepCount, progress.paidXp, done);
        paidStepIds = [...paidStepIds, stepId];
      }

      payout(catalogTask, lp, xp);
      if (done) get().notifyQuestSystem?.("TASK_COMPLETED", { category: catalogTask.category });

      const completedRoutine = commitTaskProgress(routineId, taskId, {
        completedStepIds,
        paidStepIds,
        paidLp: progress.paidLp + lp,
        paidXp: progress.paidXp + xp,
        done
      });

      return { completedTask: done, completedRoutine };
    },

    // Task komplett abschließen (ohne Schritte oder über "Finish"): zahlt den offenen Rest aus
    completeRoutineTask: (routineId, taskId) => {
      const routine = get().routines.find((r) => r.id === routineId);
      const routineTask = routine?.tasks.find((task) => String(task.taskId) === String(taskId));
      const catalogTask = findCatalogTask(taskId);
      if (!routine || !routineTask || !catalogTask) return { completedTask: false, completedRoutine: false };

      const progress = getTaskProgress(routine, taskId);
      if (progress.done) return { completedTask: false, completedRoutine: false };

      const lp = splitReward(catalogTask.lp, 1, progress.paidLp, true);
      const xp = splitReward(catalogTask.xp, 1, progress.paidXp, true);
      payout(catalogTask, lp, xp);
      get().notifyQuestSystem?.("TASK_COMPLETED", { category: catalogTask.category });

      const allStepIds = routineTask.substeps.map((step) => step._id);
      const completedRoutine = commitTaskProgress(routineId, taskId, {
        completedStepIds: allStepIds,
        paidStepIds: [...new Set([...progress.paidStepIds, ...allStepIds])],
        paidLp: progress.paidLp + lp,
        paidXp: progress.paidXp + xp,
        done: true
      });

      return { completedTask: true, completedRoutine };
    }
  };
};
