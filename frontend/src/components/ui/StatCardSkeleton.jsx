import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "./AppSkeleton";
import BaseCard from "./BaseCard";

const StatCardSkeleton = ({ style, styles }) => {
  return (
    <BaseCard style={style}>
      <View style={styles.statTop}>
        <AppSkeleton width={50} height={20} />
        <AppSkeleton width={16} height={16} radius={4} />
      </View>
      <View style={{ marginTop: Spacing.sm }} />
      <AppSkeleton width={80} height={10} />
    </BaseCard>
  );
};

export default StatCardSkeleton;
