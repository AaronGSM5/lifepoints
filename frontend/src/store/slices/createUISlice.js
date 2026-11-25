import { DesignPresets } from "@/constants/DesignPresets";
import { settingsSections } from "@/constants/SettingsConfig";

export const createUISlice = (set, get) => ({
  isAppReady: false,
  hasCompletedOnboarding: false,
  isAuthenticated: false,
  isDarkMode: true,
  activeColorThemeId: "default_green",
  // Design-Playground: null = reguläres Theme (Hell/Dunkel + Akzent), sonst ID aus DesignPresets
  designPresetId: null,
  settings: settingsSections,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setColorTheme: (themeId) => set({ activeColorThemeId: themeId }),
  setDesignPreset: (presetId) => set({ designPresetId: presetId ?? null }),
  cycleDesignPreset: (direction = 1) =>
    set((state) => {
      const ids = DesignPresets.map((preset) => preset.id);
      const currentIndex = ids.indexOf(state.designPresetId);
      // Ohne aktives Preset startet "Vor" beim ersten und "Zurück" beim letzten Preset.
      const startIndex = currentIndex === -1 ? (direction > 0 ? -1 : 0) : currentIndex;
      const nextIndex = (startIndex + direction + ids.length) % ids.length;
      return { designPresetId: ids[nextIndex] };
    }),
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