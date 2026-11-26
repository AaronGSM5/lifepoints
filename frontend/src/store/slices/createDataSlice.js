import { featuredRewards } from '@/constants/FeaturedRewards';
import { rewardsCatalog } from '@/constants/RewardsCatalog';
import { tasksCatalog } from '@/constants/TasksCatalog';
import { recommendedTasks } from '@/mocks/FeaturedTasks';
import { buildTaskActivity, normalizeTask } from '@/utils/taskHelpers';

const findStaticTask = (taskId) =>
  tasksCatalog.find(t => String(t.id) === String(taskId)) ||
  recommendedTasks.find(t => String(t.id) === String(taskId));

// Task-Objekt → normalisiert; ID → zuerst getrackter Snapshot, dann statischer Katalog
const resolveTask = (taskOrId, trackedTasks = {}) => {
  if (taskOrId && typeof taskOrId === "object") return normalizeTask(taskOrId);
  if (taskOrId === undefined || taskOrId === null) return null;

  return trackedTasks?.[String(taskOrId)] || normalizeTask(findStaticTask(taskOrId));
};

export const createDataSlice = (set, get) => ({
  myCommunities: [],
  activities: [],
  activeTaskIds: [],
  completedTaskIds: [],
  // Snapshots getrackter Tasks (id → normalisierter Task), damit API- und Katalog-Tasks gleich behandelt werden
  trackedTasks: {},

  // Akzeptiert ein Task-Objekt (API oder Katalog) oder eine ID aus dem statischen Katalog
  trackTask: (taskOrId) => set((state) => {
    const snapshot = resolveTask(taskOrId, state.trackedTasks);
    const taskId = snapshot?.id ?? taskOrId;

    if (state.activeTaskIds.some(id => String(id) === String(taskId))) return state;

    return {
      activeTaskIds: [taskId, ...state.activeTaskIds],
      trackedTasks: snapshot ? { ...state.trackedTasks, [String(taskId)]: snapshot } : state.trackedTasks
    };
  }),

  // Zentraler Abschluss eines Tasks: Activity, LP, XP und Quest-Fortschritt.
  // Gibt den abgeschlossenen Task zurück (oder null, wenn er nicht gefunden wurde).
  completeTask: (taskOrId) => {
    const task = resolveTask(taskOrId, get().trackedTasks);
    if (!task) return null;

    const taskKey = String(task.id);
    const newActivity = buildTaskActivity(task, task.lp);

    set((state) => {
      const { [taskKey]: _removed, ...remainingTracked } = state.trackedTasks || {};
      return {
        activeTaskIds: state.activeTaskIds.filter(id => String(id) !== taskKey),
        trackedTasks: remainingTracked,
        completedTaskIds: [...state.completedTaskIds, task.id],
        activities: [newActivity, ...state.activities].slice(0, 100),
      };
    });

    const { addLp, addExperience, notifyQuestSystem } = get();
    if (task.lp) addLp(task.lp);
    if (task.xp && addExperience) addExperience(task.xp);
    if (notifyQuestSystem) notifyQuestSystem("TASK_COMPLETED", { category: task.category });

    return task;
  },

  cancelTask: (taskId) => set((state) => {
    const { [String(taskId)]: _removed, ...remainingTracked } = state.trackedTasks || {};
    return {
      activeTaskIds: state.activeTaskIds.filter(id => String(id) !== String(taskId)),
      trackedTasks: remainingTracked
    };
  }),

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
      myCommunities: state.myCommunities.filter(c => c._id !== communityId)
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