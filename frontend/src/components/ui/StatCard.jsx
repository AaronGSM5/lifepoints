import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import AppBadge from "./AppBadge";
import { router } from "expo-router";
import useStore from "@/store/useStore";

const StatCard = ({ label, value, icon, color, badge, blurred, isLoading }) => {
  const styles = getStyles();
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
            <AppText type="h2" style={blurred ? styles.blurredText : null}>
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
    },
    blurredText: {
      color: "transparent",
      textShadowColor: MyTheme.text,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10
    }
  });

export default StatCard;
