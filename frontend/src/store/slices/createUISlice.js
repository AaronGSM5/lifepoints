import { settingsSections } from "@/constants/SettingsConfig";

export const createUISlice = (set) => ({
  isDarkMode: true,
  hasCompletedOnboarding: false,
  settings: settingsSections,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),

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