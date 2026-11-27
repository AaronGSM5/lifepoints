import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import CommunityChatScreen from "@/app/community/[id]/chat";
import CommunityDetailScreen from "@/app/community/[id]/details";
import CommunityOverviewScreen from "@/app/community/[id]/index";
import useStore from "@/store/useStore";

// Liegt bewusst außerhalb von src/app, sonst liest expo-router die Datei als Route ein

const mockCommunity = { _id: "comm_1", title: "Green Heroes", description: "Test description", memberCount: 42 };

jest.mock("@/api/communities/useCommunityDetail", () => ({
  useCommunityDetail: () => ({ data: mockCommunity })
}));

jest.mock("@/utils/haptics", () => ({
  triggerHaptic: jest.fn()
}));

describe("Community screens", () => {
  const router = useRouter();

  beforeEach(async () => {
    jest.clearAllMocks();
    useLocalSearchParams.mockReturnValue({ id: "comm_1" });
    await act(() => useStore.setState({ myCommunities: [] }));
  });

  describe("CommunityOverviewScreen", () => {
    it("should join the community and replace the route with its chat", async () => {
      const { getByText } = await render(<CommunityOverviewScreen />);

      await fireEvent.press(getByText("Join Community"));

      expect(useStore.getState().myCommunities.length).toBe(1)
      expect(router.replace).toHaveBeenCalledWith("/community/comm_1/chat")
    });

    it("should show 'Open Chat' instead of 'Join Community' for members", async () => {
      await act(() => useStore.setState({ myCommunities: [mockCommunity] }));
      const { getByText, queryByText } = await render(<CommunityOverviewScreen />);

      expect(queryByText("Join Community")).toBe(null)

      await fireEvent.press(getByText("Open Chat"));

      expect(router.push).toHaveBeenCalledWith("/community/comm_1/chat")
    });
  });

  describe("CommunityChatScreen", () => {
    it("should show the joined community and open its details", async () => {
      await act(() => useStore.setState({ myCommunities: [mockCommunity] }));
      const { getByText } = await render(<CommunityChatScreen />);

      expect(getByText("Green Heroes")).toBeTruthy()

      await fireEvent.press(getByText("Tap for more info"));

      expect(router.push).toHaveBeenCalledWith("/community/comm_1/details")
    });

    it("should find a created community by its local ID", async () => {
      await act(() => useStore.getState().createCommunity({ name: "My Crew", description: "Created", badges: [] }));
      const createdCommunity = useStore.getState().myCommunities[0];
      useLocalSearchParams.mockReturnValue({ id: createdCommunity._id });

      const { getByText } = await render(<CommunityChatScreen />);

      expect(getByText("My Crew")).toBeTruthy()
    });
  });

  describe("CommunityDetailScreen", () => {
    it("should leave the community and return to social", async () => {
      await act(() => useStore.setState({ myCommunities: [mockCommunity] }));
      const { getByText } = await render(<CommunityDetailScreen />);

      await fireEvent.press(getByText("Leave Community"));

      expect(router.replace).toHaveBeenCalledWith("/social")
      expect(useStore.getState().myCommunities).toEqual([])
    });

    it("should show 'Community not found' for an unknown ID and go back to social", async () => {
      useLocalSearchParams.mockReturnValue({ id: "unknown" });
      const { getByText } = await render(<CommunityDetailScreen />);

      expect(getByText("Community not found")).toBeTruthy()

      await fireEvent.press(getByText("Go Back"));

      expect(router.replace).toHaveBeenCalledWith("/social")
    });
  });
});
