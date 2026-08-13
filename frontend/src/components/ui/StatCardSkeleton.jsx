import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "./AppSkeleton";
import BaseCard from "./BaseCard";

const StatCardSkeleton = ({ style }) => {
  return (
    <BaseCard style={style}>
      <View style={styles.statTop}>
        <AppSkeleton width={50} height={20} />
        <AppSkeleton width={16} height={16} radius={4} />
      </View>
      <View style={styles.spacer} />
      <AppSkeleton width={80} height={10} />
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  spacer: {
    height: Spacing.sm
  }
});

export default StatCardSkeleton;
