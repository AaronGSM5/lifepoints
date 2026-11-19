import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppBadge from "./AppBadge";
import StatCardSkeleton from "./StatCardSkeleton";

const StatCard = memo(({ label, value, icon, color, blurred, isLoading, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const handleGetPlus = useCallback(() => router.push("/setting/subscription"), []);

  if (isLoading) return <StatCardSkeleton style={style} />;

  return (
    <BaseCard style={style}>
      <View style={styles.statTop}>
        <View style={styles.row}>
          <View style={styles.numberContainer}>
            <AppText type="h1" style={blurred ? styles.blurredText : null}>
              {value}
            </AppText>
          </View>

          {blurred && <AppBadge variant="premium" label={"GET +"} onPress={handleGetPlus} style={styles.badge} />}
        </View>
        <Icon name={icon} size={16} color={color} />
      </View>
      <AppText type="caption">{label}</AppText>
    </BaseCard>
  );
});
StatCard.displayName = "StatCard";

const getStyles = (theme) =>
  StyleSheet.create({
    statTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    numberContainer: {
      overflow: "hidden",
      borderRadius: 4
    },
    blurredText: {
      color: "transparent",
      textShadowColor: theme.text,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10
    },
    badge: {
      marginLeft: Spacing.sm
    }
  });

export default StatCard;
