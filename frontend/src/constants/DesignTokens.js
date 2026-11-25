import { addOpacity, ensureContrast } from "@/utils/colorHelpers";

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
    // none | primary (nur Primary-CTA) | all (alle Varianten außer ghost)
    buttonDepthScope: theme.buttonDepth ? "primary" : "none",
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
    completionText: ensureContrast(theme.completion ?? theme.success, theme.background, 4.5),
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

const resolveCardBorderColor = (bg, tone) => {
  if (tone === "none") return "transparent";
  if (tone === "strong") return bg.borderStrong;
  return bg.border;
};

const resolveCardBackground = (bg, fill) => {
  if (fill === "glass") return addOpacity(bg.primary, 0.6);
  if (fill === "raised") return bg.raised;
  return bg.primary;
};

/**
 * Design-Playground: kombiniert die drei unabhängigen Sections (Background, Shape, Accent)
 * zu einem vollständigen Theme-Objekt.
 */
export const composeDesignTheme = (background, shape, accent) => {
  const bg = background.tokens;
  const sh = shape.tokens;
  const ac = accent.tokens;

  const cardBorderColor = resolveCardBorderColor(bg, sh.cardBorderTone);
  const isGlassNavbar = sh.navbarStyle === "glass";

  const base = {
    // Background-Defaults (können pro Background überschrieben werden)
    separator: bg.border,
    inputBorder: bg.border,
    glas: "rgba(255, 255, 255, 0.05)",
    backdrop: "rgba(0, 0, 0, 0.5)",
    darkBg: bg.primary,
    bubbleOther: bg.secondary,
    xpTrack: bg.secondary,
    progressTrack: bg.secondary,
    switchTrackOff: bg.borderStrong,
    mediaPlaceholder: bg.secondary,
    navbarBorderColor: bg.border,
    ...bg,

    ...ac,

    // Shape
    ...sh,
    cardBackground: resolveCardBackground(bg, sh.cardFill),
    cardBorderColor,
    navbarTint: "dark",
    navbarBackground: isGlassNavbar ? (bg.navbarBackground ?? "transparent") : addOpacity(bg.primary, 0.94),
    navbarShadow: isGlassNavbar ? "0px 8px 20px rgba(0, 0, 0, 0.4)" : sh.subtleShadow,
    // Tactile-Shapes: Sheet-Kante in Border-Farbe statt Schatten
    sheetShadow: sh.cardBorderTone === "strong" ? `0px -2px 0px ${bg.borderStrong}` : sh.sheetShadow,
    bubbleMe: ac.primaryAccent,
    xpTrackBorder: sh.cardBorderTone === "none" ? "transparent" : (bg.xpTrackBorder ?? bg.border)
  };

  return buildThemeTokens(base, true);
};
