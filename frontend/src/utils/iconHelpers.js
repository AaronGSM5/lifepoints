export const getName = (baseName, outline) => {
  const exceptions = ["spotify", "google", "apple", "facebook", "x"];
  if (exceptions.includes(baseName)) return `${baseName}-fill`;

  return outline ? `${baseName}-line` : `${baseName}-fill`;
};