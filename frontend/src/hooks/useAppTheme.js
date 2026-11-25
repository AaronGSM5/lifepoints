import { DarkTheme, LightTheme } from "@/constants/Colors";
import {
  getAccentOption,
  getBackgroundOption,
  getShapeOption,
  isDesignSelectionActive
} from "@/constants/DesignOptions";
import { buildThemeTokens, composeDesignTheme } from "@/constants/DesignTokens";
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

const resolveTheme = (isDarkMode, activeColorThemeId, selection) => {
  const isPlayground = isDesignSelectionActive(selection);
  const key = isPlayground
    ? `design:${selection.backgroundId}|${selection.shapeId}|${selection.accentId}`
    : `${isDarkMode}|${activeColorThemeId}`;

  if (themeCache.has(key)) return themeCache.get(key);

  let theme;
  if (isPlayground) {
    // Design-Playground: Background + Shape + Accent frei kombiniert (fehlende Section = Current)
    theme = composeDesignTheme(
      getBackgroundOption(selection.backgroundId),
      getShapeOption(selection.shapeId),
      getAccentOption(selection.accentId)
    );
  } else {
    const baseTheme = isDarkMode ? DarkTheme : LightTheme;
    const accentTheme = colorThemes[activeColorThemeId] || colorThemes["default_green"];
    theme = buildThemeTokens({ ...baseTheme, ...accentTheme }, isDarkMode);
  }

  // Für Text, Links und Icons in Akzentfarbe verwenden; primaryAccent bleibt für Flächen (WCAG 1.4.3).
  theme.primaryAccentText = ensureContrast(theme.primaryAccent, theme.background, 4.5);
  theme.isDesignPlayground = isPlayground;

  themeCache.set(key, theme);
  return theme;
};

export const useAppTheme = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const activeColorThemeId = useStore((state) => state.activeColorThemeId) || "orange_light";
  const backgroundId = useStore((state) => state.backgroundId);
  const shapeId = useStore((state) => state.shapeId);
  const accentId = useStore((state) => state.accentId);

  return resolveTheme(isDarkMode, activeColorThemeId, { backgroundId, shapeId, accentId });
};
