import { act, fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import RoutineDetailScreen from "@/app/routine/[id]";
import PublicRoutineDetailScreen from "@/app/routine/public/[id]";
import useStore from "@/store/useStore";

jest.mock("expo-router", () => {
  const router = { push: jest.fn(), replace: jest.fn(), back: jest.fn(), canGoBack: jest.fn(() => true) };
  return {
    router,
    useRouter: () => router,
    useLocalSearchParams: jest.fn(),
    usePathname: jest.fn(() => "/")
  };
});

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

describe("Routine detail screens", () => {
  const router = useRouter();

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(() => useStore.setState({ routines: [] }));
  });

  describe("public routine", () => {
    it("lists all included tasks and links the publisher profile", async () => {
      useLocalSearchParams.mockReturnValue({ id: "pub_morning_glow" });
      const { getByText } = await render(<PublicRoutineDetailScreen />);

      expect(getByText("Included tasks ({{count}})")).toBeTruthy();
      expect(getByText("Bed Boost")).toBeTruthy();
      expect(getByText("Hydration Boost")).toBeTruthy();
      expect(getByText("Stretch Moment")).toBeTruthy();

      await fireEvent.press(getByText("by @{{username}}"));
      expect(router.push).toHaveBeenCalledWith("/user/Velo_Mind");
    });

    it("adopts the routine and opens the own copy", async () => {
      useLocalSearchParams.mockReturnValue({ id: "pub_morning_glow" });
      const { getByText } = await render(<PublicRoutineDetailScreen />);

      await fireEvent.press(getByText("Take over"));

      const [adopted] = useStore.getState().routines;
      expect(adopted.source.publicRoutineId).toBe("pub_morning_glow");
      expect(router.replace).toHaveBeenCalledWith(`/routine/${adopted.id}`);
    });

    it("shows a not found state for unknown ids", async () => {
      useLocalSearchParams.mockReturnValue({ id: "does_not_exist" });
      const { getByText } = await render(<PublicRoutineDetailScreen />);
      expect(getByText("Routine not found")).toBeTruthy();
    });
  });

  describe("own routine", () => {
    it("shows stats, calendar, tasks and opens edit from the header", async () => {
      let id;
      await act(() => {
        id = useStore.getState().createRoutine({
          title: "My Morning",
          icon: "sun",
          frequency: { type: "daily" },
          taskIds: [1, 5]
        });
      });
      useLocalSearchParams.mockReturnValue({ id });

      const { getByText, getByTestId } = await render(<RoutineDetailScreen />);

      expect(getByText("Current streak")).toBeTruthy();
      expect(getByText("Best streak")).toBeTruthy();
      expect(getByText("Total runs")).toBeTruthy();
      expect(getByText("Streak calendar")).toBeTruthy();
      expect(getByText("Bed Boost")).toBeTruthy();
      expect(getByText("Hydration Boost")).toBeTruthy();

      await fireEvent.press(getByTestId("routine-edit"));
      expect(router.push).toHaveBeenCalledWith(`/routine/edit/${id}`);
    });

    it("links the publisher of an adopted routine", async () => {
      let id;
      await act(() => {
        id = useStore.getState().adoptPublicRoutine({
          id: "pub_x",
          title: "Adopted",
          icon: "sun",
          authorUsername: "Nox_Echo",
          frequency: { type: "daily" },
          tasks: [{ taskId: 1, substeps: [] }]
        });
      });
      useLocalSearchParams.mockReturnValue({ id });

      const { getByText } = await render(<RoutineDetailScreen />);
      await fireEvent.press(getByText("by @{{username}}"));
      expect(router.push).toHaveBeenCalledWith("/user/Nox_Echo");
    });
  });
});
