import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import BaseCard from "../ui/BaseCard";

const RewardCardSkeleton = ({ styles }) => {
  return (
    <BaseCard style={styles.gridCard} padding={0}>
      <AppSkeleton height={100} radius={0} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <AppSkeleton width="40%" height={12} />
          <View style={styles.titleText}>
            <AppSkeleton width="90%" height={16} />
          </View>
        </View>

        <View style={[styles.cardFooter, { gap: Spacing.xs }]}>
          <AppSkeleton width="30%" height={14} />
          <AppSkeleton width={28} height={28} radius={14} />
        </View>
      </View>
    </BaseCard>
  );
};

export default RewardCardSkeleton;
