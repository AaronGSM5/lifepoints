import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseCard from "../ui/BaseCard";

const OnboardingGuideSkeleton = memo(({ stepsCount = 3, skeletonProps }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <BaseCard style={{ marginTop: Spacing.xl }}>
      <View style={styles.guideHeader}>
        <Skeleton {...skeletonProps} width={140} height={28} borderRadius={6} />
        <Skeleton {...skeletonProps} width={80} height={16} borderRadius={4} />
      </View>

      <View style={{ marginBottom: Spacing.lg }}>
        <Skeleton {...skeletonProps} width="100%" height={8} borderRadius={4} />
      </View>

      <View style={styles.questList}>
        {Array.from({ length: stepsCount }).map((_, index) => (
          <View key={`skeleton-${index}`} style={styles.questItem}>
            <View style={styles.questIconContainer}>
              <Skeleton {...skeletonProps} width={28} height={28} borderRadius={14} />
            </View>

            <View style={styles.questTextContainer}>
              <View style={{ marginBottom: 6 }}>
                <Skeleton {...skeletonProps} width="60%" height={18} borderRadius={4} />
              </View>
              <Skeleton {...skeletonProps} width="30%" height={14} borderRadius={4} />
            </View>

            <Skeleton {...skeletonProps} width={16} height={16} borderRadius={4} />
          </View>
        ))}
      </View>
    </BaseCard>
  );
});

OnboardingGuideSkeleton.displayName = "OnboardingGuideSkeleton";

const getStyles = () =>
  StyleSheet.create({
    guideHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: Spacing.lg
    },
    questList: {
      gap: Spacing.sm
    },
    questItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.sm
    },
    questIconContainer: {
      width: 40,
      alignItems: "center"
    },
    questTextContainer: {
      flex: 1,
      marginLeft: Spacing.sm
    }
  });

export default OnboardingGuideSkeleton;
