import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const RewardCardSkeleton = ({ styles }) => {
  return (
    <BaseCard style={styles.gridCard} padding={0}>
      <AppSkeleton height={100} radius={0} />
      <View style={styles.skeletonContent}>
        <AppSkeleton width="40%" height={12} />
        <AppSkeleton width="90%" height={16} />
        <View style={[styles.cardFooter, { marginTop: Spacing.xs }]}>
          <AppSkeleton width="30%" height={14} />
          <AppSkeleton width={28} height={28} radius={14} />
        </View>
      </View>
    </BaseCard>
  );
};

export default RewardCardSkeleton;
