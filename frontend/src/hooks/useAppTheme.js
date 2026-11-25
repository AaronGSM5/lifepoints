import { DarkTheme, LightTheme } from "@/constants/Colors";
import { getDesignPreset } from "@/constants/DesignPresets";
import { buildThemeTokens } from "@/constants/DesignTokens";
import useStore from "@/store/useStore";
import { ensureContrast } from "@/utils/colorHelpers";

const colorThemes = {
  default_green: { primaryAccent: "rgb(47, 196, 146)" },
  blue_dark: { primaryAccent: "#3B82F6" },
  purple_dark: { primaryAccent: "#A855F7" },
  orange_light: { primaryAccent: "#F97316" },
  pink_dark: { primaryAccent: "rgb(255, 0, 255)" }
};

// Fertige Themes werden gecacht: gleiche Referenz bei gleichem Zustand, damit `useMemo(getStyles)` greift.
const themeCache = new Map();

const resolveTheme = (isDarkMode, activeColorThemeId, designPresetId) => {
  const preset = getDesignPreset(designPresetId);
  const key = preset ? `preset:${preset.id}` : `${isDarkMode}|${activeColorThemeId}`;

  if (themeCache.has(key)) return themeCache.get(key);

  let theme;
  if (preset) {
    theme = buildThemeTokens(preset.theme, preset.isDark);
  } else {
    const baseTheme = isDarkMode ? DarkTheme : LightTheme;
    const accentTheme = colorThemes[activeColorThemeId] || colorThemes["default_green"];
    theme = buildThemeTokens({ ...baseTheme, ...accentTheme }, isDarkMode);
  }

  // Für Text, Links und Icons in Akzentfarbe verwenden; primaryAccent bleibt für Flächen (WCAG 1.4.3).
  theme.primaryAccentText = ensureContrast(theme.primaryAccent, theme.background, 4.5);
  theme.designPresetId = preset?.id ?? null;

  themeCache.set(key, theme);
  return theme;
};

export const useAppTheme = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const activeColorThemeId = useStore((state) => state.activeColorThemeId) || "orange_light";
  const designPresetId = useStore((state) => state.designPresetId);

  return resolveTheme(isDarkMode, activeColorThemeId, designPresetId);
};
