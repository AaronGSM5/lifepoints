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