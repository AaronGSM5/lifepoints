import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useTranslation } from "react-i18next";

export default function HistoryCard({
  title,
  points,
  time,
  rightSubtitle,
  type = "earn",
  pointsSuffix = "LP",
  iconNode,
  containerStyle,
  iconContainerStyle
}) {
  const styles = getStyles();
  const { t } = useTranslation("tasks");
  const isSpend = type === "spend";

  const pointColor = isSpend ? "#666" : MyTheme.primaryAccent;
  const prefix = isSpend ? "-" : "+";

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={[styles.iconCircle, iconContainerStyle]}>{iconNode}</View>

      <View style={styles.textContainer}>
        <AppText type="body" bold numberOfLines={1}>
          {t(title)}
        </AppText>
        {time && (
          <AppText type="caption" numberOfLines={1} style={{ marginTop: 2 }}>
            {time}
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

const getStyles = () =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius?.md || 8,
      marginBottom: Spacing.sm,
      backgroundColor: MyTheme.primary
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: MyTheme.secondary,
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
