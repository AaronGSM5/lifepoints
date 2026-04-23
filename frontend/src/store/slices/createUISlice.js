export const createUISlice = (set) => ({
  isDarkMode: true,
  hasCompletedOnboarding: false,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
});