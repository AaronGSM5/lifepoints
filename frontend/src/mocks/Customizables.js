export const rarityColors = {
  common: "#ccc",
  rare: "#00E5FF",
  epic: "#9900ff",
  legendary: "#FF8E00"
};
export const mockCustomizables = {
  frames: [
    {
      id: "frame_default",
      name: "Default",
      icon: "eyeOpen",
      color: rarityColors.common,
    },
    {
      id: "frame_neon",
      name: "Neon Glow",
      icon: "star",
      color: rarityColors.rare,
    },
    {
      id: "frame_fire",
      name: "Solar Flare",
      icon: "sun",
      color: rarityColors.legendary,
    },
  ],
  titles: [
    {
      id: "coll_plant",
      name: "The Beginner",
      icon: "trash",
      color: rarityColors.common,
    },
    {
      id: "coll_crown",
      name: "Eco-Hero",
      icon: "bulb",
      color: rarityColors.epic,
    }
  ]
};