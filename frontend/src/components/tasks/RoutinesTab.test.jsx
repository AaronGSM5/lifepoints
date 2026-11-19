import { act, fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";

import RoutinesTab from "@/components/tasks/RoutinesTab";
import useStore from "@/store/useStore";

jest.mock("@/store/useStore", () => {
  const { create } = require("zustand");
  const { createRoutineSlice } = require("@/store/slices/createRoutineSlice");

  return {
    __esModule: true,
    default: create((set, get) => ({
      ...createRoutineSlice(set, get),
      activities: [],
      addLp: jest.fn(),
      addExperience: jest.fn(),
      notifyQuestSystem: jest.fn()
    }))
  };
});

jest.mock("@/hooks/useToolbarPadding", () => ({
  useToolbarPadding: () => 50
}));

jest.mock("@/utils/haptics", () => ({
  triggerHaptic: jest.fn()
}));

describe("RoutinesTab", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(() => useStore.setState({ routines: [] }));
  });

  it("shows the empty state and recommended routines without own routines", async () => {
    const { getByText } = await render(<RoutinesTab />);

    expect(getByText("No routines yet")).toBeTruthy();
    expect(getByText("Recommended routines")).toBeTruthy();
    expect(getByText("Morning Glow")).toBeTruthy();
  });

  it("shows a due routine with its streak badge", async () => {
    await act(() => {
      useStore.getState().createRoutine({
        title: "My Morning",
        icon: "sun",
        frequency: { type: "daily" },
        taskIds: [1]
      });
    });

    const { getByText, getByTestId, queryByText } = await render(<RoutinesTab />);

    expect(getByText("My Morning")).toBeTruthy();
    expect(getByTestId("routine-streak")).toBeTruthy();
    expect(queryByText("No routines yet")).toBeNull();
  });

  it("filters public routines by search and adopts one", async () => {
    const { getByPlaceholderText, getByText, queryByText } = await render(<RoutinesTab />);

    await fireEvent.changeText(getByPlaceholderText("Search routines"), "strong");

    expect(getByText("Strong Week")).toBeTruthy();
    expect(queryByText("Morning Glow")).toBeNull();

    await fireEvent.press(getByText("Take over"));

    expect(useStore.getState().routines).toHaveLength(1);
    expect(useStore.getState().routines[0].source.publicRoutineId).toBe("pub_strong_week");
    expect(getByText("Added")).toBeTruthy();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("opens the public detail page and the publisher profile", async () => {
    const { getByPlaceholderText, getByText } = await render(<RoutinesTab />);

    await fireEvent.changeText(getByPlaceholderText("Search routines"), "strong");
    await fireEvent.press(getByText("Strong Week"));
    expect(router.push).toHaveBeenCalledWith("/routine/public/pub_strong_week");

    // Karte zeigt nur den Profilnamen des Publishers
    await fireEvent.press(getByText("Zest"));
    expect(router.push).toHaveBeenCalledWith("/user/Zest_Runner");
  });

  it("opens the own routine page on tap and expands tasks via the chevron", async () => {
    let routineId;
    await act(() => {
      routineId = useStore.getState().createRoutine({
        title: "My Morning",
        icon: "sun",
        frequency: { type: "daily" },
        taskIds: [1]
      });
    });

    const { getByText, getByTestId, queryByText } = await render(<RoutinesTab />);

    // erste fällige Routine ist initial aufgeklappt
    expect(getByText("Bed Boost")).toBeTruthy();
    await fireEvent.press(getByTestId(`routine-expand-${routineId}`));
    expect(queryByText("Bed Boost")).toBeNull();

    await fireEvent.press(getByText("My Morning"));
    expect(router.push).toHaveBeenCalledWith(`/routine/${routineId}`);
  });

  it("shows an empty search state", async () => {
    const { getByPlaceholderText, getByText } = await render(<RoutinesTab />);

    await fireEvent.changeText(getByPlaceholderText("Search routines"), "zzz-not-existing");

    expect(getByText("No routines found")).toBeTruthy();
  });
});
