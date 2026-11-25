import { createStore } from "zustand/vanilla";

import { createUISlice } from "./createUISlice";

jest.mock("@/constants/SettingsConfig", () => ({
  settingsSections: [{ title: "General", data: ["item1"] }]
}));

describe("createUISlice", () => {
  let store;
  let mockAddLp;

  beforeEach(() => {
    mockAddLp = jest.fn();

    store = createStore((set, get) => ({
      ...createUISlice(set, get),
      tutorialSteps: [
        { id: "step_1", completed: false, reward: 50 },
        { id: "step_2", completed: true, reward: 20 }
      ],
      addLp: mockAddLp
    }));
  });

  it("should initialize with default UI data", () => {
    const state = store.getState()

    expect(state.isAppReady).toBeFalsy()
    expect(state.hasCompletedOnboarding).toBeFalsy()
    expect(state.isAuthenticated).toBeFalsy()
    expect(state.isDarkMode).toBeTruthy()
    expect(state.activeColorThemeId).toBe("default_green")
  });

  it("should toggle dark mode via toggleDarkMode", () => {
    expect(store.getState().isDarkMode).toBeTruthy()

    store.getState().toggleDarkMode()

    expect(store.getState().isDarkMode).toBeFalsy()
  });

  it("should set the active color theme via setColorTheme", () => {
    store.getState().setColorTheme("testTheme")

    expect(store.getState().activeColorThemeId).toBe("testTheme")
  });

  it("should update app readiness via setAppReady", () => {
    expect(store.getState().isAppReady).toBeFalsy()

    store.getState().setAppReady(true)

    expect(store.getState().isAppReady).toBeTruthy()
  });

  it("should update onboarding status via setHasCompletedOnboarding", () => {
    expect(store.getState().hasCompletedOnboarding).toBeFalsy()

    store.getState().setHasCompletedOnboarding(true)

    expect(store.getState().hasCompletedOnboarding).toBeTruthy()
  });

  it("should set isAuthenticated to true on login", () => {
    store.getState().login()

    expect(store.getState().isAuthenticated).toBeTruthy()
  });

  it("should set isAuthenticated to false on logout", () => {
    store.getState().logout()

    expect(store.getState().isAuthenticated).toBeFalsy()
  });

  it("should complete a tutorial step and trigger addLp if not already completed", () => {
    store.getState().completeTutorialStep("step_1")

    expect(mockAddLp).toHaveBeenCalledWith(50)

    expect(store.getState().tutorialSteps[0].completed).toBeTruthy()
  });

  it("should not trigger addLp or mutate state if the tutorial step is already completed or invalid", () => {
    store.getState().completeTutorialStep("step_2")

    store.getState().completeTutorialStep("not_existent")

    expect(mockAddLp).not.toHaveBeenCalled()
  });

  describe("design playground", () => {
    it("starts with the regular theme (no section selected)", () => {
      const { backgroundId, shapeId, accentId } = store.getState();
      expect([backgroundId, shapeId, accentId]).toEqual([null, null, null]);
    });

    it("fills the other sections with 'current' on the first selection", () => {
      store.getState().setDesignSection("shapeId", "soft-pill");
      const { backgroundId, shapeId, accentId } = store.getState();
      expect([backgroundId, shapeId, accentId]).toEqual(["current", "soft-pill", "current"]);
    });

    it("changes sections independently", () => {
      store.getState().setDesignSection("backgroundId", "obsidian");
      store.getState().setDesignSection("accentId", "warm-coral");
      store.getState().setDesignSection("backgroundId", "warm-charcoal");
      const { backgroundId, shapeId, accentId } = store.getState();
      expect([backgroundId, shapeId, accentId]).toEqual(["warm-charcoal", "current", "warm-coral"]);
    });

    it("ignores unknown section keys", () => {
      store.getState().setDesignSection("isAuthenticated", true);
      expect(store.getState().isAuthenticated).toBe(false);
      expect(store.getState().backgroundId).toBeNull();
    });

    it("resets to the current combo and can be turned off", () => {
      store.getState().setDesignSection("accentId", "whoop-teal");
      store.getState().resetDesignSelection();
      const reset = store.getState();
      expect([reset.backgroundId, reset.shapeId, reset.accentId]).toEqual(["current", "current", "current"]);

      store.getState().disableDesignPlayground();
      const off = store.getState();
      expect([off.backgroundId, off.shapeId, off.accentId]).toEqual([null, null, null]);
    });
  });
});
