import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";

import ShopScreen from "@/app/(tabs)/shop";
import { useShop } from "@/hooks/useShop";

const mockSetActiveCat = jest.fn();
const mockRefreshShop = jest.fn();
const mockFetchMore = jest.fn();

let mockStoreState;

// Workaround!
// Rewards from index 0-5 are currently listed in "for you" section and catalog for mock developing reasons.
// Rearange when using real data later
const mockRewards = Array.from({ length: 6 }).map((_, i) => ({
  id: `r${i + 1}`,
  title: `Reward ${i + 1}`,
  points: 100,
  requiredLevel: 1
}));

jest.mock("@/hooks/useAppTheme", () => ({
  useAppTheme: () => ({ primaryAccent: "#000000" })
}));

jest.mock("@/store/useStore", () => ({
  __esModule: true,
  default: jest.fn((selector) => selector(mockStoreState))
}));

jest.mock("@/hooks/useShop", () => ({
  useShop: jest.fn()
}));

jest.mock("@/components/layout/ScreenWrapper", () => {
  const { View } = require("react-native");
  return function ScreenWrapper({ children }) {
    return <View testID="screen-wrapper">{children}</View>;
  };
});

jest.mock("@/components/layout/AnimatedScreenList", () => {
  const { FlatList } = require("react-native");
  return function AnimatedScreenList(props) {
    return <FlatList {...props} testID="animated-screen-list" />;
  };
});

jest.mock("@/components/shop/FeaturedRewardCard", () => {
  const { View } = require("react-native");
  return function FeaturedRewardCard() {
    return <View testID="featured-reward-card" />;
  };
});

jest.mock("@/components/shop/RewardCard", () => {
  const { View, Button } = require("react-native");
  return function RewardCard({ id, title, onPress }) {
    return (
      <View testID={`reward-card-${id}`}>
        <Button testID={`btn-reward-${id}`} title={title || "Reward"} onPress={onPress} />
      </View>
    );
  };
});

jest.mock("@/components/ui/AppLoadingSpinner", () => {
  const { View } = require("react-native");
  return function AppLoadingSpinner() {
    return <View testID="loading-spinner" />;
  };
});

jest.mock("@/components/ui/CategoryButtons", () => {
  const { View, Button } = require("react-native");
  return function CategoryButtons({ categories, setActiveCat }) {
    return (
      <View testID="category-buttons">
        {categories.map((cat) => (
          <Button key={cat} testID={`btn-category-${cat}`} title={cat} onPress={() => setActiveCat(cat)} />
        ))}
      </View>
    );
  };
});

jest.mock("@/components/ui/EmptyView", () => {
  const { View, Button } = require("react-native");
  return function EmptyView({ onAction }) {
    return (
      <View testID="empty-view">
        <Button testID="btn-reset-filter" title="Reset" onPress={onAction} />
      </View>
    );
  };
});

jest.mock("@/components/ui/SectionHeader", () => {
  const { Text } = require("react-native");
  return function SectionHeader({ title }) {
    return <Text testID="section-header">{title}</Text>;
  };
});

const setMockShopData = (changes = {}) => {
  useShop.mockReturnValue({
    rewards: [],
    activeCat: "all",
    setActiveCat: mockSetActiveCat,
    categories: ["all", "tech"],
    isLoading: false,
    isRefreshing: false,
    refreshShop: mockRefreshShop,
    fetchMore: mockFetchMore,
    isFetchingMore: false,
    ...changes
  });
};

describe("ShopScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockStoreState = {
      profile: { level: 2 }
    };

    setMockShopData({ isLoading: true });
  });

  it("should render loading indicators and skeleton items when isLoading is true", async () => {
    await render(<ShopScreen />);

    expect(screen.getByTestId("animated-screen-list")).toBeTruthy();
  });

  it("should render rewards list correctly when data is loaded", async () => {
    setMockShopData({
      isLoading: false,
      rewards: mockRewards
    });

    await render(<ShopScreen />);

    expect(screen.getByTestId("reward-card-r6")).toBeTruthy();
  });

  it("should navigate to reward detail screen when a reward card is pressed", async () => {
    setMockShopData({
      isLoading: false,
      rewards: mockRewards
    });

    await render(<ShopScreen />);
    await fireEvent.press(screen.getByTestId("btn-reward-r6"));

    expect(router.push).toHaveBeenCalledWith("/reward/r6");
  });

  it("should change active category when a category button is pressed", async () => {
    setMockShopData({
      categories: ["all", "tech", "gaming"],
      activeCat: "all"
    });

    await render(<ShopScreen />);

    await fireEvent.press(screen.getByTestId("btn-category-tech"));

    expect(mockSetActiveCat).toHaveBeenCalledWith("tech");
  });

  it("should reset category filter when empty view action is triggered", async () => {
    setMockShopData({
      isLoading: false,
      rewards: [],
      activeCat: "tech"
    });

    await render(<ShopScreen />);

    expect(screen.getByTestId("empty-view")).toBeTruthy();

    await fireEvent.press(screen.getByTestId("btn-reset-filter"));

    expect(mockSetActiveCat).toHaveBeenCalledWith("all");
  });
});
