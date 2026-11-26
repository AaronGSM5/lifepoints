export const calculateTaskProgress = (substeps) => {
  if (!substeps?.length) return 0
  const completedSteps = substeps.filter((step) => step.completed).length;
  return Math.min(Math.round((completedSteps / substeps.length) * 100), 100)
}

export const calculateStepPoints = (substeps, lp) => {
  if (!substeps?.length || typeof lp !== "number" || lp <= 0) return 0
  return Math.round(lp / substeps.length)
}

// Vereinheitlicht Tasks aus der API ({ _id, lifepoints, category: [] }) und dem statischen Katalog ({ id, lp, xp })
// zu einem Snapshot, der im Store gespeichert werden kann. Ohne eigenes XP gilt: XP = LP.
export const normalizeTask = (task) => {
  if (!task || typeof task !== "object") return null;

  const id = task._id ?? task.id;
  if (id === undefined || id === null) return null;

  const lp = Number(task.lp ?? task.lifepoints ?? 0) || 0;
  const xp = Number(task.xp ?? lp) || 0;
  const category = Array.isArray(task.category) ? task.category[0] : task.category;

  return {
    id,
    title: task.title,
    description: task.description,
    category,
    icon: task.icon,
    lp,
    xp
  };
};

// Baut einen Eintrag für die Activity-History (wird von Data- und Routine-Slice genutzt)
export const buildTaskActivity = (task, points) => ({
  id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  taskId: task.id,
  title: task.title,
  description: task.description,
  category: task.category,
  points: points || 0,
  type: "gain",
  time: new Date().toISOString(),
  icon: task.icon
})