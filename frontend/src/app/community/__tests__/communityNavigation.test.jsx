import { Text } from "react-native";

import { act, fireEvent, renderRouter, screen } from "expo-router/testing-library";

import useStore from "@/store/useStore";

import CommunityChatScreen from "../[id]/chat";
import CommunityDetailScreen from "../[id]/details";
import CommunityOverviewScreen from "../[id]/index";

jest.unmock("expo-router");

const mockCommunity = { _id: "c1", title: "Green Heroes", description: "Wir pflanzen Bäume", memberCount: 42 };

jest.mock("@/api/communities/useCommunityDetail", () => ({
  useCommunityDetail: () => ({ data: mockCommunity })
}));

jest.mock("@/utils/haptics", () => ({
  triggerHaptic: jest.fn()
}));

const SocialStub = () => <Text>Social Tab</Text>;

const routes = {
  "(tabs)/social": SocialStub,
  "community/[id]/index": CommunityOverviewScreen,
  "community/[id]/chat": CommunityChatScreen,
  "community/[id]/details": CommunityDetailScreen
};

describe("Community-Navigation", () => {
  beforeEach(async () => {
    await act(() => useStore.setState({ myCommunities: [] }));
  });

  it("tritt einer Community bei und landet direkt im Chat", async () => {
    // renderRouter hängt getPathname an das (asynchrone) Render-Ergebnis an
    const view = renderRouter(routes, { initialUrl: "/community/c1" });
    await view;

    await fireEvent.press(await screen.findByText("Join Community"));

    expect(view.getPathname()).toBe("/community/c1/chat");
    expect(useStore.getState().myCommunities.map((c) => c._id)).toEqual(["c1"]);
    expect(await screen.findByText("Green Heroes")).toBeTruthy();
  });

  it("zeigt Mitgliedern 'Open Chat' statt 'Join Community'", async () => {
    await act(() => useStore.setState({ myCommunities: [mockCommunity] }));
    // renderRouter hängt getPathname an das (asynchrone) Render-Ergebnis an
    const view = renderRouter(routes, { initialUrl: "/community/c1" });
    await view;

    expect(screen.queryByText("Join Community")).toBeNull();
    await fireEvent.press(await screen.findByText("Open Chat"));

    expect(view.getPathname()).toBe("/community/c1/chat");
  });

  it("öffnet aus dem Chat die Details und verlässt die Community", async () => {
    await act(() => useStore.setState({ myCommunities: [mockCommunity] }));
    // renderRouter hängt getPathname an das (asynchrone) Render-Ergebnis an
    const view = renderRouter(routes, { initialUrl: "/community/c1/chat" });
    await view;

    await fireEvent.press(await screen.findByText("Tap for more info"));
    expect(view.getPathname()).toBe("/community/c1/details");

    await fireEvent.press(await screen.findByText("Leave Community"));
    expect(view.getPathname()).toBe("/social");
    expect(useStore.getState().myCommunities).toEqual([]);
  });

  it("findet selbst erstellte Communities in Chat und Details", async () => {
    await act(() =>
      useStore.getState().createCommunity({ name: "Meine Crew", description: "Lokal erstellt", badges: ["eco"] })
    );
    const created = useStore.getState().myCommunities[0];

    // renderRouter hängt getPathname an das (asynchrone) Render-Ergebnis an
    const view = renderRouter(routes, { initialUrl: `/community/${created._id}/chat` });
    await view;
    expect(await screen.findByText("Meine Crew")).toBeTruthy();

    await fireEvent.press(screen.getByText("Tap for more info"));
    expect(view.getPathname()).toBe(`/community/${created._id}/details`);
    expect(await screen.findByText("Lokal erstellt")).toBeTruthy();

    await fireEvent.press(screen.getByText("Leave Community"));
    expect(view.getPathname()).toBe("/social");
    expect(useStore.getState().myCommunities).toEqual([]);
  });

  it("führt bei unbekannter Community zurück zu Social", async () => {
    // renderRouter hängt getPathname an das (asynchrone) Render-Ergebnis an
    const view = renderRouter(routes, { initialUrl: "/community/unknown/details" });
    await view;

    expect(await screen.findByText("Community not found")).toBeTruthy();
    await fireEvent.press(screen.getByText("Go Back"));

    expect(view.getPathname()).toBe("/social");
  });
});
