import { RANK_COLORS } from "@/constants/Ranks";

export const getRankColor = (idx) => {
  switch (idx) {
    case 0:
      return RANK_COLORS.first;
    case 1:
      return RANK_COLORS.second;
    case 2:
      return RANK_COLORS.third;
    default:
      return RANK_COLORS.default;
  }
};