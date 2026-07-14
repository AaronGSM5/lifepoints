import { settingsSections } from "@/constants/SettingsConfig";

export const createUISlice = (set, get) => ({
  isAppReady: false,
  hasCompletedOnboarding: false,
  isAuthenticated: false,
  isDarkMode: true,
  activeColorThemeId: "default_green",
  settings: settingsSections,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setColorTheme: (themeId) => set({ activeColorThemeId: themeId }),
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