import { create } from 'zustand';
import { applyTheme } from '@/constants/Colors';

const logger = (config) => (set, get, api) => config(
  (args) => {
    console.group('Zustand State Update 🚀');
    console.log('🔄 VORHER:', get());
    set(args);
    console.log('✅ NACHHER:', get());
    console.groupEnd();
  },
  get,
  api
);

const useStore = create(logger((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  isDarkMode: true,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    applyTheme(newMode);
    return { isDarkMode: newMode };
  })
})
));

export default useStore;
