import { renderHook } from "@testing-library/react-native";

import { DEFAULT_FRAME_ID, useAvatarFrames } from "./useAvatarFrames";

jest.mock("@/hooks/useAppTheme", () => ({
  useAppTheme: () => ({
    secondary: "rgb(200, 200, 200)",
    gold: "rgb(255, 215, 0)",
  }),
}))

describe("useAvatarFrames", () => {
  it('should return all avatar frames and correctly integrate theme colors', async () => {
    const { result } = await renderHook(() => useAvatarFrames())
    expect(result.current.AVATAR_FRAMES).toHaveLength(6)

    expect(result.current.AVATAR_FRAMES[0].id).toBe(DEFAULT_FRAME_ID)
    expect(result.current.AVATAR_FRAMES[0].color).toBe("rgb(200, 200, 200)")

    expect(result.current.AVATAR_FRAMES[5].color).toBe("rgb(255, 215, 0)")
  })

  it("should find a specific frame by id using getFrameById", async () => {
    const { result } = await renderHook(() => useAvatarFrames())
    const neonFrame = result.current.getFrameById("frame_neon")
    expect(neonFrame).toBeTruthy()
    expect(neonFrame.name).toBe("Neon Glow")
    expect(neonFrame.color).toBe("#00E5FF")
    expect(neonFrame.glow).toBe(true)
  })

  it("should return null when using getFrameById with invalid id", async () => {
    const { result } = await renderHook(() => useAvatarFrames())
    expect(result.current.getFrameById("invalid_id")).toBeNull()
  })
})