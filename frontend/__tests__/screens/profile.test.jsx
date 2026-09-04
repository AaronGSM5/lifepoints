import { render, screen } from "@testing-library/react-native";

import { useMyProfile } from "@/api/profile/useMyProfile";
import ProfileScreen from "@/app/(tabs)/profile";

jest.mock("@/api/profile/useMyProfile", () => ({
  useMyProfile: jest.fn()
}));

jest.mock("@/components/layout/ScreenWrapper", () => {
  const { View } = require("react-native");
  return function ScreenWrapper({ children }) {
    return <View testID="screen-wrapper">{children}</View>;
  };
});

jest.mock("@/components/profile/ProfileHeader", () => {
  const { View } = require("react-native");
  return function ProfileHeader({ isLoading }) {
    return <View testID="profile-header" accessibilityState={{ busy: isLoading }} />;
  };
});

jest.mock("@/components/profile/OnboardingGuide", () => {
  const { View } = require("react-native");
  return function OnboardingGuide() {
    return <View testID="onboarding-guide" />;
  };
});

jest.mock("@/components/profile/ProfileStats", () => {
  const { View } = require("react-native");
  return function ProfileStats() {
    return <View testID="profile-stats" />;
  };
});

jest.mock("@/components/profile/ProfileCustomizables", () => {
  const { View } = require("react-native");
  return function ProfileCustomizables() {
    return <View testID="profile-customizables" />;
  };
});

jest.mock("@/components/profile/ProfileTrophies", () => {
  const { View } = require("react-native");
  return function ProfileTrophies() {
    return <View testID="profile-trophies" />;
  };
});

jest.mock("@/components/journal/JournalPreview", () => {
  const { View } = require("react-native");
  return function JournalPreview() {
    return <View testID="journal-preview" />;
  };
});

jest.mock("@/components/profile/InviteFriendCard", () => {
  const { View, Text } = require("react-native");
  return function InviteFriendCard({ referralCode }) {
    return (
      <View testID="invite-friend-card">
        <Text testID="referral-code">{referralCode}</Text>
      </View>
    );
  };
});

const setMockProfileData = (overrides = {}) => {
  useMyProfile.mockReturnValue({
    data: undefined,
    isLoading: false,
    ...overrides
  });
};

describe("ProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when profile data is being fetched", async () => {
    setMockProfileData({ isLoading: true });

    await render(<ProfileScreen />);

    expect(screen.getByTestId("screen-wrapper")).toBeTruthy();
    expect(screen.getByTestId("profile-header")).toBeTruthy();
  });

  it("should render all profile child components with correct data when profile data is loaded", async () => {
    setMockProfileData({
      isLoading: false,
      data: {
        username: "TestUser",
        level: 2,
        stats: { points: 500 },
        tutorialSteps: [],
        customizables: [],
        trophies: [],
        activities: []
      }
    });

    await render(<ProfileScreen />);

    [
      "profile-header",
      "onboarding-guide",
      "profile-stats",
      "profile-customizables",
      "profile-trophies",
      "journal-preview",
      "invite-friend-card"
    ].forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeTruthy();
    });
  });

  it("should pass username from profile data as referral code to the invite friend card", async () => {
    setMockProfileData({
      isLoading: false,
      data: {
        username: "TestUser"
      }
    });

    await render(<ProfileScreen />);

    expect(screen.getByTestId("referral-code").props.children).toBe("TestUser");
  });
});
