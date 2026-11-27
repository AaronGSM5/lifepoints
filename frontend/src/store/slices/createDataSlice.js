import { featuredRewards } from '@/constants/FeaturedRewards';
import { rewardsCatalog } from '@/constants/RewardsCatalog';
import { tasksCatalog } from '@/constants/TasksCatalog';
import { recommendedTasks } from '@/mocks/FeaturedTasks';
import { buildTaskActivity } from '@/utils/taskHelpers';

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

    const newActivity = buildTaskActivity(task, task.lp);

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
    const communityId = community?._id || community?.id;
    if (!communityId) return state;

    const isAlreadyJoined = state.myCommunities.some(c =>
      c?._id === communityId || c?.id === communityId
    );

    if (isAlreadyJoined) return state;

    return {
      myCommunities: [community, ...state.myCommunities]
    };
  }),

  leaveCommunity: (communityId) => set((state) => {
    return {
      myCommunities: state.myCommunities.filter(c => c?._id !== communityId && c?.id !== communityId)
    }
  }),

  createCommunity: (data) => set((state) => {
    // Lokale ID, bis Communities über das Backend erstellt werden
    const localId = `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const newCommunity = {
      _id: localId,
      id: localId,
      title: data.name,
      description: data.description,
      icon: data.icon,
      banner: data.banner,
      badges: data.badges,
      size: data.size,
      memberCount: 1,
      onlineCount: 0,
      isOwner: true
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