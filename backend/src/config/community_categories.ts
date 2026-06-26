export const COMMUNITY_CATEGORIES = [
  { id: "lifestyle", label: "Lifestyle", icon: "rocket" },
  { id: "gym", label: "Gym & Fitness", icon: "weight" },
  { id: "early", label: "Early Risers", icon: "sunrise" },
  { id: "knowledge", label: "Knowledge", icon: "book" },
  { id: "health", label: "Health", icon: "health" },
  { id: "computers", label: "Tech & Dev", icon: "computer" },
  { id: "mindfulness", label: "Mindfulness", icon: "heart_hand" },
  { id: "productivity", label: "Productivity", icon: "trending_up" },
  { id: "creativity", label: "Creativity", icon: "palette" },
  { id: "mindset", label: "Mindset", icon: "brain" }
] as const;

export type CategoryID = (typeof COMMUNITY_CATEGORIES)[number]["id"];
