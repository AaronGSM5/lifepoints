import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import AppBadge from "./AppBadge";
import { router } from "expo-router";

const StatCard = ({ label, value, icon, color, badge, blurred, isLoading }) => {
  const styles = getStyles();
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
            <AppBadge
              variant="outline"
              label={"GET +"}
              onPress={() => router.push("/setting/subscription")}
              textStyle={{ color: MyTheme.gold }}
              style={{
                borderColor: MyTheme.gold,
                borderRadius: Spacing.borderRadius.sm,
                paddingHorizontal: Spacing.xs,
                paddingVertical: 2,
                marginLeft: Spacing.sm
              }}
            />
          )}
        </View>

        <Icon name={icon} size={16} color={color} />
      </View>

      <AppText type="caption" style={{ marginTop: Spacing.xs }}>
        {label}
      </AppText>

      {badge && (
        <AppBadge
          variant={"primary"}
          label={badge}
          textStyle={{ fontSize: 12, color: MyTheme.background }}
          style={{ marginTop: Spacing.sm }}
        />
      )}
    </BaseCard>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
    }
  });

export default StatCard;
