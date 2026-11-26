import { render } from "@testing-library/react-native";
import { usePathname } from "expo-router";

import ProfileScreen from "@/app/(tabs)/profile";
import SocialScreen from "@/app/(tabs)/social";
import TasksScreen from "@/app/(tabs)/tasks";
import Navbar from "@/components/layout/Navbar";

// Prüft das MVP-Verhalten mit den echten Feature-Flags (siehe MVP-SCOPE.md)

const mockNavigationRow = jest.fn();

jest.mock("@/store/useStore", () => {
  const store = jest.fn((selector) =>
    selector({
      disableInstaTrackingModal: jest.fn(),
      completeTask: jest.fn(),
      resetProfile: jest.fn(),
      profile: { profileLp: 100, friends: [], username: "me" }
    })
  );
  return { __esModule: true, default: store };
});

jest.mock("@/hooks/useTasks", () => ({ useTasks: () => ({ quests: { today: [], week: [] } }) }));
jest.mock("@/hooks/useToolbarPadding", () => ({ useToolbarPadding: () => 50 }));
jest.mock("@/hooks/useProfileView", () => ({
  useProfileView: () => ({ data: { username: "me", activities: [] }, isLoading: false })
}));

jest.mock("@/components/layout/ScreenWrapper", () => {
  const { View } = require("react-native");
  return function ScreenWrapper({ children }) {
    return <View testID="screen-wrapper">{children}</View>;
  };
});

jest.mock("@/components/tasks/NavigationRow", () => {
  const { View } = require("react-native");
  return function NavigationRow(props) {
    mockNavigationRow(props);
    return <View testID="navigation-row" />;
  };
});

jest.mock("@/components/tasks/TodayTab", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="today-tab" />;
  };
});
jest.mock("@/components/tasks/CatalogTab", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="catalog-tab" />;
  };
});
jest.mock("@/components/tasks/RoutinesTab", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="routines-tab" />;
  };
});
jest.mock("@/components/tasks/QuestModal", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="quest-modal" />;
  };
});
jest.mock("@/components/home/InstaTrackingModal", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="insta-modal" />;
  };
});
jest.mock("@/components/social/ConnectTab", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="connect-tab" />;
  };
});
jest.mock("@/components/social/ExploreTab", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="explore-tab" />;
  };
});
jest.mock("@/components/social/FriendsTab", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="friends-tab" />;
  };
});
jest.mock("@/components/profile/ProfileHeader", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="profile-header" />;
  };
});
jest.mock("@/components/profile/OnboardingGuide", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="onboarding-guide" />;
  };
});
jest.mock("@/components/profile/ProfileStats", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="profile-stats" />;
  };
});
jest.mock("@/components/profile/ProfileCustomizables", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="profile-customizables" />;
  };
});
jest.mock("@/components/profile/ProfileTrophies", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="profile-trophies" />;
  };
});
jest.mock("@/components/journal/JournalPreview", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="journal-preview" />;
  };
});
jest.mock("@/components/profile/InviteFriendCard", () => {
  const { View } = require("react-native");
  return function MockComponent() {
    return <View testID="invite-friend-card" />;
  };
});

jest.mock("@/components/layout/NavbarItem", () => {
  const { View } = require("react-native");
  return function NavbarItem({ route }) {
    return <View testID={`navbar-item-${route.name}`} />;
  };
});

describe("MVP scope", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue("/tasks");
  });

  it("Tasks: shows only Today and Catalog sub-tabs (no Routines)", async () => {
    const { getByTestId } = await render(<TasksScreen />);

    expect(getByTestId("today-tab")).toBeTruthy();
    expect(mockNavigationRow).toHaveBeenLastCalledWith(expect.objectContaining({ tabs: ["Today", "Catalog"] }));
  });

  it("Social: shows the friends view instead of chats and communities", async () => {
    const { getByTestId, queryByTestId } = await render(<SocialScreen />);

    expect(getByTestId("friends-tab")).toBeTruthy();
    expect(queryByTestId("connect-tab")).toBeNull();
    expect(queryByTestId("explore-tab")).toBeNull();
    expect(queryByTestId("navigation-row")).toBeNull();
  });

  it("Profile: shows header and journal only (invite card lives on /social)", async () => {
    const { getByTestId, queryByTestId } = await render(<ProfileScreen />);

    expect(getByTestId("profile-header")).toBeTruthy();
    expect(getByTestId("journal-preview")).toBeTruthy();
    expect(queryByTestId("invite-friend-card")).toBeNull();
    expect(queryByTestId("onboarding-guide")).toBeNull();
    expect(queryByTestId("profile-stats")).toBeNull();
    expect(queryByTestId("profile-customizables")).toBeNull();
    expect(queryByTestId("profile-trophies")).toBeNull();
  });

  it("Navbar: hides the Shop tab", async () => {
    const routes = ["home", "tasks", "social", "shop", "profile"].map((name) => ({ key: `${name}-key`, name }));
    const { getByTestId, queryByTestId } = await render(
      <Navbar state={{ routes, index: 0 }} navigation={{ emit: jest.fn(), navigate: jest.fn() }} />
    );

    expect(getByTestId("navbar-item-home")).toBeTruthy();
    expect(getByTestId("navbar-item-profile")).toBeTruthy();
    expect(queryByTestId("navbar-item-shop")).toBeNull();
  });
});
