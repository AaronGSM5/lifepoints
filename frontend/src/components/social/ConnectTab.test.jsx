import React from "react";

import { act, fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";

import useStore from "@/store/useStore";

import ConnectTab from "./ConnectTab";

jest.mock("@/hooks/useToolbarPadding", () => ({
  useToolbarPadding: () => 50
}));

// Formular-Stub: getestet wird nur, dass ConnectTab onCreate an den Store weitergibt
jest.mock("@/components/forms/community/CreateCommunityForm", () => {
  const { Pressable, Text } = require("react-native");
  const MockCreateCommunityForm = ({ visible, onCreate }) =>
    visible ? (
      <Pressable onPress={() => onCreate({ name: "New Crew", description: "Test description", badges: [] })}>
        <Text>Submit Form</Text>
      </Pressable>
    ) : null;
  return { __esModule: true, default: MockCreateCommunityForm };
});

describe("ConnectTab", () => {
  const router = useRouter();

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(() => useStore.setState({ myCommunities: [] }));
  });

  it("should render the communities from the store", async () => {
    await act(() => useStore.setState({ myCommunities: [{ _id: "comm_1", title: "Green Heroes", memberCount: 42 }] }));
    const { getByText } = await render(<ConnectTab />);

    expect(getByText("Green Heroes")).toBeTruthy()
    expect(getByText("42")).toBeTruthy()
  });

  it("should navigate to the community chat when a card is pressed", async () => {
    await act(() => useStore.setState({ myCommunities: [{ _id: "comm_1", title: "Green Heroes" }] }));
    const { getByText } = await render(<ConnectTab />);

    await fireEvent.press(getByText("Green Heroes"));

    expect(router.push).toHaveBeenCalledWith("/community/comm_1/chat")
  });

  it("should add a created community to the list", async () => {
    const { getByLabelText, getByText } = await render(<ConnectTab />);

    await fireEvent.press(getByLabelText("Create community"));
    await fireEvent.press(getByText("Submit Form"));

    expect(useStore.getState().myCommunities[0].title).toBe("New Crew")
    expect(getByText("New Crew")).toBeTruthy()
  });
});
