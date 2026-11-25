import { addOpacity } from "@/utils/colorHelpers";

/**
 * Ergänzt ein Farb-Theme um vollständige Design-Tokens (Surfaces, Borders, Radius, Schatten, Buttons, XP).
 * Fehlende Werte werden aus den Basisfarben abgeleitet, sodass das bisherige Navy/Mint-Design exakt erhalten bleibt.
 */
export const buildThemeTokens = (theme, isDark) => {
  const radius = { sm: 8, md: 12, lg: 20, full: 9999, ...theme.radius };
  const cardBorderWidth = theme.cardBorderWidth ?? 1;

  return {
    // Text-Hierarchie: text (primär) → muted (sekundär) → subtle (tertiär / Platzhalter)
    subtle: addOpacity(theme.muted, 0.7),
    onAccent: "rgb(15, 23, 41)",
    onSecondaryAccent: "#FFFFFF",

    // Surfaces
    surface: theme.primary,
    surfaceElevated: theme.secondary,
    cardBackground: addOpacity(theme.primary, 0.6),
    cardBorderColor: addOpacity(theme.secondary, 0.7),
    cardBorderWidth,
    cardBorderBottomWidth: cardBorderWidth,
    cardShadow: "-2px 0px 5px rgba(0, 0, 0, 0.2)",
    sheetShadow: "0px -6px 10px rgba(0, 0, 0, 0.6)",
    inputShadow: "-2px 0px 5px rgba(0, 0, 0, 0.25)",
    subtleShadow: "0px 4px 5px rgba(0, 0, 0, 0.15)",

    // Buttons
    buttonRadius: radius.full,
    buttonGradient: true,
    buttonDepth: 0,
    buttonDepthColor: "rgba(0, 0, 0, 0.35)",

    // Navbar
    navbarTint: isDark ? "systemChromeMaterialDark" : "light",
    navbarBackground: "transparent",
    navbarBorderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)",
    navbarShadow: isDark ? "0px 8px 20px rgba(0, 0, 0, 0.4)" : "0px 8px 15px rgba(0, 0, 0, 0.2)",

    // Chat
    bubbleMe: theme.primaryAccent,
    bubbleOther: theme.primary,

    // Completion / XP
    completion: theme.success,
    xpGradient: [theme.primaryAccent, "#335399"],
    xpTrack: isDark ? "#333333" : theme.background,
    xpTrackBorder: isDark ? "#333333" : "transparent",
    progressTrack: isDark ? "#121212" : theme.secondary,

    // Sonstiges
    danger: theme.warning,
    switchTrackOff: isDark ? "#3f3f46" : "#d4d4d8",
    mediaPlaceholder: isDark ? "#2A2A2A" : "#e5e7eb",
    darkBg: isDark ? "#000418" : theme.glas,

    // explizite Theme-Werte überschreiben die abgeleiteten Defaults
    ...theme,
    radius,
    isDark
  };
};
