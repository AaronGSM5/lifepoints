import { getContrastRatio } from "@/utils/colorHelpers";

import { DarkTheme } from "./Colors";
import {
  AccentOptions,
  BackgroundOptions,
  getAccentOption,
  getBackgroundOption,
  getShapeOption,
  isDesignSelectionActive,
  ShapeOptions
} from "./DesignOptions";
import { composeDesignTheme } from "./DesignTokens";

const AA_TEXT = 4.5;

// Bewusste Ausnahme: Linear-Indigo #6366F1 ist eine Nutzer-Vorgabe; weißer Text erreicht 4.47:1
// (≈ AA, erfüllt AA für großen/fetten Text). Alle anderen Akzente müssen 4.5:1 schaffen.
const ON_ACCENT_EXCEPTIONS = { "linear-indigo": 4.4 };

const REQUIRED_TOKENS = [
  "background",
  "primary",
  "secondary",
  "text",
  "muted",
  "subtle",
  "warning",
  "primaryAccent",
  "secondaryAccent",
  "gold",
  "completion",
  "completionText",
  "onAccent",
  "cardBackground",
  "cardBorderColor",
  "cardBorderWidth",
  "cardBorderBottomWidth",
  "cardShadow",
  "buttonRadius",
  "buttonDepth",
  "buttonDepthScope",
  "buttonDepthColor",
  "xpGradient",
  "xpTrack",
  "navbarBackground"
];

describe("DesignOptions", () => {
  it("hat je Section 6 Optionen mit eindeutigen IDs und 'current' als erste Baseline", () => {
    [BackgroundOptions, ShapeOptions, AccentOptions].forEach((options) => {
      expect(options).toHaveLength(6);
      expect(new Set(options.map((o) => o.id)).size).toBe(6);
      expect(options[0].id).toBe("current");
    });
  });

  it("fällt bei unbekannter ID auf 'current' zurück", () => {
    expect(getBackgroundOption("nope").id).toBe("current");
    expect(getShapeOption(null).id).toBe("current");
    expect(getAccentOption(undefined).id).toBe("current");
  });

  it("erkennt, ob der Playground aktiv ist", () => {
    expect(isDesignSelectionActive({ backgroundId: null, shapeId: null, accentId: null })).toBe(false);
    expect(isDesignSelectionActive({ backgroundId: "obsidian", shapeId: null, accentId: null })).toBe(true);
  });

  describe.each(BackgroundOptions.map((o) => [o.name, o]))("Background %s", (_name, option) => {
    it.each(["text", "muted", "warning"])("%s erreicht 4.5:1 auf background", (token) => {
      expect(getContrastRatio(option.tokens[token], option.tokens.background)).toBeGreaterThanOrEqual(AA_TEXT);
    });

    it("text erreicht 4.5:1 auf Cards (solid und raised)", () => {
      expect(getContrastRatio(option.tokens.text, option.tokens.primary)).toBeGreaterThanOrEqual(AA_TEXT);
      expect(getContrastRatio(option.tokens.text, option.tokens.raised)).toBeGreaterThanOrEqual(AA_TEXT);
    });

    it("definiert alle Surface- und Border-Stufen", () => {
      ["primary", "raised", "secondary", "border", "borderStrong", "subtle"].forEach((token) =>
        expect(option.tokens[token]).toBeDefined()
      );
    });
  });

  describe.each(AccentOptions.map((o) => [o.name, o]))("Akzent %s", (_name, option) => {
    it("onAccent ist auf primaryAccent lesbar (CTA-Buttons)", () => {
      const minRatio = ON_ACCENT_EXCEPTIONS[option.id] ?? AA_TEXT;
      expect(getContrastRatio(option.tokens.onAccent, option.tokens.primaryAccent)).toBeGreaterThanOrEqual(minRatio);
    });

    it("hat einen zweistufigen XP-Verlauf und eine Tiefen-Farbe", () => {
      expect(option.tokens.xpGradient).toHaveLength(2);
      expect(option.tokens.buttonDepthColor).toBeDefined();
    });
  });

  describe("composeDesignTheme", () => {
    it.each(
      BackgroundOptions.flatMap((bg) => ShapeOptions.flatMap((sh) => AccentOptions.map((ac) => [bg.id, sh.id, ac.id])))
    )("%s + %s + %s liefert ein vollständiges Theme", (bgId, shId, acId) => {
      const theme = composeDesignTheme(getBackgroundOption(bgId), getShapeOption(shId), getAccentOption(acId));
      REQUIRED_TOKENS.forEach((token) => expect(theme[token]).toBeDefined());
      expect(theme.isDark).toBe(true);
      expect(theme.radius).toEqual(expect.objectContaining({ sm: expect.any(Number), lg: expect.any(Number) }));
    });

    it("Current + Current + Current entspricht dem bisherigen Design", () => {
      const theme = composeDesignTheme(getBackgroundOption("current"), getShapeOption("current"), getAccentOption("current"));
      expect(theme.background).toBe(DarkTheme.background);
      expect(theme.primaryAccent).toBe("rgb(47, 196, 146)");
      expect(theme.gold).toBe("#FFD500");
      expect(theme.radius.lg).toBe(20);
      expect(theme.cardBackground).toBe("rgba(26, 34, 53, 0.6)");
      expect(theme.buttonGradient).toBe(true);
      expect(theme.buttonDepth).toBe(0);
    });

    it("Duolingo Tactile setzt 3D-Unterkanten für alle Buttons und Cards", () => {
      const theme = composeDesignTheme(
        getBackgroundOption("slate-graphite"),
        getShapeOption("duolingo-tactile"),
        getAccentOption("duolingo-lime")
      );
      expect(theme.radius.lg).toBe(18);
      expect(theme.cardBorderWidth).toBe(2);
      expect(theme.cardBorderBottomWidth).toBe(4);
      expect(theme.cardBorderColor).toBe("#3A4855");
      expect(theme.buttonDepth).toBe(4);
      expect(theme.buttonDepthScope).toBe("all");
      expect(theme.buttonDepthColor).toBe("#46A302");
    });

    it("Hybrid Tactile beschränkt die 3D-Unterkante auf Primary-Buttons", () => {
      const theme = composeDesignTheme(getBackgroundOption("current"), getShapeOption("hybrid-tactile"), getAccentOption("current"));
      expect(theme.buttonDepthScope).toBe("primary");
      expect(theme.radius.lg).toBe(16);
    });

    it("Modern Soft Pill nutzt Helligkeitsstufen statt Borders", () => {
      const theme = composeDesignTheme(getBackgroundOption("spotify-neutral"), getShapeOption("soft-pill"), getAccentOption("current"));
      expect(theme.cardBackground).toBe("#282828");
      expect(theme.cardBorderColor).toBe("transparent");
      expect(theme.cardBorderWidth).toBe(0);
    });
  });
});
