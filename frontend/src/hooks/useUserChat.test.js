import { act, renderHook } from "@testing-library/react-native";

import { useUserChat } from "./useUserChat";

jest.mock("./useChatTimeline", () => ({
  useChatTimeline: (messages) => messages
}))

describe("useUserChat", () => {
  it("should initialize with default values", async () => {
    const { result } = await renderHook(() => useUserChat())

    expect(result.current.inputText).toBe("")
    expect(result.current.chatMessages).toEqual([])
  })

  it("should update inputText and send message correctly", async () => {
    const { result } = await renderHook(() => useUserChat())

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
    const { result } = await renderHook(() => useUserChat())

    await act(() => {
      result.current.setInputText("   ")
      result.current.sendMessage()
    })

    expect(result.current.chatMessages).toHaveLength(0)
  })

  it("should initialize with provided initial messages", async () => {
    const initialMessages = [{ id: "0", text: "TestMessage Text", senderId: "other" }];
    const { result } = await renderHook(() => useUserChat(initialMessages))

    expect(result.current.chatMessages).toHaveLength(1)
    expect(result.current.chatMessages[0].text).toBe("TestMessage Text")
  })
})