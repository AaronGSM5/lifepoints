import {
  mockTasks,
  mockRecommendedTasks,
  mockTrophies,
  mockRewards,
  mockMyCommunities,
  mockRecommendedCommunities,
  mockQuests,
  mockFeaturedRewards,
} from '@/constants/MockData';

export const createDataSlice = (set, get) => ({
  tasks: mockTasks,
  recommendedTasks: mockRecommendedTasks,
  trophies: mockTrophies,
  rewards: mockRewards,
  featuredRewards: mockFeaturedRewards,
  communities: { myCommunities: mockMyCommunities || [], recommendedCommunities: mockRecommendedCommunities },
  quests: mockQuests,
  activities: [],
  activeTaskIds: [],
  completedTaskIds: [],

  trackTask: (taskId) => set((state) => {
    if (state.activeTaskIds.includes(taskId)) return state;

    return {
      activeTaskIds: [taskId, ...state.activeTaskIds]
    };
  }),

  completeTask: (taskId) => {
    const task = get().tasks.find(t => t.id === taskId) || get().recommendedTasks.find(t => t.id === taskId);
    if (!task) return;

    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newActivity = {
      id: `history-task-${task.id}-${timeString}`,
      title: task.title,
      description: task.description,
      category: task.category,
      points: task.lp || 0,
      type: 'gain',
      time: timeString,
      icon: task.icon,
    };

    set((state) => {
      const updatedActivities = [...state.activities];
      const todayIndex = updatedActivities.findIndex(s => s.title === "Heute");

      if (todayIndex !== -1) {
        updatedActivities[todayIndex] = {
          ...updatedActivities[todayIndex],
          data: [newActivity, ...updatedActivities[todayIndex].data]
        };
      } else {
        updatedActivities.unshift({
          title: "Heute",
          data: [newActivity]
        });
      }

      return {
        activeTaskIds: state.activeTaskIds.filter(id => id !== taskId),
        completedTaskIds: [...state.completedTaskIds, taskId],
        activities: updatedActivities,
      };
    });

    if (task.lp) get().addLp(task.lp);
  },

  cancelTask: (taskId) => set((state) => ({
    activeTaskIds: state.activeTaskIds.filter(id => id !== taskId)
  })),

  joinCommunity: (newCommunity) => set((state) => {
    if (!newCommunity || !newCommunity.id) return state;
    const currentMyCommunities = state.communities?.myCommunities || [];

    if (currentMyCommunities.some(c => c?.id === newCommunity.id)) return state;
    return {
      communities: {
        ...state.communities,
        recommendedCommunities: state.communities.recommendedCommunities.filter(c => c.id !== newCommunity.id),
        myCommunities: [newCommunity, ...currentMyCommunities]
      }
    };
  }),

  leaveCommunity: (community) => set((state) => {
    if (!community || !community.id) return state;
    const currentMyCommunities = state.communities?.myCommunities || [];

    if (!currentMyCommunities.some(c => c?.id === community.id)) {
      return state;
    }

    return {
      communities: {
        ...state.communities,
        recommendedCommunities: [...state.communities.recommendedCommunities, community],
        myCommunities: currentMyCommunities.filter(c => c.id !== community.id)
      }
    };
  }),

  createCommunity: (data) => set((state) => {
    const newCommunity = {
      id: data.name,
      title: data.name,
      desc: data.description,
      icon: data.icon,
      banner: data.banner,
      badges: data.badges
    }
    return {
      communities: {
        ...state.communities,
        myCommunities: [newCommunity, ...get().communities.myCommunities]
      }
    }
  }),

  collectQuestReward: (questId) => {
    const allQuests = [...get().quests.today, ...get().quests.week];
    const quest = allQuests.find(q => q.id === questId);

    if (quest && quest.completed && !quest.collected) {
      get().addLp(quest.points);

      set((state) => {
        const markCollected = (list) => list.map(q => q.id === questId ? { ...q, collected: true } : q);
        return {
          quests: {
            today: markCollected(state.quests.today),
            week: markCollected(state.quests.week)
          }
        };
      });
    }
  },

  redeemReward: (rewardId) => {
    const reward = get().rewards.find(r => r.id === rewardId) || get().featuredRewards.find(r => r.id === rewardId)
    if (!reward) return;
    const isDiscount = reward.discount
    const price = isDiscount ? reward?.discount?.newPrice : reward.points
    const currentLp = get().profile.profileLp
    if (!currentLp) return
    if (currentLp >= price) get().removeLp(price)
  }
});