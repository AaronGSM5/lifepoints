import create from 'zustand';

const useStore = create((set) => ({
  // User State
  user: null,
  setUser: (user) => set({ user }),

  // Theme / UI
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useStore;
