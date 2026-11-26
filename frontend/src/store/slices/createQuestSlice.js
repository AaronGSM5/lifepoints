import { questCatalog } from '@/constants/QuestCatalog';

const pad = (value) => String(value).padStart(2, "0");
const toDayKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Schlüssel für den aktuellen Tag bzw. die aktuelle Woche (Wochenstart Montag, lokale Zeit)
export const getQuestPeriodKeys = (now = new Date()) => {
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return { daily: toDayKey(now), weekly: toDayKey(monday) };
};

export const createQuestSlice = (set, get) => ({
  questProgress: {},
  questPeriods: null,

  // MVP: Reset clientseitig beim Tages-/Wochenwechsel, bis das Backend Quests verwaltet
  syncQuestPeriods: (now = new Date()) => {
    const current = getQuestPeriodKeys(now);
    const previous = get().questPeriods;

    if (previous?.daily === current.daily && previous?.weekly === current.weekly) return;

    set((state) => {
      const newProgress = { ...state.questProgress };
      if (previous && previous.daily !== current.daily) {
        questCatalog.today.forEach((q) => delete newProgress[q.id]);
      }
      if (previous && previous.weekly !== current.weekly) {
        questCatalog.week.forEach((q) => delete newProgress[q.id]);
      }
      return { questProgress: newProgress, questPeriods: current };
    });
  },

  notifyQuestSystem: (triggerType, data = {}) => {
    get().syncQuestPeriods();

    const allQuests = [...questCatalog.today, ...questCatalog.week];

    const activeQuests = allQuests.filter(q => q.trigger === triggerType);

    activeQuests.forEach(quest => {
      const current = get().questProgress[quest.id]?.progress || 0;
      const isCollected = get().questProgress[quest.id]?.isCollected || false;

      if (isCollected || current >= quest.target) return;

      let increment = 1;

      if (triggerType === "TASK_COMPLETED" && quest.metadata?.taskCategory) {
        if (data.category !== quest.metadata.taskCategory) {
          increment = 0;
        }
      }

      if (increment > 0) {
        get().updateQuestProgress(quest.id, increment);
      }
    });
  },

  updateQuestProgress: (questId, amount) => {
    set((state) => {
      const current = state.questProgress[questId]?.progress || 0;
      const questDef = [...questCatalog.today, ...questCatalog.week].find(q => q.id === questId);

      return {
        questProgress: {
          ...state.questProgress,
          [questId]: {
            progress: Math.min(current + amount, questDef.target),
            isCollected: false
          }
        }
      };
    });
  },

  claimQuestReward: (questId) => {
    const progressData = get().questProgress[questId];

    const allQuests = [...questCatalog.today, ...questCatalog.week];
    const questDef = allQuests.find(q => q.id === questId);

    if (progressData && progressData.progress >= questDef.target && !progressData.isCollected) {
      set((state) => ({
        questProgress: {
          ...state.questProgress,
          [questId]: { ...progressData, isCollected: true }
        }
      }));

      get().addLp(questDef.points);

      return true;
    }
    return false;
  },

  resetDailyQuests: () => {
    const dailyIds = questCatalog.today.map(q => q.id);
    set((state) => {
      const newProgress = { ...state.questProgress };
      dailyIds.forEach(id => delete newProgress[id]);
      return { questProgress: newProgress };
    });
  }
});