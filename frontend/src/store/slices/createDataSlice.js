import {
  mockTasks,
  mockTrophies,
  mockRewards,
  mockMyCommunities
} from '@/constants/MockData';

export const createDataSlice = (set, get) => ({
  tasks: mockTasks,
  trophies: mockTrophies,
  rewards: mockRewards,
  communities: mockMyCommunities,
  completedTaskIds: [],

  // Eine Task abschließen
  completeTask: (taskId) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (!task || get().completedTaskIds.includes(taskId)) return;

    // 1. Task als erledigt markieren
    set((state) => ({
      completedTaskIds: [...state.completedTaskIds, taskId],
      // XP und LP dem Profil hinzufügen (Action aus AuthSlice nutzen)
    }));

    // 2. XP & Punkte gutschreiben
    get().addXp(task.xp);
  },

  // Trophäen-Fortschritt aktualisieren
  updateTrophyProgress: (trophyId, amount) => set((state) => ({
    trophies: state.trophies.map(t => {
      if (t.id === trophyId) {
        const newProgress = Math.min(t.progress + amount, t.goal);
        const isNowUnlocked = newProgress >= t.goal;
        return {
          ...t,
          progress: newProgress,
          unlocked: isNowUnlocked,
          justUnlocked: isNowUnlocked && !t.unlocked
        };
      }
      return t;
    })
  })),

  // Community beitreten
  joinCommunity: (newCommunity) => set((state) => ({
    communities: [newCommunity, ...state.communities]
  })),
});