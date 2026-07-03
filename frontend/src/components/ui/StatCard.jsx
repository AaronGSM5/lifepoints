import React from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import AppBadge from "./AppBadge";

const StatCard = ({ label, value, icon, color, blurred, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const isDarkMode = useStore((state) => state.isDarkMode);
  if (isLoading) {
    return (
      <BaseCard style={styles.statCard}>
        <View style={styles.statTop}>
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width={50}
            height={20}
            transition={{ type: "timing", duration: 1500 }}
          />
          <Skeleton colorMode={isDarkMode ? "dark" : "light"} width={16} height={16} radius={4} />
        </View>
        <View style={{ height: Spacing.sm }} />
        <Skeleton colorMode={isDarkMode ? "dark" : "light"} width={80} height={10} />
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.statCard}>
      <View style={styles.statTop}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
          <View style={styles.numberContainer}>
            <AppText type="h1" style={blurred ? styles.blurredText : null}>
              {value}
            </AppText>
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
      <View></View>
      <AppText type="caption">{label}</AppText>
    </BaseCard>
  );
};

const getStyles = (theme) =>
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
    },
    blurredText: {
      color: "transparent",
      textShadow: `0px 0px 10px ${theme.text}`
    }
  });

export default StatCard;
