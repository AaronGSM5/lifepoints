import { renderHook } from "@testing-library/react-native";

// import { DUMMY_MESSAGES as COMMUNITY_MESSAGES } from "@/mocks/CommunityChat";
import { DUMMY_MESSAGES as USER_MESSAGES } from "@/mocks/UserChat";

import { useChatTimeline } from "./useChatTimeline";

describe("", () => {
  it("should", () => {
    renderHook(() => useChatTimeline(USER_MESSAGES))
  })
})