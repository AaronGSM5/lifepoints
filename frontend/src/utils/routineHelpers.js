// Reine Hilfsfunktionen für Routinen (Fälligkeit, Fortschritt, Streak, Belohnungs-Aufteilung)
import { tasksCatalog } from "@/constants/TasksCatalog";

export const FREQUENCY_TYPES = {
  DAILY: "daily",
  WEEKDAYS: "weekdays",
  WEEKLY: "weekly"
};

// Reihenfolge der Wochentage in der UI (Mo–So), Werte entsprechen Date.getDay()
export const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const MAX_STREAK_LOOKBACK_DAYS = 3660;

const pad = (n) => String(n).padStart(2, "0");

const toDate = (value) => (value instanceof Date ? new Date(value.getTime()) : new Date(value));

const startOfDay = (value) => {
  const d = toDate(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (value, amount) => {
  const d = toDate(value);
  d.setDate(d.getDate() + amount);
  return d;
};

// Lokales Datum als "YYYY-MM-DD"
export const getDateKey = (value = new Date()) => {
  const d = toDate(value);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const parseDateKey = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// Woche beginnt am Montag; Key ist der DateKey des Montags
export const getWeekKey = (value = new Date()) => {
  const d = startOfDay(value);
  const diffToMonday = (d.getDay() + 6) % 7;
  return getDateKey(addDays(d, -diffToMonday));
};

export const getWeeklyCount = (routine, value = new Date()) => {
  const weekKey = getWeekKey(value);
  return (routine?.completedKeys || []).filter((key) => getWeekKey(parseDateKey(key)) === weekKey).length;
};

export const isRoutineCompletedOn = (routine, value = new Date()) =>
  (routine?.completedKeys || []).includes(getDateKey(value));

export const isRoutineDueOn = (routine, value = new Date()) => {
  const frequency = routine?.frequency;
  if (!frequency) return false;

  switch (frequency.type) {
    case FREQUENCY_TYPES.DAILY:
      return true;
    case FREQUENCY_TYPES.WEEKDAYS:
      return (frequency.days || []).includes(toDate(value).getDay());
    case FREQUENCY_TYPES.WEEKLY:
      // Flexibles Ziel: fällig, solange das Wochenziel offen ist (oder heute bereits erledigt)
      return isRoutineCompletedOn(routine, value) || getWeeklyCount(routine, value) < (frequency.timesPerWeek || 1);
    default:
      return false;
  }
};

// Fortschritt nur für den aktuellen Tag; ältere Einträge gelten als leer
export const getTodayProgress = (routine, value = new Date()) => {
  const progress = routine?.progress;
  if (!progress || progress.dateKey !== getDateKey(value)) return {};
  return progress.tasks || {};
};

export const getTaskProgress = (routine, taskId, value = new Date()) => {
  const entry = getTodayProgress(routine, value)[String(taskId)];
  return {
    completedStepIds: entry?.completedStepIds || [],
    paidStepIds: entry?.paidStepIds || [],
    paidLp: entry?.paidLp || 0,
    paidXp: entry?.paidXp || 0,
    done: Boolean(entry?.done)
  };
};

export const getRoutineDayProgress = (routine, value = new Date()) => {
  const tasks = routine?.tasks || [];
  const doneCount = tasks.filter((task) => getTaskProgress(routine, task.taskId, value).done).length;
  return { doneCount, totalCount: tasks.length };
};

export const isRoutineFullyDone = (routine, value = new Date()) => {
  const { doneCount, totalCount } = getRoutineDayProgress(routine, value);
  return totalCount > 0 && doneCount === totalCount;
};

// Anteil eines Schritts an der Task-Belohnung. Gedeckelt auf den Rest, der letzte Schritt
// erhält genau den Rest, damit die Summe immer exakt der Task-Belohnung entspricht.
export const splitReward = (total, stepCount, alreadyPaid = 0, isLastStep = false) => {
  if (typeof total !== "number" || total <= 0) return 0;
  const remaining = Math.max(total - alreadyPaid, 0);
  if (isLastStep || !stepCount) return remaining;
  return Math.min(Math.round(total / stepCount), remaining);
};

const calculateDayStreak = (routine, today, createdAt) => {
  let streak = 0;
  let cursor = startOfDay(today);

  // Heute zählt nur, wenn bereits erledigt; ein offener heutiger Tag bricht nichts ab
  if (isRoutineDueOn(routine, cursor)) {
    if (isRoutineCompletedOn(routine, cursor)) streak += 1;
  }
  cursor = addDays(cursor, -1);

  for (let i = 0; i < MAX_STREAK_LOOKBACK_DAYS && cursor >= createdAt; i++) {
    if (isRoutineDueOn(routine, cursor)) {
      if (!isRoutineCompletedOn(routine, cursor)) break;
      streak += 1;
    }
    cursor = addDays(cursor, -1);
  }

  return streak;
};

const calculateWeekStreak = (routine, today, createdAt) => {
  const target = routine.frequency.timesPerWeek || 1;
  let streak = 0;
  let cursor = parseDateKey(getWeekKey(today));

  if (getWeeklyCount(routine, cursor) >= target) streak += 1;
  cursor = addDays(cursor, -7);

  const createdWeek = parseDateKey(getWeekKey(createdAt));
  for (let i = 0; i < MAX_STREAK_LOOKBACK_DAYS / 7 && cursor >= createdWeek; i++) {
    if (getWeeklyCount(routine, cursor) < target) break;
    streak += 1;
    cursor = addDays(cursor, -7);
  }

  return streak;
};

// Streak in fälligen Einheiten: Tage (täglich/Wochentage) bzw. Wochen (X-mal pro Woche)
export const calculateStreak = (routine, today = new Date()) => {
  if (!routine?.frequency) return 0;
  const createdAt = startOfDay(routine.createdAt || today);

  if (routine.frequency.type === FREQUENCY_TYPES.WEEKLY) {
    return calculateWeekStreak(routine, today, createdAt);
  }
  return calculateDayStreak(routine, today, createdAt);
};

// Summe der LP aller Tasks einer Routine (Tasks werden per taskId im Katalog nachgeschlagen)
export const getRoutineTotalLp = (routine, catalog = tasksCatalog) =>
  (routine?.tasks || []).reduce((sum, routineTask) => {
    const task = catalog.find((entry) => String(entry.id) === String(routineTask.taskId));
    return sum + (task?.lp || 0);
  }, 0);

export const formatAdopters = (count = 0) =>
  count >= 1000 ? `${(count / 1000).toFixed(1).replace(".0", "")}k` : String(count);

export const getTotalRuns = (routine) => (routine?.completedKeys || []).length;

const getDayStatus = (routine, date, today, createdAt) => {
  if (date > today) return "future";
  if (date < createdAt) return "beforeStart";
  if (isRoutineCompletedOn(routine, date)) return "done";

  const isToday = getDateKey(date) === getDateKey(today);
  if (routine.frequency?.type === FREQUENCY_TYPES.WEEKLY) {
    return isToday && isRoutineDueOn(routine, date) ? "open" : "notDue";
  }
  if (!isRoutineDueOn(routine, date)) return "notDue";
  return isToday ? "open" : "missed";
};

// Kalender der letzten Wochen (Mo–So, letzte Zeile = aktuelle Woche) für die Streak-Ansicht
export const getStreakCalendar = (routine, value = new Date(), weeks = 5) => {
  const today = startOfDay(value);
  const createdAt = startOfDay(routine?.createdAt || value);
  const firstMonday = addDays(parseDateKey(getWeekKey(today)), -(weeks - 1) * 7);

  return Array.from({ length: weeks }, (_, weekIndex) =>
    Array.from({ length: 7 }, (__, dayIndex) => {
      const date = addDays(firstMonday, weekIndex * 7 + dayIndex);
      return { dateKey: getDateKey(date), status: getDayStatus(routine, date, today, createdAt) };
    })
  );
};

const sameDays = (a, b) => a.length === b.length && a.every((day) => b.includes(day));

export const formatFrequency = (frequency, t, value = new Date(), routine = null) => {
  if (!frequency) return "";

  if (frequency.type === FREQUENCY_TYPES.WEEKLY) {
    const target = frequency.timesPerWeek || 1;
    if (routine) {
      return t("{{count}}/{{target}} this week", { count: getWeeklyCount(routine, value), target });
    }
    return t("{{target}}x per week", { target });
  }

  if (frequency.type === FREQUENCY_TYPES.WEEKDAYS) {
    const days = frequency.days || [];
    if (days.length === 7) return t("Daily");
    if (sameDays(days, [1, 2, 3, 4, 5])) return t("Mon–Fri");
    if (sameDays(days, [0, 6])) return t("Weekends");
    return WEEKDAY_ORDER.filter((day) => days.includes(day))
      .map((day) => t(`weekdays.${day}`))
      .join(", ");
  }

  return t("Daily");
};

export const createRoutineId = () => `routine-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const createStepId = () => `step-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
