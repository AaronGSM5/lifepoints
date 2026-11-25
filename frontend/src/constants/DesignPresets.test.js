import { getContrastRatio } from "@/utils/colorHelpers";

import { DesignPresets, getDesignPreset } from "./DesignPresets";
import { buildThemeTokens } from "./DesignTokens";

const AA_TEXT = 4.5;

const REQUIRED_TOKENS = [
  "background",
  "primary",
  "secondary",
  "text",
  "muted",
  "subtle",
  "primaryAccent",
  "secondaryAccent",
  "gold",
  "success",
  "warning",
  "onAccent",
  "cardBackground",
  "cardBorderColor",
  "cardBorderWidth",
  "cardShadow",
  "buttonRadius",
  "completion",
  "xpGradient",
  "xpTrack"
];

describe("DesignPresets", () => {
  it("enthält genau 10 Presets mit eindeutigen IDs", () => {
    expect(DesignPresets).toHaveLength(10);
    expect(new Set(DesignPresets.map((p) => p.id)).size).toBe(10);
  });

  it("liefert null für unbekannte oder leere IDs", () => {
    expect(getDesignPreset("does-not-exist")).toBeNull();
    expect(getDesignPreset(null)).toBeNull();
  });

  describe.each(DesignPresets.map((p) => [p.name, p]))("%s", (_name, preset) => {
    const theme = buildThemeTokens(preset.theme, preset.isDark);

    it("definiert alle Design-Tokens", () => {
      REQUIRED_TOKENS.forEach((token) => expect(theme[token]).toBeDefined());
      expect(theme.radius).toEqual(expect.objectContaining({ sm: expect.any(Number), lg: expect.any(Number) }));
      expect(theme.xpGradient).toHaveLength(2);
      expect(theme.isDark).toBe(preset.isDark);
    });

    it.each(["text", "muted", "warning"])("%s erreicht 4.5:1 auf background", (token) => {
      expect(getContrastRatio(theme[token], theme.background)).toBeGreaterThanOrEqual(AA_TEXT);
    });

    it("text erreicht 4.5:1 auf Card-Surface", () => {
      expect(getContrastRatio(theme.text, theme.primary)).toBeGreaterThanOrEqual(AA_TEXT);
    });

    it("onAccent erreicht 4.5:1 auf primaryAccent (CTA-Buttons)", () => {
      expect(getContrastRatio(theme.onAccent, theme.primaryAccent)).toBeGreaterThanOrEqual(AA_TEXT);
    });
  });
});
