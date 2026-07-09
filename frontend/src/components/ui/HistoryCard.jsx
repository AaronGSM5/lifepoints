import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseCard from "./BaseCard";

const HistoryCard = memo(
  ({
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
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("tasks");

    const isSpend = type === "spend";
    const pointColor = isSpend ? MyTheme.muted : MyTheme.primaryAccent;
    const prefix = isSpend ? "-" : "+";

    const displaySubtitle = time || subtitle;

    return (
      <BaseCard style={[styles.card, containerStyle]}>
        <View style={[styles.iconCircle, iconContainerStyle]}>{iconNode}</View>

        <View style={styles.textContainer}>
          <AppText type="body" bold numberOfLines={1}>
            {t(title)}
          </AppText>
          {displaySubtitle && (
            <AppText type="caption" numberOfLines={1} style={styles.displaySubtitle}>
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
            <AppText type="caption" style={styles.rightSubtitle}>
              {rightSubtitle}
            </AppText>
          )}
        </View>
      </BaseCard>
    );
  }
);
HistoryCard.displayName = "HistoryCard";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center"
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
    displaySubtitle: {
      marginTop: 2
    },
    pointsContainer: {
      alignItems: "flex-end"
    },
    rightSubtitle: {
      fontSize: 12,
      marginTop: Spacing.xs
    }
  });

export default HistoryCard;
