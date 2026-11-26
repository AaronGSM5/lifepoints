import { fireEvent, render, screen } from "@testing-library/react-native";

import FriendsTab from "./FriendsTab";

const mockAddFriend = jest.fn();
const mockRemoveFriend = jest.fn();

jest.mock("@/store/useStore", () => {
  const store = jest.fn((selector) =>
    selector({
      profile: { friends: ["user_velo_01"], username: "me" },
      addFriend: mockAddFriend,
      removeFriend: mockRemoveFriend
    })
  );
  return { __esModule: true, default: store };
});

jest.mock("@/components/profile/InviteFriendCard", () => {
  const { View } = require("react-native");
  return function InviteFriendCard() {
    return <View testID="invite-friend-card" />;
  };
});

jest.mock("@/utils/haptics", () => ({ triggerHaptic: jest.fn() }));

const search = async (text) => {
  await fireEvent.changeText(screen.getByPlaceholderText("Search by name or username"), text);
};

describe("FriendsTab", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should show followed users, suggestions and the invite card without a search query", async () => {
    await render(<FriendsTab />);

    expect(screen.getByText("Following (1)")).toBeTruthy();
    expect(screen.getByText("Velo Mindset")).toBeTruthy();
    expect(screen.getByText("Suggestions")).toBeTruthy();
    expect(screen.getByTestId("invite-friend-card")).toBeTruthy();
  });

  it("should find users by partial username, case-insensitive and with a leading @", async () => {
    await render(<FriendsTab />);
    await search("@pixel");

    expect(screen.getByText("Search results (1)")).toBeTruthy();
    expect(screen.getByText("Jan Pixel")).toBeTruthy();
    expect(screen.queryByText("Velo Mindset")).toBeNull();
  });

  it("should find users by partial display name", async () => {
    await render(<FriendsTab />);
    await search("elena");

    expect(screen.getByText("Elena Nox")).toBeTruthy();
  });

  it("should show an empty state when nobody matches", async () => {
    await render(<FriendsTab />);
    await search("zzzz-nobody");

    expect(screen.getByText("No users found")).toBeTruthy();
  });

  it("should follow a user from the search results", async () => {
    await render(<FriendsTab />);
    await search("pixel");
    await fireEvent.press(screen.getByLabelText("Follow Jan Pixel"));

    expect(mockAddFriend).toHaveBeenCalledWith("user_pixel_02");
  });
});
