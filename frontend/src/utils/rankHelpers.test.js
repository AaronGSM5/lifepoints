import { RANK_COLORS } from "@/constants/Ranks";

import { getRankColor } from "./rankHelpers";

describe("getRankColor", () => {
  it("should return the first place color for rank index 0", () => {
    expect(getRankColor(0)).toBe(RANK_COLORS.first)
  })

  it("should return the second place color for rank index 1", () => {
    expect(getRankColor(1)).toBe(RANK_COLORS.second)
  })

  it("should return the third place color for rank index 2", () => {
    expect(getRankColor(2)).toBe(RANK_COLORS.third)
  })

  it("should return the default color for any other rank index", () => {
    expect(getRankColor(3)).toBe(RANK_COLORS.default)
    expect(getRankColor(40)).toBe(RANK_COLORS.default)
  })
})