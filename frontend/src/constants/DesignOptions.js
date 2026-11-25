import { DarkTheme } from "./Colors";

/**
 * Design-Playground: drei unabhängige Sections, die live zu einem Theme kombiniert werden
 * (siehe `composeDesignTheme` in DesignTokens.js).
 *
 *   Background & Surfaces → Hintergründe, Card-Flächen, Border-Farben, Text-Hierarchie, Danger
 *   Haptik & Form         → Radius, Border-Breiten/-Ton, Schatten, Button-Form und 3D-Tiefe
 *   Akzente               → Primary, Secondary, Gold, Completion/XP
 *
 * Jede Section hat "current" als Baseline, die exakt dem bisherigen Navy/Mint-Design entspricht.
 */

export const DEFAULT_DESIGN_SELECTION = {
  backgroundId: "current",
  shapeId: "current",
  accentId: "current"
};

// ---------------------------------------------------------------------------
// SECTION 1: Background & Surfaces
//   primary = Card-Fläche, raised = hellere Card-Stufe, secondary = erhöhte Fläche,
//   border = subtile Border-Farbe, borderStrong = Kontrast-Border
// ---------------------------------------------------------------------------
export const BackgroundOptions = [
  {
    id: "current",
    name: "Current Deep Navy",
    description: "Aktuelles Blau-Navy als Baseline",
    tokens: {
      ...DarkTheme,
      raised: "rgb(32, 42, 64)",
      border: "rgba(36, 53, 82, 0.7)",
      borderStrong: "rgb(51, 70, 104)",
      subtle: "rgba(248, 250, 252, 0.35)",
      navbarBackground: "transparent",
      navbarBorderColor: "rgba(255, 255, 255, 0.1)",
      bubbleOther: DarkTheme.primary,
      xpTrack: "#333333",
      xpTrackBorder: "#333333",
      progressTrack: "#121212",
      switchTrackOff: "#3f3f46",
      mediaPlaceholder: "#2A2A2A"
    }
  },
  {
    id: "whoop-oled",
    name: "Whoop OLED Black",
    description: "Tiefes Schwarz, dunkle Cards, maximaler Kontrast",
    tokens: {
      background: "#050709",
      backgroundBottom: "#000000",
      primary: "#111317",
      raised: "#181B20",
      secondary: "#1D2026",
      border: "#1E2228",
      borderStrong: "#2E333B",
      text: "#FFFFFF",
      muted: "#8B95A1",
      subtle: "#5B6570",
      warning: "#FF4D4D"
    }
  },
  {
    id: "spotify-neutral",
    name: "Spotify Neutral Dark",
    description: "Echtes Dunkelgrau, abgestufte Cards, kein Farbstich",
    tokens: {
      background: "#121212",
      backgroundBottom: "#000000",
      primary: "#1E1E1E",
      raised: "#282828",
      secondary: "#2A2A2A",
      border: "#2A2A2A",
      borderStrong: "#3E3E3E",
      text: "#FFFFFF",
      muted: "#B3B3B3",
      subtle: "#7A7A7A",
      warning: "#F15E6C"
    }
  },
  {
    id: "obsidian",
    name: "Obsidian Charcoal",
    description: "Sehr dunkles Anthrazit, moderner SaaS-Look",
    tokens: {
      background: "#09090B",
      backgroundBottom: "#000000",
      primary: "#141417",
      raised: "#1B1B1F",
      secondary: "#1F1F23",
      border: "#232328",
      borderStrong: "#34343B",
      text: "#FAFAFA",
      muted: "#A1A1AA",
      subtle: "#71717A",
      warning: "#F87171"
    }
  },
  {
    id: "slate-graphite",
    name: "Slate Graphite",
    description: "Kühles Dunkelgrau, neutraler als Navy",
    tokens: {
      background: "#131A20",
      backgroundBottom: "#0E1418",
      primary: "#1C252E",
      raised: "#232E38",
      secondary: "#26313C",
      border: "#2A3540",
      borderStrong: "#3A4855",
      text: "#E9EEF2",
      muted: "#93A1AD",
      subtle: "#66737E",
      warning: "#FF6B6B"
    }
  },
  {
    id: "warm-charcoal",
    name: "Warm Charcoal",
    description: "Leicht warmes Dunkelgrau, augenschonend",
    tokens: {
      background: "#161514",
      backgroundBottom: "#100F0E",
      primary: "#211F1D",
      raised: "#292624",
      secondary: "#2C2926",
      border: "#33302C",
      borderStrong: "#46413B",
      text: "#EDE6DD",
      muted: "#A39A90",
      subtle: "#766E66",
      warning: "#E5735F"
    }
  }
];

// ---------------------------------------------------------------------------
// SECTION 2: Haptik & Form
//   cardFill:        glass (halbtransparent) | solid (primary) | raised (hellere Stufe)
//   cardBorderTone:  border | strong | none
//   buttonDepthScope: none | primary (nur Primary-CTA) | all (alle Button-Varianten außer ghost)
//   navbarStyle:     glass (Blur) | solid (deckend in Surface-Farbe)
// ---------------------------------------------------------------------------
export const ShapeOptions = [
  {
    id: "current",
    name: "Current Baseline",
    description: "Aktuelle Radien, Glas-Cards, Verlaufs-Buttons",
    tokens: {
      radius: { sm: 8, md: 12, lg: 20 },
      cardFill: "glass",
      cardBorderTone: "border",
      cardBorderWidth: 1,
      cardBorderBottomWidth: 1,
      cardShadow: "-2px 0px 5px rgba(0, 0, 0, 0.2)",
      inputShadow: "-2px 0px 5px rgba(0, 0, 0, 0.25)",
      sheetShadow: "0px -6px 10px rgba(0, 0, 0, 0.6)",
      subtleShadow: "0px 4px 5px rgba(0, 0, 0, 0.15)",
      buttonRadius: 9999,
      buttonGradient: true,
      buttonDepth: 0,
      buttonDepthScope: "none",
      navbarStyle: "glass"
    }
  },
  {
    id: "duolingo-tactile",
    name: "Duolingo Tactile",
    description: "18px, 2px Borders, 3D-Unterkante an Buttons & Cards",
    tokens: {
      radius: { sm: 10, md: 14, lg: 18 },
      cardFill: "solid",
      cardBorderTone: "strong",
      cardBorderWidth: 2,
      cardBorderBottomWidth: 4,
      cardShadow: "none",
      inputShadow: "none",
      sheetShadow: "0px -2px 0px rgba(0, 0, 0, 0.4)",
      subtleShadow: "0px 3px 0px rgba(0, 0, 0, 0.35)",
      buttonRadius: 16,
      buttonGradient: false,
      buttonDepth: 4,
      buttonDepthScope: "all",
      navbarStyle: "solid"
    }
  },
  {
    id: "hybrid-tactile",
    name: "Hybrid Tactile",
    description: "16px, subtile 1px Borders, 3D nur bei Primary-CTAs",
    tokens: {
      radius: { sm: 8, md: 12, lg: 16 },
      cardFill: "solid",
      cardBorderTone: "border",
      cardBorderWidth: 1,
      cardBorderBottomWidth: 1,
      cardShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
      inputShadow: "none",
      sheetShadow: "0px -4px 16px rgba(0, 0, 0, 0.45)",
      subtleShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
      buttonRadius: 14,
      buttonGradient: false,
      buttonDepth: 4,
      buttonDepthScope: "primary",
      navbarStyle: "solid"
    }
  },
  {
    id: "linear-precision",
    name: "Linear Precision",
    description: "12px, feine Hairlines, flach und aufgeräumt",
    tokens: {
      radius: { sm: 6, md: 8, lg: 12 },
      cardFill: "solid",
      cardBorderTone: "border",
      cardBorderWidth: 1,
      cardBorderBottomWidth: 1,
      cardShadow: "0px 1px 0px rgba(0, 0, 0, 0.4)",
      inputShadow: "none",
      sheetShadow: "0px -1px 0px rgba(255, 255, 255, 0.06)",
      subtleShadow: "none",
      buttonRadius: 8,
      buttonGradient: false,
      buttonDepth: 0,
      buttonDepthScope: "none",
      navbarStyle: "solid"
    }
  },
  {
    id: "soft-pill",
    name: "Modern Soft Pill",
    description: "20px, fast ohne Borders, Tiefe über Helligkeit",
    tokens: {
      radius: { sm: 12, md: 16, lg: 20 },
      cardFill: "raised",
      cardBorderTone: "none",
      cardBorderWidth: 0,
      cardBorderBottomWidth: 0,
      cardShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
      inputShadow: "none",
      sheetShadow: "0px -8px 24px rgba(0, 0, 0, 0.5)",
      subtleShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
      buttonRadius: 9999,
      buttonGradient: false,
      buttonDepth: 0,
      buttonDepthScope: "none",
      navbarStyle: "solid"
    }
  },
  {
    id: "sharp-biometric",
    name: "Sharp Biometric",
    description: "8px, Kontrast-Borders, Fokus auf Daten",
    tokens: {
      radius: { sm: 4, md: 6, lg: 8 },
      cardFill: "solid",
      cardBorderTone: "strong",
      cardBorderWidth: 1,
      cardBorderBottomWidth: 1,
      cardShadow: "none",
      inputShadow: "none",
      sheetShadow: "0px -1px 0px rgba(255, 255, 255, 0.08)",
      subtleShadow: "none",
      buttonRadius: 6,
      buttonGradient: false,
      buttonDepth: 0,
      buttonDepthScope: "none",
      navbarStyle: "solid"
    }
  }
];

// ---------------------------------------------------------------------------
// SECTION 3: Akzente
//   onAccent = Text/Icon auf primaryAccent-Flächen (≥ 4.5:1), buttonDepthColor = dunklere Akzent-Stufe
// ---------------------------------------------------------------------------
export const AccentOptions = [
  {
    id: "current",
    name: "Current Mint & Gold",
    description: "Mint + Gold",
    tokens: {
      primaryAccent: "rgb(47, 196, 146)",
      secondaryAccent: "rgb(255, 0, 255)",
      gold: "#FFD500",
      success: "rgb(0, 240, 160)",
      completion: "rgb(0, 240, 160)",
      onAccent: "rgb(15, 23, 41)",
      onSecondaryAccent: "#FFFFFF",
      xpGradient: ["rgb(47, 196, 146)", "#335399"],
      buttonDepthColor: "rgb(30, 140, 104)"
    }
  },
  {
    id: "spotify-green",
    name: "Spotify Vivid Green",
    description: "Emerald-Grün + Gold",
    tokens: {
      primaryAccent: "#1ED760",
      secondaryAccent: "#FFD500",
      gold: "#FFD500",
      success: "#1ED760",
      completion: "#1ED760",
      onAccent: "#000000",
      onSecondaryAccent: "#000000",
      xpGradient: ["#1ED760", "#FFD500"],
      buttonDepthColor: "#159E46"
    }
  },
  {
    id: "duolingo-lime",
    name: "Duolingo Electric Lime",
    description: "Lime + Streak-Gold",
    tokens: {
      primaryAccent: "#58CC02",
      secondaryAccent: "#FFC800",
      gold: "#FFC800",
      success: "#58CC02",
      completion: "#FFC800",
      onAccent: "#0F1A06",
      onSecondaryAccent: "#1A1400",
      xpGradient: ["#FFC800", "#FF9600"],
      buttonDepthColor: "#46A302"
    }
  },
  {
    id: "whoop-teal",
    name: "Whoop Biometric Teal",
    description: "Sport-Teal + Amber",
    tokens: {
      primaryAccent: "#00D2B8",
      secondaryAccent: "#FF9F1C",
      gold: "#FF9F1C",
      success: "#00D2B8",
      completion: "#FF9F1C",
      onAccent: "#04110F",
      onSecondaryAccent: "#1A0F00",
      xpGradient: ["#00D2B8", "#FF9F1C"],
      buttonDepthColor: "#00A08C"
    }
  },
  {
    id: "linear-indigo",
    name: "Linear Indigo & Cyan",
    description: "Indigo + Cyan + Gold",
    tokens: {
      primaryAccent: "#6366F1",
      secondaryAccent: "#22D3EE",
      gold: "#FBBF24",
      success: "#4ADE80",
      completion: "#22D3EE",
      onAccent: "#FFFFFF",
      onSecondaryAccent: "#04161A",
      xpGradient: ["#6366F1", "#22D3EE"],
      buttonDepthColor: "#4338CA"
    }
  },
  {
    id: "warm-coral",
    name: "Warm Coral & Gold",
    description: "Korall-Rot + Gold",
    tokens: {
      primaryAccent: "#FF5A5F",
      secondaryAccent: "#FFD500",
      gold: "#FFD500",
      success: "#34D399",
      completion: "#FFD500",
      onAccent: "#1F0B0C",
      onSecondaryAccent: "#1A1400",
      xpGradient: ["#FF5A5F", "#FFD500"],
      buttonDepthColor: "#C9454A"
    }
  }
];

const findById = (options, id) => options.find((option) => option.id === id) ?? options[0];

export const getBackgroundOption = (id) => findById(BackgroundOptions, id);
export const getShapeOption = (id) => findById(ShapeOptions, id);
export const getAccentOption = (id) => findById(AccentOptions, id);

/** Gibt true zurück, sobald mindestens eine Section gewählt ist (sonst gilt das reguläre Hell/Dunkel-Theme). */
export const isDesignSelectionActive = ({ backgroundId, shapeId, accentId } = {}) =>
  Boolean(backgroundId || shapeId || accentId);
