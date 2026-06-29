import { tasksCatalog } from '@/constants/TasksCatalog';
import { recommendedTasks } from '@/mocks/FeaturedTasks';
import { rewardsCatalog } from '@/constants/RewardsCatalog';
import { featuredRewards } from '@/constants/FeaturedRewards';

export const createDataSlice = (set, get) => ({
  myCommunities: [],
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
    const task = tasksCatalog.find(t => String(t.id) === String(taskId)) || recommendedTasks.find(t => String(t.id) === String(taskId));
    if (!task) return;

    const newActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      taskId: task.id,
      title: task.title,
      description: task.description,
      category: task.category,
      points: task.lp || 0,
      type: 'gain',
      time: new Date().toISOString(),
      icon: task.icon,
    };

    set((state) => ({
      activeTaskIds: state.activeTaskIds.filter(id => String(id) !== String(taskId)),
      completedTaskIds: [...state.completedTaskIds, taskId],
      activities: [newActivity, ...state.activities].slice(0, 100),
    }));

    if (task.lp) get().addLp(task.lp);
  },

  cancelTask: (taskId) => set((state) => ({
    activeTaskIds: state.activeTaskIds.filter(id => String(id) !== String(taskId))
  })),

  joinCommunity: (community) => set((state) => {
    if (!community || !community.id) return state;

    if (state.myCommunities.some(c => c?.id === community.id)) return state;

    return {
      myCommunities: [community, ...state.myCommunities]
    };
  }),

  leaveCommunity: (communityId) => set((state) => {
    return {
      myCommunities: state.myCommunities.filter(c => c.id !== communityId)
    }
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
      myCommunities: [newCommunity, ...state.myCommunities]
    };
  }),

  redeemReward: (rewardId) => {
    const reward = rewardsCatalog.find(r => r.id === rewardId) || featuredRewards.find(r => r.id === rewardId)
    if (!reward) return;
    const isDiscount = reward.discount
    const price = isDiscount ? reward?.discount?.newPrice : reward.points
    const currentLp = get().profile.profileLp

    if (currentLp === undefined || currentLp < price) return
    get().removeLp(price)
  }
});