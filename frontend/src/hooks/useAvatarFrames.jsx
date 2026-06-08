import { useAppTheme } from "@/hooks/useAppTheme";

export const DEFAULT_FRAME_ID = "frame_default";

export const useAvatarFrames = () => {
  const MyTheme = useAppTheme();

  const AVATAR_FRAMES = [
    { id: "frame_default", name: "Standard", color: MyTheme.secondary, borderWidth: 2, glow: false },
    { id: "frame_starter", name: "Starter", color: "#bdc3c7", borderWidth: 2, glow: false },
    { id: "frame_neon", name: "Neon Glow", color: "#00E5FF", borderWidth: 4, glow: true },
    { id: "frame_fire", name: "Solar", color: "#FF8E00", borderWidth: 4, glow: true },
    { id: "frame_amethyst", name: "Amethyst", color: "#A855F7", borderWidth: 4, glow: true },
    { id: "frame_gold", name: "Zenit-Gold", color: MyTheme.gold, borderWidth: 4, glow: true }
  ];

  const getFrameById = (id) => AVATAR_FRAMES.find((f) => f.id === id) || null;

  return { AVATAR_FRAMES, getFrameById };
};
