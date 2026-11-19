import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppSkeleton from "../ui/AppSkeleton";
import Separator from "../ui/Separator";

const FeedItemSkeleton = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppSkeleton radius="round" width={40} height={40} />
          <AppSkeleton width={120} height={12} />
        </View>
        <AppSkeleton height={350} radius={0} />
        <View style={styles.footer}>
          <View style={styles.actions}>
            <AppSkeleton width={24} height={24} radius="round" />
            <AppSkeleton width={24} height={24} radius="round" />
            <AppSkeleton width={24} height={24} radius="round" />
          </View>
          <AppSkeleton width="80%" height={12} />
        </View>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.md
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm
  },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.sm
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.lg
  }
});

export default FeedItemSkeleton;
