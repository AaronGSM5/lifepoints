import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function HistoryCard({
  title,
  points,
  time,
  subtitle,
  rightSubtitle,
  type = "earn",
  pointsSuffix = "LP",
  iconNode,
  containerStyle,
  iconContainerStyle
}) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("tasks");
  const isSpend = type === "spend";

  const pointColor = isSpend ? "#666" : MyTheme.primaryAccent;
  const prefix = isSpend ? "-" : "+";

  const displaySubtitle = time || subtitle;

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={[styles.iconCircle, iconContainerStyle]}>{iconNode}</View>

      <View style={styles.textContainer}>
        <AppText type="body" bold numberOfLines={1}>
          {t(title)}
        </AppText>
        {displaySubtitle && (
          <AppText type="caption" numberOfLines={1} style={{ marginTop: 2 }}>
            {displaySubtitle}
          </AppText>
        )}
      </View>

      <View style={styles.pointsContainer}>
        <AppText type="body" bold style={{ color: pointColor }}>
          {prefix}
          {points} {pointsSuffix}
        </AppText>
        {rightSubtitle && (
          <AppText type="caption" style={{ fontSize: 12, marginTop: Spacing.xs }}>
            {rightSubtitle}
          </AppText>
        )}
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius?.md || 8,
      marginBottom: Spacing.sm,
      backgroundColor: theme.primary
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center"
    },
    textContainer: {
      flex: 1,
      marginLeft: Spacing.md - 4,
      marginRight: Spacing.sm
    },
    pointsContainer: {
      alignItems: "flex-end"
    }
  });
