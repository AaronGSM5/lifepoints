import { renderHook } from "@testing-library/react-native";

import { useChatTimeline } from "./useChatTimeline";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: "de-DE" }
  })
}))

describe("useChatTimeline", () => {
  it("should correctly group messages and assign date labels", async () => {
    const now = new Date()
    const earlierToday = new Date(now.getTime() - 1000 * 60 * 15);
    const yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);

    const mockMessages = [
      { id: "1", text: "Today", createdAt: now.toISOString() },
      { id: "2", text: "Earlier today", createdAt: earlierToday.toISOString() },
      { id: "3", text: "Yesterday", createdAt: yesterday.toISOString() },
    ];

    const { result } = await renderHook(() => useChatTimeline(mockMessages))

    expect(result.current).toHaveLength(3)

    expect(result.current[0].isFirstOfDay).toBe(false)
    expect(result.current[0].dateLabel).toBeDefined()

    expect(result.current[1].isFirstOfDay).toBe(true)
    expect(result.current[2].isFirstOfDay).toBe(true)
  })
})