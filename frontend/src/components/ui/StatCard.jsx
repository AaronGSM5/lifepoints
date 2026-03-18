import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";

const StatCard = ({ label, value, icon, color, badge, blurred, isLoading }) => {
  if (isLoading) {
    return (
      <BaseCard style={styles.statCard}>
        <View style={styles.statTop}>
          <Skeleton colorMode="dark" width={50} height={20} transition={{ type: "timing", duration: 1500 }} />
          <Skeleton colorMode="dark" width={16} height={16} radius={4} />
        </View>
        <View style={{ height: Spacing.sm }} />
        <Skeleton colorMode="dark" width={80} height={10} />
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.statCard}>
      <View style={styles.statTop}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
          <View style={styles.numberContainer}>
            <AppText type="h2">{value}</AppText>
            {blurred && <BlurView intensity={22} tint="dark" style={StyleSheet.absoluteFill} />}
          </View>

          {blurred && (
            <View style={styles.getMoreBadge}>
              <AppText type="caption" style={styles.getMoreText}>
                GET +
              </AppText>
            </View>
          )}
        </View>

        <Icon name={icon} size={16} color={color} />
      </View>

      <AppText type="caption" style={{ marginTop: Spacing.xs }}>
        {label}
      </AppText>

      {badge && (
        <View style={styles.statBadge}>
          <AppText bold type="caption" style={{ fontSize: 10, color: MyTheme.text }}>
            {badge}
          </AppText>
        </View>
      )}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  statCard: {
    width: "47%"
  },
  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  numberContainer: {
    overflow: "hidden",
    borderRadius: 4
  },
  statBadge: {
    backgroundColor: MyTheme.primaryAccent,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: "flex-start"
  },
  getMoreBadge: {
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: Spacing.borderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    marginLeft: Spacing.sm
  },
  getMoreText: {
    color: "gold",
    fontSize: 12
  }
});

export default StatCard;
