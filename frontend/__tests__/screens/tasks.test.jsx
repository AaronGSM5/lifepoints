import { fireEvent, render } from "@testing-library/react-native";
import { usePathname } from "expo-router";

import TasksScreen from "@/app/(tabs)/tasks";

const mockDisableInstaTrackingModal = jest.fn();
const mockCompleteTask = jest.fn();
const mockResetProfile = jest.fn();

jest.mock("@/store/useStore", () => {
  const store = jest.fn((selector) => {
    const state = {
      disableInstaTrackingModal: mockDisableInstaTrackingModal,
      completeTask: mockCompleteTask,
      profile: {
        profileLp: 100
      },
      resetProfile: mockResetProfile
    };
    return selector(state);
  });
  return {
    __esModule: true,
    default: store
  };
});

jest.mock("@/hooks/useTasks", () => ({
  useTasks: () => ({ quests: [{ id: "q1", name: "Mock Quest" }] })
}));
jest.mock("@/hooks/useToolbarPadding", () => ({
  useToolbarPadding: () => 50
}));

jest.mock("@/components/tasks/NavigationRow", () => {
  const { View, Button } = require("react-native");
  return function NavigationRow({ onTabChange }) {
    return (
      <View>
        <Button testID="tab-today-button" title="Today" onPress={() => onTabChange(0)} />
        <Button testID="tab-catalog-button" title="Catalog" onPress={() => onTabChange(1)} />
        <Button testID="tab-routines-button" title="Routines" onPress={() => onTabChange(2)} />
      </View>
    );
  };
});

jest.mock("@/components/tasks/TodayTab", () => {
  const { View, Button } = require("react-native");
  return function TodayTab({ onOpenInstaTracking, onOpenQuestModal }) {
    return (
      <View testID="today-tab">
        <Button testID="trigger-insta" title="Insta" onPress={() => onOpenInstaTracking("task-123")} />
        <Button testID="trigger-quest" title="Quest" onPress={onOpenQuestModal} />
      </View>
    );
  };
});

jest.mock("@/components/tasks/CatalogTab", () => {
  const { Text } = require("react-native");
  return function CatalogTab() {
    return <Text testID="catalog-tab">Catalog</Text>;
  };
});
jest.mock("@/components/tasks/RoutinesTab", () => {
  const { Text } = require("react-native");
  return function RoutinesTab() {
    return <Text testID="routines-tab">Routines</Text>;
  };
});

jest.mock("@/components/home/InstaTrackingModal", () => {
  const { View, Button } = require("react-native");
  return function InstaTrackingModal({ visible, onConfirm }) {
    if (!visible) return null;
    return (
      <View testID="insta-modal">
        <Button testID="confirm-insta-normal" title="Confirm" onPress={() => onConfirm(false)} />
        <Button testID="confirm-insta-dont-show" title="Confirm Dont Show" onPress={() => onConfirm(true)} />
      </View>
    );
  };
});
jest.mock("@/components/tasks/QuestModal", () => {
  const { Text } = require("react-native");
  return function QuestModal({ visible }) {
    return visible ? <Text testID="quest-modal">Quest Modal</Text> : null;
  };
});

const setup = async () => {
  const utils = await render(<TasksScreen />);
  return {
    ...utils,
    todayTab: utils.getByTestId("today-tab"),
    catalogTab: utils.queryByTestId("catalog-tab"),
    routinesTab: utils.queryByTestId("routines-tab"),
    tabTodayButton: utils.getByTestId("tab-today-button"),
    tabCatalogButton: utils.getByTestId("tab-catalog-button"),
    tabRoutinesButton: utils.getByTestId("tab-routines-button"),
    instaTrackingModal: utils.queryByTestId("insta-modal"),
    questModal: utils.queryByTestId("quest-modal")
  };
};

describe("TasksScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue("/tasks");
  });

  it("should render the initial Today tab with modals hidden", async () => {
    const { todayTab, catalogTab, routinesTab, instaTrackingModal, questModal } = await setup();

    expect(todayTab).toBeTruthy();
    expect(catalogTab).toBeNull();
    expect(routinesTab).toBeNull();
    expect(instaTrackingModal).toBeNull();
    expect(questModal).toBeNull();
  });

  it("should render the Catalog tab when catalog button is pressed", async () => {
    const { tabCatalogButton, getByTestId, queryByTestId } = await setup();

    await fireEvent.press(tabCatalogButton);

    expect(queryByTestId("today-tab")).toBeNull();
    expect(getByTestId("catalog-tab")).toBeTruthy();
    expect(queryByTestId("routines-tab")).toBeNull();
  });

  it("should render the Routines tab when routines button is pressed", async () => {
    const { tabRoutinesButton, getByTestId, queryByTestId } = await setup();

    await fireEvent.press(tabRoutinesButton);

    expect(queryByTestId("today-tab")).toBeNull();
    expect(queryByTestId("catalog-tab")).toBeNull();
    expect(getByTestId("routines-tab")).toBeTruthy();
  });

  it("should open the QuestModal when triggered from the Today tab", async () => {
    const { getByTestId } = await setup();

    await fireEvent.press(getByTestId("trigger-quest"));

    expect(getByTestId("quest-modal")).toBeTruthy();
  });
});
