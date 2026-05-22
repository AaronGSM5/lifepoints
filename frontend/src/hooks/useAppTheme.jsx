import { LightTheme, DarkTheme } from "@/constants/Colors";
import useStore from "@/store/useStore";

const colorThemes = {
  default_green: { primaryAccent: "rgb(47, 196, 146)" },
  blue_dark: { primaryAccent: "#3B82F6" },
  purple_dark: { primaryAccent: "#A855F7" },
  orange_light: { primaryAccent: "#F97316" },
  pink_dark: { primaryAccent: "rgb(255, 0, 255)" }
};

export const useAppTheme = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const activeColorThemeId = useStore((state) => state.activeColorThemeId) || "default_green";

  const baseTheme = isDarkMode ? DarkTheme : LightTheme;

  const accentTheme = colorThemes[activeColorThemeId] || colorThemes["default_green"];

  return {
    ...baseTheme,
    ...accentTheme
  };
};
