export const addOpacity = (color, opacity) => {
  if (!color) return "transparent";

  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }

  if (color.startsWith("#")) {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${alpha}`;
  }

  return color;
};