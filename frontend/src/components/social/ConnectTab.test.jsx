import { act, fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";

import ConnectTab from "@/components/social/ConnectTab";
import useStore from "@/store/useStore";

jest.mock("@/hooks/useToolbarPadding", () => ({
  useToolbarPadding: () => 50
}));

// Formular durch einen Stub ersetzen: getestet wird, dass ConnectTab onCreate korrekt verdrahtet
jest.mock("@/components/forms/community/CreateCommunityForm", () => {
  const { Pressable, Text } = require("react-native");
  const MockForm = ({ visible, onCreate }) =>
    visible ? (
      <Pressable onPress={() => onCreate({ name: "Neue Crew", description: "Test", icon: "leaf", badges: ["eco"] })}>
        <Text>Submit Form</Text>
      </Pressable>
    ) : null;
  return { __esModule: true, default: MockForm };
});

describe("ConnectTab", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(() => useStore.setState({ myCommunities: [] }));
  });

  it("zeigt die Communities aus dem Store statt fester Mock-Daten", async () => {
    await act(() =>
      useStore.setState({ myCommunities: [{ _id: "c1", title: "Green Heroes", memberCount: 42, onlineCount: 0 }] })
    );
    const { getByText, queryByText } = await render(<ConnectTab />);

    expect(getByText("Green Heroes")).toBeTruthy();
    expect(getByText("42")).toBeTruthy();
    expect(queryByText("React Native Devs")).toBeNull();
  });

  it("navigiert beim Tippen in den Community-Chat", async () => {
    await act(() => useStore.setState({ myCommunities: [{ _id: "c1", title: "Green Heroes" }] }));
    const { getByText } = await render(<ConnectTab />);

    await fireEvent.press(getByText("Green Heroes"));

    expect(router.push).toHaveBeenCalledWith("/community/c1/chat");
  });

  it("legt eine erstellte Community an und zeigt sie in der Liste", async () => {
    const { getByLabelText, getByText, findByText } = await render(<ConnectTab />);

    await fireEvent.press(getByLabelText("Create community"));
    await fireEvent.press(getByText("Submit Form"));

    const created = useStore.getState().myCommunities[0];
    expect(created.title).toBe("Neue Crew");

    await fireEvent.press(await findByText("Neue Crew"));
    expect(router.push).toHaveBeenCalledWith(`/community/${created._id}/chat`);
  });
});
