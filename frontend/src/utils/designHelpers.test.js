import { getAccentOption, getBackgroundOption, getShapeOption } from "@/constants/DesignOptions";

import { buildDesignSelectionSummary } from "./designHelpers";

describe("buildDesignSelectionSummary", () => {
  it("enthält Namen, IDs und Kern-Tokens aller drei Sections", () => {
    const text = buildDesignSelectionSummary({
      background: getBackgroundOption("whoop-oled"),
      shape: getShapeOption("duolingo-tactile"),
      accent: getAccentOption("warm-coral")
    });

    expect(text).toContain("Whoop OLED Black (whoop-oled)");
    expect(text).toContain("Duolingo Tactile (duolingo-tactile)");
    expect(text).toContain("Warm Coral & Gold (warm-coral)");
    expect(text).toContain("#050709");
    expect(text).toContain("depth 4px (all)");
    expect(text).toContain("#FF5A5F");
    expect(text).toContain('Store: { backgroundId: "whoop-oled", shapeId: "duolingo-tactile", accentId: "warm-coral" }');
  });
});
