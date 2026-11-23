export const addOpacity = (color, opacity) => {
  if (!color) return "transparent";
  if (typeof color !== "string") return color

  const processedColor = color.trim().toLowerCase()

  if (processedColor.startsWith("rgba")) {
    return processedColor.replace(/,\s*[\d.]+\s*\)/, `, ${opacity})`);
  }

  if (processedColor.startsWith("rgb")) {
    return processedColor.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }

  if (processedColor.startsWith("#")) {
    let hex = processedColor

    // short HEX to long HEX (#RGB to #RRGGBB)
    if (hex.length === 4) {
      hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    // HEX including transparency
    if (hex.length === 9) {
      hex = hex.substring(0, 7)
    }

    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${hex}${alpha}`;
  }

  return color;
};

// ---------------------------------------------------------------------------
// Kontrast (WCAG 2.x)
// ---------------------------------------------------------------------------

/** Wandelt "#rgb", "#rrggbb", "rgb()" oder "rgba()" in [r, g, b, a] um. Gibt null zurück, wenn unbekannt. */
export const parseColor = (color) => {
  if (typeof color !== "string") return null;
  const c = color.trim().toLowerCase();

  if (c.startsWith("#")) {
    let hex = c.slice(1);
    if (hex.length === 3) hex = hex.split("").map((ch) => ch + ch).join("");
    if (hex.length !== 6 && hex.length !== 8) return null;
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), a];
  }

  const match = c.match(/^rgba?\(([^)]+)\)$/);
  if (!match) return null;
  const parts = match[1].split(",").map((p) => parseFloat(p.trim()));
  if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
};

/** Mischt eine (halb)transparente Vordergrundfarbe auf einen deckenden Hintergrund. */
const flatten = (fg, bg) => {
  const [r, g, b, a] = fg;
  return [r * a + bg[0] * (1 - a), g * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a)];
};

const relativeLuminance = ([r, g, b]) => {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/** Kontrastverhältnis zweier Farben (1 bis 21). Transparente Vordergründe werden auf den Hintergrund gemischt. */
export const getContrastRatio = (foreground, background) => {
  const bg = parseColor(background);
  const fg = parseColor(foreground);
  if (!bg || !fg) return null;
  const l1 = relativeLuminance(flatten(fg, bg));
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Dunkelt (oder hellt) eine Farbe schrittweise ab, bis sie auf dem Hintergrund
 * mindestens das geforderte Kontrastverhältnis erreicht. Der Farbton bleibt erhalten.
 */
export const ensureContrast = (color, background, minRatio = 4.5) => {
  const fg = parseColor(color);
  const bg = parseColor(background);
  if (!fg || !bg) return color;
  if (getContrastRatio(color, background) >= minRatio) return color;

  const darken = relativeLuminance(bg) > 0.5;
  for (let step = 1; step <= 20; step++) {
    const f = darken ? 1 - step * 0.05 : step * 0.05;
    const mix = fg.slice(0, 3).map((v) => Math.round(darken ? v * f : v + (255 - v) * f));
    const candidate = `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
    if (getContrastRatio(candidate, background) >= minRatio) return candidate;
  }
  return darken ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
};
