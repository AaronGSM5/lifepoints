import { act, renderHook } from "@testing-library/react-native";

import useStore from "@/store/useStore";

import { useCommentLogic } from "./useCommentLogic";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

jest.mock("@/store/useStore")

describe("useCommentLogic", () => {

  beforeEach(() => {
    jest.clearAllMocks()
    useStore.mockImplementation((selector) => selector({
      profile: { activeStatusBadge: "badge_gold" }
    }))
  })

  it("should initialize with default values", async () => {
    const { result } = await renderHook(() => useCommentLogic())
    expect(result.current.commentText).toBe("")
    expect(result.current.replyingTo).toBeNull()
    expect(result.current.isRefreshing).toBe(false)
  })

  it("should toggle like status when handleLikeComment is called", async () => {
    const { result } = await renderHook(() => useCommentLogic())

    const firstCommentId = result.current.comments[0].id
    const initialLikeState = result.current.comments[0].isLiked

    await act(() => {
      result.current.handleLikeComment(firstCommentId)
    })

    expect(result.current.comments[0].isLiked).toBe(!initialLikeState)
  })

  it("should set replyingTo state and update commentText when handleReply is called", async () => {
    const { result } = await renderHook(() => useCommentLogic())

    await act(() => {
      result.current.handleReply("comment_test_id", "TestUser")
    })

    expect(result.current.replyingTo).toEqual({ parentId: "comment_test_id", username: "TestUser" })
    expect(result.current.commentText).toBe("@TestUser ")
  })

  it("should not post a comment if commentText is empty or whitespace", async () => {
    const { result } = await renderHook(() => useCommentLogic())
    const initialLength = result.current.comments.length

    await act(() => {
      result.current.setCommentText("    ")
      result.current.handlePostComment()
    })
    expect(result.current.comments.length).toBe(initialLength)
  })

  it("should add a top-level comment and reset input when not replying", async () => {
    const { result } = await renderHook(() => useCommentLogic())

    await act(() => {
      result.current.setCommentText("This is a test top-level comment.")
    })

    await act(() => {
      result.current.handlePostComment()
    })

    expect(result.current.comments[0].text).toBe("This is a test top-level comment.")
    expect(result.current.comments[0].username).toBe("You")
    expect(result.current.comments[0].badge).toBe("badge_gold")

    expect(result.current.commentText).toBe("")
    expect(result.current.replyingTo).toBeNull()
  })

  it("should add a reply to the correct parent comment when replyingTo is set", async () => {
    const { result } = await renderHook(() => useCommentLogic())

    const parentId = result.current.comments[0].id

    await act(() => {
      result.current.handleReply(parentId, "TestUser")
      result.current.setCommentText("This is a test reply comment.")
    })

    await act(() => {
      result.current.handlePostComment()
    })

    const parentComment = result.current.comments.find((c) => c.id === parentId)

    expect(parentComment.replies).toBeDefined()
    const latestReply = parentComment.replies[parentComment.replies.length - 1]
    expect(latestReply.text).toBe("This is a test reply comment.")

    expect(result.current.commentText).toBe("")
    expect(result.current.replyingTo).toBeNull()
  })
})