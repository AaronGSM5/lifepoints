import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppBadge from "../ui/AppBadge";
import BaseCard from "../ui/BaseCard";

const MyCommunityCard = memo(({ item, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  if (isLoading) {
    const skeletonMode = MyTheme.isDark ? "dark" : "light";
    return (
      <BaseCard style={styles.communityCard}>
        <Skeleton colorMode={skeletonMode} width={44} height={44} radius={Spacing.borderRadius.md} />
        <View style={styles.skeletonBottomContainer}>
          <Skeleton colorMode={skeletonMode} width={100} height={16} />
          <View style={styles.skeletonSpacer} />
          <Skeleton colorMode={skeletonMode} width={60} height={12} />
        </View>
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.communityCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={[styles.iconBox, { backgroundColor: item.color }]}>
          <MaterialIcons name={item.icon} size={24} color="#fff" />
          {item.hasUnread && <View style={styles.notificationDot} />}
        </View>

        {item.isLive && <AppBadge label={"⏱"} style={styles.liveBadge} textStyle={styles.liveBadgeText} />}
      </View>

      <View style={styles.bottomContent}>
        <AppText bold numberOfLines={1}>
          {item.title}
        </AppText>

        <View style={styles.statusRow}>
          {item.onlineCount > 0 ? (
            <>
              <View style={styles.onlineIndicator} />
              <AppText type="caption">
                <AppText type="caption" bold style={styles.onlineCountText}>
                  {item.onlineCount}
                </AppText>{" "}
                online
              </AppText>
            </>
          ) : (
            <AppText type="caption">{item.members}</AppText>
          )}
        </View>
      </View>
    </BaseCard>
  );
});
MyCommunityCard.displayName = "MyCommunityCard";

const getStyles = (theme) =>
  StyleSheet.create({
    communityCard: {
      width: 160,
      height: 140,
      padding: Spacing.md,
      justifyContent: "space-between"
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    },
    notificationDot: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 12,
      height: 12,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.warning,
      borderWidth: 2,
      borderColor: theme.primary
    },
    bottomContent: {
      gap: 4
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4
    },
    onlineIndicator: {
      width: 6,
      height: 6,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent
    },
    skeletonBottomContainer: {
      flex: 1,
      justifyContent: "flex-end"
    },
    skeletonSpacer: {
      height: Spacing.xs
    },
    liveBadge: {
      backgroundColor: "rgba(50, 211, 150, 0.05)",
      borderWidth: 0
    },
    liveBadgeText: {
      fontSize: 16
    },
    onlineCountText: {
      color: "#34d399"
    }
  });

export default MyCommunityCard;
