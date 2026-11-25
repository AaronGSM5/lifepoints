import { DEFAULT_DESIGN_SELECTION, isDesignSelectionActive } from "@/constants/DesignOptions";
import { settingsSections } from "@/constants/SettingsConfig";

const DESIGN_SECTION_KEYS = ["backgroundId", "shapeId", "accentId"];

export const createUISlice = (set, get) => ({
  isAppReady: false,
  hasCompletedOnboarding: false,
  isAuthenticated: false,
  isDarkMode: true,
  activeColorThemeId: "default_green",
  // Design-Playground: alle null = reguläres Theme (Hell/Dunkel + Akzent), sonst IDs aus DesignOptions
  backgroundId: null,
  shapeId: null,
  accentId: null,
  settings: settingsSections,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setColorTheme: (themeId) => set({ activeColorThemeId: themeId }),
  setDesignSection: (sectionKey, optionId) => {
    if (!DESIGN_SECTION_KEYS.includes(sectionKey)) return;
    set((state) => ({
      // Beim ersten Wechsel einer Section starten die anderen beiden auf "current"
      ...(isDesignSelectionActive(state) ? {} : DEFAULT_DESIGN_SELECTION),
      [sectionKey]: optionId
    }));
  },
  resetDesignSelection: () => set({ ...DEFAULT_DESIGN_SELECTION }),
  disableDesignPlayground: () => set({ backgroundId: null, shapeId: null, accentId: null }),
  setAppReady: (status) => set({ isAppReady: status }),
  setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  completeTutorialStep: (stepId) => set((state) => {
    const step = state.tutorialSteps.find(s => s.id === stepId);

    if (!step || step.completed) return state;

    get().addLp(step.reward);

    return {
      tutorialSteps: state.tutorialSteps.map(s =>
        s.id === stepId ? { ...s, completed: true } : s
      )
    };
  }),
});