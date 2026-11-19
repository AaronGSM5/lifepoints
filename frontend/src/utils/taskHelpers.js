export const calculateTaskProgress = (substeps) => {
  if (!substeps?.length) return 0
  const completedSteps = substeps.filter((step) => step.completed).length;
  return Math.min(Math.round((completedSteps / substeps.length) * 100), 100)
}

export const calculateStepPoints = (substeps, lp) => {
  if (!substeps?.length || typeof lp !== "number" || lp <= 0) return 0
  return Math.round(lp / substeps.length)
}