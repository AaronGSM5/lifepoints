import { fireEvent, render, screen } from "@testing-library/react-native";

import SocialScreen from "@/app/(tabs)/social";

const mockExploreTabFn = jest.fn();
const getLastExploreTabProps = () => mockExploreTabFn.mock.calls.at(-1)[0];

jest.mock("@/hooks/useToolbarPadding", () => ({
  useToolbarPadding: jest.fn(() => 40)
}));

jest.mock("@/components/layout/ScreenWrapper", () => {
  const { View } = require("react-native");
  return function ScreenWrapper({ children }) {
    return <View testID="screen-wrapper">{children}</View>;
  };
});

jest.mock("@/components/tasks/NavigationRow", () => {
  const { View, Button } = require("react-native");
  return function NavigationRow({ tabs, onTabChange }) {
    return (
      <View testID="navigation-row">
        {tabs.map((tab, index) => (
          <Button key={tab} testID={`tab-btn-${tab.toLowerCase()}`} title={tab} onPress={() => onTabChange(index)} />
        ))}
      </View>
    );
  };
});

jest.mock("@/components/social/ConnectTab", () => {
  const { View } = require("react-native");
  return function ConnectTab() {
    return <View testID="connect-tab" />;
  };
});

jest.mock("@/components/social/ExploreTab", () => {
  const { View } = require("react-native");
  return function ExploreTab(props) {
    mockExploreTabFn(props);
    return <View testID="explore-tab" />;
  };
});

describe("SocialScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ConnectTab by default on initial mount", async () => {
    await render(<SocialScreen />);

    expect(screen.getByTestId("connect-tab")).toBeTruthy();
    expect(screen.queryByTestId("explore-tab")).toBeNull();
  });

  it("should render the NavigationRow containing Connect and Explore tabs", async () => {
    await render(<SocialScreen />);

    expect(screen.getByTestId("navigation-row")).toBeTruthy();
    expect(screen.getByTestId("tab-btn-connect")).toBeTruthy();
    expect(screen.getByTestId("tab-btn-explore")).toBeTruthy();
  });

  it("should switch to the ExploreTab when the Explore tab is pressed", async () => {
    await render(<SocialScreen />);

    await fireEvent.press(screen.getByTestId("tab-btn-explore"));

    expect(screen.queryByTestId("connect-tab")).toBeNull();
    expect(screen.getByTestId("explore-tab")).toBeTruthy();
  });

  it("should switch back to the ConnectTab when the Connect tab is pressed", async () => {
    await render(<SocialScreen />);

    await fireEvent.press(screen.getByTestId("tab-btn-explore"));
    await fireEvent.press(screen.getByTestId("tab-btn-connect"));

    expect(screen.getByTestId("connect-tab")).toBeTruthy();
    expect(screen.queryByTestId("explore-tab")).toBeNull();
  });

  it("should pass the animated scrollY instance to the ExploreTab", async () => {
    await render(<SocialScreen />);

    await fireEvent.press(screen.getByTestId("tab-btn-explore"));

    expect(mockExploreTabFn).toHaveBeenCalled();
    expect(getLastExploreTabProps().scrollY).toBeDefined();
  });
});
