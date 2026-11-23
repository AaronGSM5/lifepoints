import { DarkTheme, LightTheme } from "@/constants/Colors";
import useStore from "@/store/useStore";
import { ensureContrast } from "@/utils/colorHelpers";

const colorThemes = {
  default_green: { primaryAccent: "rgb(47, 196, 146)" },
  blue_dark: { primaryAccent: "#3B82F6" },
  purple_dark: { primaryAccent: "#A855F7" },
  orange_light: { primaryAccent: "#F97316" },
  pink_dark: { primaryAccent: "rgb(255, 0, 255)" }
};

// Akzentfarben als Text/Icon brauchen auf hellem Hintergrund oft eine dunklere Variante (WCAG 1.4.3).
const accentTextCache = new Map();
const getAccentText = (accent, background) => {
  const key = `${accent}|${background}`;
  if (!accentTextCache.has(key)) accentTextCache.set(key, ensureContrast(accent, background, 4.5));
  return accentTextCache.get(key);
};

export const useAppTheme = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const activeColorThemeId = useStore((state) => state.activeColorThemeId) || "orange_light";

  const baseTheme = isDarkMode ? DarkTheme : LightTheme;

  const accentTheme = colorThemes[activeColorThemeId] || colorThemes["default_green"];

  return {
    ...baseTheme,
    ...accentTheme,
    // Für Text, Links und Icons in Akzentfarbe verwenden; primaryAccent bleibt für Flächen.
    primaryAccentText: getAccentText(accentTheme.primaryAccent, baseTheme.background),
    isDark: isDarkMode
  };
};
