import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppBadge from "../ui/AppBadge";
import BaseCard from "../ui/BaseCard";

const MyCommunityCard = ({ item, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  if (isLoading) {
    return (
      <BaseCard style={styles.communityCard}>
        <Skeleton
          colorMode={MyTheme.isDark ? "dark" : "light"}
          width={44}
          height={44}
          radius={Spacing.borderRadius.md}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Skeleton colorMode={MyTheme.isDark ? "dark" : "light"} width={100} height={16} />
          <View style={{ height: Spacing.xs }} />
          <Skeleton colorMode={MyTheme.isDark ? "dark" : "light"} width={60} height={12} />
        </View>
      </BaseCard>
    );
  }

  const showOnline = item.onlineCount > 0;

  return (
    <BaseCard style={styles.communityCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={[styles.iconBox, { backgroundColor: item.color }]}>
          <MaterialIcons name={item.icon} size={24} color="#fff" />

          {item.hasUnread && <View style={styles.notificationDot} />}
        </View>

        {item.isLive && (
          <AppBadge
            label={"⏱"}
            style={{ backgroundColor: "rgba(50, 211, 150, 0.05)", borderWidth: 0 }}
            textStyle={{ fontSize: 16 }}
          />
        )}
      </View>

      <View style={styles.bottomContent}>
        <AppText bold numberOfLines={1}>
          {item.title}
        </AppText>

        <View style={styles.statusRow}>
          {showOnline ? (
            <>
              <View style={styles.onlineIndicator} />
              <AppText type="caption">
                <AppText type="caption" bold style={{ color: "#34d399" }}>
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
};

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
    }
  });

export default MyCommunityCard;
