/**
 * Baut den Text für "Aktuelle Kombi kopieren": Namen, IDs und Kern-Tokens der drei Design-Sections.
 */
export const buildDesignSelectionSummary = ({ background, shape, accent }) => {
  const bg = background.tokens;
  const sh = shape.tokens;
  const ac = accent.tokens;

  return [
    "LifePoints Design-Kombi",
    "",
    `Background & Surfaces: ${background.name} (${background.id})`,
    `  background ${bg.background} · card ${bg.primary} · elevated ${bg.secondary} · border ${bg.border} / ${bg.borderStrong}`,
    `  text ${bg.text} · muted ${bg.muted}`,
    `Haptik & Form: ${shape.name} (${shape.id})`,
    `  radius sm/md/lg ${sh.radius.sm}/${sh.radius.md}/${sh.radius.lg} · card border ${sh.cardBorderWidth}px (${sh.cardBorderTone}, bottom ${sh.cardBorderBottomWidth}px) · fill ${sh.cardFill}`,
    `  button radius ${sh.buttonRadius} · depth ${sh.buttonDepth}px (${sh.buttonDepthScope}) · shadow ${sh.cardShadow}`,
    `Akzente: ${accent.name} (${accent.id})`,
    `  primary ${ac.primaryAccent} · secondary ${ac.secondaryAccent} · gold ${ac.gold} · completion ${ac.completion} · xp ${ac.xpGradient.join(" → ")}`,
    "",
    `Store: { backgroundId: "${background.id}", shapeId: "${shape.id}", accentId: "${accent.id}" }`
  ].join("\n");
};
