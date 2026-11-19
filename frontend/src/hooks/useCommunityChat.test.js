import { act, renderHook } from "@testing-library/react-native";

import { useCommunityChat } from "./useCommunityChat";

jest.mock("./useChatTimeline", () => ({
  useChatTimeline: (messages) => messages
}))

describe("useCommunityChat", () => {
  it("should initialize with default values", async () => {
    const { result } = await renderHook(() => useCommunityChat())

    expect(result.current.inputText).toBe("")
    expect(result.current.chatMessages).toEqual([])
  })

  it("should update inputText and send message correctly", async () => {
    const { result } = await renderHook(() => useCommunityChat())

    await act(() => {
      result.current.setInputText("TestString")
    })
    expect(result.current.inputText).toBe("TestString")

    await act(() => {
      result.current.sendMessage()
    })

    expect(result.current.inputText).toBe("")
    expect(result.current.chatMessages).toHaveLength(1)

    const sentMessage = result.current.chatMessages[0]
    expect(sentMessage.id).toBeDefined()
    expect(sentMessage.text).toBe("TestString")
    expect(sentMessage.senderId).toBe("me")
    expect(sentMessage.createdAt).toBeDefined()
    expect(sentMessage.time).toBeDefined()
  })

  it("should not send a message if input is empty or whitespace", async () => {
    const { result } = await renderHook(() => useCommunityChat())

    await act(() => {
      result.current.setInputText("   ")
      result.current.sendMessage()
    })

    expect(result.current.chatMessages).toHaveLength(0)
  })

  it("should initialize with provided initial messages", async () => {
    const initialMessages = [{ id: "0", text: "TestMessage Text", senderId: "other" }];
    const { result } = await renderHook(() => useCommunityChat(initialMessages))

    expect(result.current.chatMessages).toHaveLength(1)
    expect(result.current.chatMessages[0].text).toBe("TestMessage Text")
  })
})