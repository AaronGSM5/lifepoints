import React from "react";
import { StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export const SkeletonFeatureItem = ({ skBase }) => (
  <View style={styles.featureItem}>
    <Skeleton {...skBase} width={20} height={20} radius={10} />
    <View style={{ marginLeft: Spacing.sm, flex: 1, justifyContent: "center" }}>
      <Skeleton {...skBase} width="80%" height={14} radius={4} />
    </View>
  </View>
);

export default function SubscriptionSkeletons({ billingCycle }) {
  const MyTheme = useAppTheme();

  const skBase = {
    colorMode: MyTheme.isDark ? "dark" : "light",
    transition: { type: "timing", duration: 1500 }
  };

  return (
    <>
      {/* Standard Card Skeleton */}
      <View style={[styles.card, { backgroundColor: MyTheme.primary, borderColor: MyTheme.secondary }]}>
        <View style={styles.cardHeader}>
          <Skeleton {...skBase} width={160} height={24} radius={4} />
          <View style={{ marginTop: 4 }}>
            <Skeleton {...skBase} width={80} height={18} radius={4} />
          </View>
        </View>
        <View style={styles.featureList}>
          {[1, 2, 3].map((i) => (
            <SkeletonFeatureItem key={i} skBase={skBase} />
          ))}
        </View>
        <View style={{ marginTop: Spacing.md }}>
          <Skeleton {...skBase} width="100%" height={48} radius={Spacing.borderRadius.full} />
        </View>
      </View>

      {/* Plus Card Skeleton */}
      <View style={[styles.card, { backgroundColor: MyTheme.primary, borderColor: MyTheme.secondary }]}>
        <View style={styles.badgeWrapper}>
          <Skeleton {...skBase} width={130} height={24} />
        </View>
        <View style={styles.cardHeader}>
          <Skeleton {...skBase} width={140} height={24} radius={4} />
          <View style={{ marginTop: 8 }}>
            <Skeleton {...skBase} width={90} height={32} radius={4} />
          </View>
          {billingCycle === "yearly" && (
            <View style={{ marginTop: 4 }}>
              <Skeleton {...skBase} width={180} height={14} radius={4} />
            </View>
          )}
        </View>
        <View style={styles.featureList}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonFeatureItem key={i} skBase={skBase} />
          ))}
        </View>
        <View style={{ marginTop: Spacing.md }}>
          <Skeleton {...skBase} width="100%" height={48} radius={Spacing.borderRadius.full} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    position: "relative"
  },
  cardHeader: { marginBottom: Spacing.md },
  featureList: { gap: Spacing.sm, marginBottom: Spacing.md },
  featureItem: { flexDirection: "row", alignItems: "flex-start" },
  badgeWrapper: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    zIndex: 10,
    borderRadius: 99,
    overflow: "hidden"
  }
});
