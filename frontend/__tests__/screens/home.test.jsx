import { fireEvent, render, screen } from "@testing-library/react-native";

import HomeScreen from "@/app/(tabs)/home";
import { useHome } from "@/hooks/useHome";

const mockSetShowLevelUpModal = jest.fn();
const mockRefreshHomeData = jest.fn();

let mockStoreState;

jest.mock("@/store/useStore", () => {
  return {
    __esModule: true,
    default: jest.fn((selector) => selector(mockStoreState))
  };
});

jest.mock("@/hooks/useHome", () => ({
  useHome: jest.fn()
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

jest.mock("@/components/ui/HeroCarousel", () => {
  const { View } = require("react-native");
  return function HeroCarousel() {
    return <View testID="hero-carousel" />;
  };
});

jest.mock("@/components/ui/SectionHeader", () => {
  const { Text } = require("react-native");
  return function SectionHeader({ title }) {
    return <Text testID="section-header">{title}</Text>;
  };
});

jest.mock("@/components/ui/AppLoadingSpinner", () => {
  const { View } = require("react-native");
  return function AppLoadingSpinner() {
    return <View testID="loading-spinner" />;
  };
});

jest.mock("@/components/home/FeedItem", () => {
  const { View, Button } = require("react-native");
  return function FeedItem({ id, onOpenComments, onOpenOptions }) {
    return (
      <View testID={`feed-item-${id}`}>
        <Button testID={`btn-comment-${id}`} title="Comment" onPress={() => onOpenComments(id)} />
        <Button testID={`btn-options-${id}`} title="Options" onPress={() => onOpenOptions(id, true)} />
      </View>
    );
  };
});

jest.mock("@/components/home/CommentSheet", () => {
  const { View, Button } = require("react-native");
  return function CommentSheet({ isVisible, onClose }) {
    if (!isVisible) return null;
    return (
      <View testID="comment-sheet">
        <Button testID="close-comment" title="Close" onPress={onClose} />
      </View>
    );
  };
});

jest.mock("@/components/home/PostOptionsSheet", () => {
  const { View, Button } = require("react-native");
  return function PostOptionsSheet({ isVisible, onClose }) {
    if (!isVisible) return null;
    return (
      <View testID="options-sheet">
        <Button testID="close-options" title="Close" onPress={onClose} />
      </View>
    );
  };
});

jest.mock("@/components/LevelUpModal", () => {
  const { View, Button } = require("react-native");
  return function LevelUpModal({ visible, onTransitionEnd }) {
    if (!visible) return null;
    return (
      <View testID="level-up-modal">
        <Button testID="close-level-up" title="Close" onPress={onTransitionEnd} />
      </View>
    );
  };
});

jest.mock("@/components/home/LootGameModal", () => {
  const { View } = require("react-native");
  return function LootGameModal() {
    return <View testID="loot-game-modal" />;
  };
});

const setMockHomeData = (changes = {}) => {
  useHome.mockReturnValue({
    isLoading: false,
    isRefreshing: false,
    feedItems: [],
    refreshHomeData: mockRefreshHomeData,
    ...changes
  });
};

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockStoreState = {
      showLevelUpModal: false,
      setShowLevelUpModal: mockSetShowLevelUpModal,
      profile: { level: 5 }
    };

    setMockHomeData({ isLoading: true });
  });

  it("should render the loading skeleton and HeroCarousel when isLoading is true", async () => {
    await render(<HomeScreen />);

    expect(screen.getByTestId("hero-carousel")).toBeTruthy();
    expect(screen.getByTestId("animated-screen-list")).toBeTruthy();
  });

  it("should render the feed items correctly when data is loaded", async () => {
    setMockHomeData({
      feedItems: [
        { id: "1", title: "First Post" },
        { id: "2", title: "Second Post" }
      ]
    });

    await render(<HomeScreen />);

    expect(screen.getByTestId("feed-item-1")).toBeTruthy();
    expect(screen.getByTestId("feed-item-2")).toBeTruthy();
  });

  it("should open the CommentSheet when onOpenComments is triggered from a FeedItem", async () => {
    setMockHomeData({ feedItems: [{ id: "post-1", content: "Test Post" }] });

    await render(<HomeScreen />);

    await fireEvent.press(screen.getByTestId("btn-comment-post-1"));

    expect(screen.getByTestId("comment-sheet")).toBeTruthy();
  });

  it("should open the PostOptionsSheet when onOpenOptions is triggered from a FeedItem", async () => {
    setMockHomeData({ feedItems: [{ id: "post-1", content: "Test Post" }] });

    await render(<HomeScreen />);

    await fireEvent.press(screen.getByTestId("btn-options-post-1"));

    expect(screen.getByTestId("options-sheet")).toBeTruthy();
  });

  it("should render the LevelUpModal when showLevelUpModal is true in the global store", async () => {
    mockStoreState.showLevelUpModal = true;
    setMockHomeData();

    await render(<HomeScreen />);

    expect(screen.getByTestId("level-up-modal")).toBeTruthy();
  });
});
