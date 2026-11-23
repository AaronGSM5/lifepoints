import { getContrastRatio } from "@/utils/colorHelpers";

import { DarkTheme, LightTheme } from "./Colors";

const AA_TEXT = 4.5;

describe.each([
  ["DarkTheme", DarkTheme],
  ["LightTheme", LightTheme]
])("%s Kontrast (WCAG AA)", (_name, theme) => {
  it.each(["text", "muted", "warning"])("%s erreicht 4.5:1 auf background", (token) => {
    expect(getContrastRatio(theme[token], theme.background)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("text erreicht 4.5:1 auf primary (Karten)", () => {
    expect(getContrastRatio(theme.text, theme.primary)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe("Primärbutton", () => {
  it("dunkler Text auf Akzentfläche erreicht 4.5:1", () => {
    expect(getContrastRatio(LightTheme.text, DarkTheme.primaryAccent)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
