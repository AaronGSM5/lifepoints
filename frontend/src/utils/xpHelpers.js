
export const getRequiredXpForNextLevel = (level) => {
  const baseXP = 1000;
  const increasePerLevel = 300;

  return baseXP + (level - 1) * increasePerLevel;
};

export const calculateLevelUp = (currentLevel, currentXp) => {
  let level = currentLevel;
  let xp = currentXp;

  let neededXP = getRequiredXpForNextLevel(level);

  while (xp >= neededXP) {
    xp -= neededXP;
    level++;
    neededXP = getRequiredXpForNextLevel(level);
  }

  return { level, xp };
};

export const getLevelProgress = (currentLevel, currentXp) => {
  const reqXp = getRequiredXpForNextLevel(currentLevel);
  return Math.min(currentXp / reqXp, 1);
};