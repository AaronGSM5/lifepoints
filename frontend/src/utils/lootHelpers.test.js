import { mockCustomizables } from "@/mocks/Customizables";

import { generateTripleLoot } from "./lootHelpers";

describe("generateTripleLoot", () => {
  const allCustomizables = [...mockCustomizables.badges, ...mockCustomizables.frames]
  const unlockedCustomizables = ["frame_neon", "frame_amethyst", "badge_rookie", "badge_elite"]
  const allCustomizableIds = allCustomizables.map(item => item.id)

  it("should return exactly 3 items", () => {
    expect(generateTripleLoot()).toHaveLength(3)
  })

  it("should return not unlocked items only", () => {
    const result = generateTripleLoot(unlockedCustomizables)
    result.forEach(item => {
      expect(unlockedCustomizables).not.toContain(item.id)
    })
  })

  it("should trigger fallback when no high rarity is present", () => {
    // sets Math.random() result alsways to 0 so no rare items are there
    const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0)
    const result = generateTripleLoot()

    expect(result.some(item => item.rarity.id === "epic" || item.rarity.id === "legendary")).toBe(true)

    randomSpy.mockRestore()
  })

  it("should only return currency items if user has unlocked all items", () => {
    const result = generateTripleLoot(allCustomizableIds)
    result.forEach(item => {
      expect(item).toHaveProperty("amount")
    })
  })
})