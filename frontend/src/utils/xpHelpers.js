
export const getRequiredXpForNextLevel = (level) => {
  const baseXP = 1000;
  const increasePerLevel = 300;

  return baseXP + (level - 1) * increasePerLevel;
};

export const calculateLevelUp = (currentLevel, currentXP) => {
  let level = currentLevel;
  let xp = currentXP;

  let neededXP = getRequiredXpForNextLevel(level);

  while (xp >= neededXP) {
    xp -= neededXP;
    level++;
    neededXP = getRequiredXpForNextLevel(level);
  }

  return { level, xp };
};

export const getXpThreshold = (level) => {
  return 1000 + (level - 1) * 300;
};

export const getLevelProgress = (currentXP, level) => {
  const threshold = getXpThreshold(level);
  return Math.min(currentXP / threshold, 1);
};