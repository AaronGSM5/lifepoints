import { getRequiredXpForNextLevel } from "./xpHelpers";
import { calculateLevelUp } from "./xpHelpers";

describe("getRequiredXpForNextLevel", () => {
  test('should calculate the required XP for level 1', () => {
    expect(getRequiredXpForNextLevel(1)).toBe(1000)
  })

  test('should calculate the required XP for a higher level', () => {
    expect(getRequiredXpForNextLevel(52)).toBe(16300)
  })
})

describe("calculateLevelUp", () => {
  test('should return new level and rest XP', () => {
    expect(calculateLevelUp(1, 3000)).toEqual({ level: 3, xp: 4 })
  })

})