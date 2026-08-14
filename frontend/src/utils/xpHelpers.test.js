import { calculateLevelUp, getLevelProgress, getRequiredXpForNextLevel } from "./xpHelpers";

describe("getRequiredXpForNextLevel", () => {
  it('should calculate the required XP for level 1', () => {
    expect(getRequiredXpForNextLevel(1)).toBe(1000)
  })

  it('should calculate the required XP for a higher level', () => {
    expect(getRequiredXpForNextLevel(52)).toBe(16300)
  })
})

describe("calculateLevelUp", () => {
  it('should return new level and rest XP', () => {
    expect(calculateLevelUp(1, 3000)).toEqual({ level: 3, xp: 700 })
  })

  it('should return same level with no XP', () => {
    expect(calculateLevelUp(1, 0)).toEqual({ level: 1, xp: 0 })
  })

  it('should level up with no rest XP', () => {
    expect(calculateLevelUp(1, 1000)).toEqual({ level: 2, xp: 0 })
  })
})

describe("getLevelProgress", () => {
  it('should return no level progress in decimal', () => {
    expect(getLevelProgress(1, 0)).toBe(0)
  })

  it('should return 50% level progress in decimal', () => {
    expect(getLevelProgress(1, 500)).toBe(0.5)
  })

  it('should return 100% level progress in decimal', () => {
    expect(getLevelProgress(1, 1000)).toBe(1)
  })

  it('should cap level progress at 100% in decimal', () => {
    expect(getLevelProgress(1, 9999)).toBe(1)
  })
})