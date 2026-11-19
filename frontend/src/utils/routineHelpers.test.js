import {
  calculateStreak,
  formatFrequency,
  getDateKey,
  getRoutineDayProgress,
  getStreakCalendar,
  getTotalRuns,
  getWeekKey,
  getWeeklyCount,
  isRoutineDueOn,
  isRoutineFullyDone,
  splitReward
} from "./routineHelpers";

// 2026-11-18 ist ein Mittwoch
const WED = new Date(2026, 10, 18, 12, 0, 0);
const day = (offset) => new Date(2026, 10, 18 + offset, 12, 0, 0);
const key = (offset) => getDateKey(day(offset));

const makeRoutine = (frequency, completedOffsets = [], createdOffset = -60) => ({
  id: "r1",
  createdAt: day(createdOffset).toISOString(),
  frequency: { days: [], timesPerWeek: 3, ...frequency },
  tasks: [{ taskId: 1, substeps: [] }],
  completedKeys: completedOffsets.map(key)
});

describe("routineHelpers", () => {
  describe("date keys", () => {
    it("formats local date keys", () => {
      expect(getDateKey(WED)).toBe("2026-11-18");
    });

    it("uses monday as week start", () => {
      expect(getWeekKey(WED)).toBe("2026-11-16");
      expect(getWeekKey(day(4))).toBe("2026-11-16"); // Sonntag
      expect(getWeekKey(day(5))).toBe("2026-11-23"); // Montag
    });
  });

  describe("isRoutineDueOn", () => {
    it("daily is always due", () => {
      expect(isRoutineDueOn(makeRoutine({ type: "daily" }), WED)).toBe(true);
    });

    it("weekdays is due only on selected days", () => {
      const routine = makeRoutine({ type: "weekdays", days: [1, 3, 5] });
      expect(isRoutineDueOn(routine, WED)).toBe(true);
      expect(isRoutineDueOn(routine, day(1))).toBe(false);
    });

    it("weekly is due until the weekly goal is reached", () => {
      const open = makeRoutine({ type: "weekly", timesPerWeek: 2 }, [-2]);
      expect(isRoutineDueOn(open, WED)).toBe(true);

      const reached = makeRoutine({ type: "weekly", timesPerWeek: 2 }, [-2, -1]);
      expect(isRoutineDueOn(reached, WED)).toBe(false);

      const reachedToday = makeRoutine({ type: "weekly", timesPerWeek: 2 }, [-1, 0]);
      expect(isRoutineDueOn(reachedToday, WED)).toBe(true);
    });

    it("counts weekly completions within the current week only", () => {
      const routine = makeRoutine({ type: "weekly" }, [-3, -2, 0]); // -3 = Sonntag der Vorwoche
      expect(getWeeklyCount(routine, WED)).toBe(2);
    });
  });

  describe("splitReward", () => {
    it("splits evenly and gives the remainder to the last step", () => {
      const first = splitReward(1000, 3, 0, false);
      const second = splitReward(1000, 3, first, false);
      const last = splitReward(1000, 3, first + second, true);
      expect([first, second]).toEqual([333, 333]);
      expect(first + second + last).toBe(1000);
    });

    it("never pays more than the task total", () => {
      expect(splitReward(1000, 2, 900, false)).toBe(100);
      expect(splitReward(1000, 2, 1000, true)).toBe(0);
    });

    it("returns 0 for invalid totals", () => {
      expect(splitReward(undefined, 2)).toBe(0);
      expect(splitReward(0, 2)).toBe(0);
    });
  });

  describe("calculateStreak", () => {
    it("counts consecutive completed days for daily routines", () => {
      expect(calculateStreak(makeRoutine({ type: "daily" }, [-2, -1, 0]), WED)).toBe(3);
    });

    it("does not break when today is still open", () => {
      expect(calculateStreak(makeRoutine({ type: "daily" }, [-2, -1]), WED)).toBe(2);
    });

    it("resets after a missed due day", () => {
      expect(calculateStreak(makeRoutine({ type: "daily" }, [-4, -3, -1, 0]), WED)).toBe(2);
    });

    it("skips days that are not due for weekday routines", () => {
      // Mo/Mi/Fr: Fr -5, Mo -2, Mi 0 erledigt; Di/Do/Sa/So nicht fällig
      const routine = makeRoutine({ type: "weekdays", days: [1, 3, 5] }, [-5, -2, 0]);
      expect(calculateStreak(routine, WED)).toBe(3);
    });

    it("breaks on a missed weekday", () => {
      const routine = makeRoutine({ type: "weekdays", days: [1, 3, 5] }, [-7, 0]); // Fr -5 verpasst
      expect(calculateStreak(routine, WED)).toBe(1);
    });

    it("counts weeks for weekly routines", () => {
      // aktuelle Woche: 1/2 (offen), Vorwoche 2/2, Vorvorwoche 2/2
      const routine = makeRoutine({ type: "weekly", timesPerWeek: 2 }, [-15, -13, -8, -6, 0]);
      expect(calculateStreak(routine, WED)).toBe(2);
    });

    it("includes the current week once the goal is met", () => {
      const routine = makeRoutine({ type: "weekly", timesPerWeek: 2 }, [-8, -6, -1, 0]);
      expect(calculateStreak(routine, WED)).toBe(2);
    });

    it("does not look back before the routine was created", () => {
      expect(calculateStreak(makeRoutine({ type: "daily" }, [0], 0), WED)).toBe(1);
      expect(calculateStreak(makeRoutine({ type: "daily" }, [], 0), WED)).toBe(0);
    });
  });

  describe("day progress", () => {
    it("ignores progress from previous days", () => {
      const routine = {
        ...makeRoutine({ type: "daily" }),
        tasks: [
          { taskId: 1, substeps: [] },
          { taskId: 2, substeps: [] }
        ],
        progress: { dateKey: key(-1), tasks: { 1: { done: true } } }
      };
      expect(getRoutineDayProgress(routine, WED)).toEqual({ doneCount: 0, totalCount: 2 });

      routine.progress = { dateKey: key(0), tasks: { 1: { done: true }, 2: { done: true } } };
      expect(isRoutineFullyDone(routine, WED)).toBe(true);
    });
  });

  describe("getStreakCalendar", () => {
    const statusOf = (calendar, offset) => calendar.flat().find((d) => d.dateKey === key(offset))?.status;

    it("builds monday-based weeks ending with the current week", () => {
      const calendar = getStreakCalendar(makeRoutine({ type: "daily" }), WED, 5);
      expect(calendar).toHaveLength(5);
      expect(calendar.every((week) => week.length === 7)).toBe(true);
      expect(calendar[4][0].dateKey).toBe("2026-11-16");
      expect(calendar[0][0].dateKey).toBe("2026-10-19");
    });

    it("marks done, missed, open, future and before-start days", () => {
      const calendar = getStreakCalendar(makeRoutine({ type: "daily" }, [-2], -3), WED);
      expect(statusOf(calendar, -4)).toBe("beforeStart");
      expect(statusOf(calendar, -3)).toBe("missed");
      expect(statusOf(calendar, -2)).toBe("done");
      expect(statusOf(calendar, 0)).toBe("open");
      expect(statusOf(calendar, 1)).toBe("future");
    });

    it("marks non-due weekdays and open weekly goals", () => {
      const weekdays = getStreakCalendar(makeRoutine({ type: "weekdays", days: [1, 3, 5] }), WED);
      expect(statusOf(weekdays, -1)).toBe("notDue");
      expect(statusOf(weekdays, -2)).toBe("missed");

      const weekly = getStreakCalendar(makeRoutine({ type: "weekly", timesPerWeek: 2 }, [-1]), WED);
      expect(statusOf(weekly, -1)).toBe("done");
      expect(statusOf(weekly, -2)).toBe("notDue");
      expect(statusOf(weekly, 0)).toBe("open");
    });

    it("counts total runs", () => {
      expect(getTotalRuns(makeRoutine({ type: "daily" }, [-2, -1]))).toBe(2);
      expect(getTotalRuns({})).toBe(0);
    });
  });

  describe("formatFrequency", () => {
    const t = (k, params) => (params ? `${k}|${JSON.stringify(params)}` : k);

    it("formats the frequency types", () => {
      expect(formatFrequency({ type: "daily" }, t)).toBe("Daily");
      expect(formatFrequency({ type: "weekdays", days: [1, 2, 3, 4, 5] }, t)).toBe("Mon–Fri");
      expect(formatFrequency({ type: "weekdays", days: [5, 1] }, t)).toBe("weekdays.1, weekdays.5");
      expect(formatFrequency({ type: "weekly", timesPerWeek: 3 }, t)).toBe('{{target}}x per week|{"target":3}');
    });
  });
});
