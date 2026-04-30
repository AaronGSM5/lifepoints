import { MyTheme } from "./Colors";

export const AVATAR_FRAMES = [
  { id: 'f0', name: 'Standard', color: MyTheme.secondary, borderWidth: 2, glow: false },
  { id: 'f1', name: 'Starter', color: '#bdc3c7', borderWidth: 2, glow: false },
  { id: 'f2', name: 'Neon Glow', color: '#00E5FF', borderWidth: 4, glow: true },
  { id: 'f3', name: 'Solar', color: '#FF8E00', borderWidth: 4, glow: true },
  { id: 'f4', name: 'Amethyst', color: '#A855F7', borderWidth: 4, glow: true },
  { id: 'f5', name: 'Zenit-Gold', color: MyTheme.gold, borderWidth: 4, glow: true },
];

export const DEFAULT_FRAME_ID = 'f0';

export const getFrameById = (id) => AVATAR_FRAMES.find(f => f.id === id) || null;