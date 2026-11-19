export const calculateTaskProgress = (substeps) => {
  if (!substeps?.length) return 0
  const completedSteps = substeps.filter((step) => step.completed).length;
  return Math.min(Math.round((completedSteps / substeps.length) * 100), 100)
}

export const calculateStepPoints = (substeps, lp) => {
  if (!substeps?.length || typeof lp !== "number" || lp <= 0) return 0
  return Math.round(lp / substeps.length)
}

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