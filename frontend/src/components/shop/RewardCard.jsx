import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import RewardCardSkeleton from "./RewardCardSkeleton";
import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import BaseCard from "../ui/BaseCard";
import LpPoints from "../ui/LpPoints";

const RewardCard = memo(({ id, image, brand, title, points, icon, isLocked, onPress, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("shop");

  if (isLoading) return <RewardCardSkeleton styles={styles} />;

  return (
    <BaseCard style={[styles.gridCard, isLocked && { borderColor: "transparent" }]} padding={0} onPress={onPress}>
      <View style={styles.cardImageContainer}>
        <Animated.Image source={{ uri: image }} style={styles.cardImage} sharedTransitionTag={`reward-image-${id}`} />
        <AppBadge iconNode={<Icon name={icon} size={14} />} style={styles.badge} />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <AppText bold type="caption" style={styles.cardBrand}>
            {brand}
          </AppText>
          <AppText bold type="body" numberOfLines={2} style={styles.titleText}>
            {title}
          </AppText>
        </View>

        <View style={styles.cardFooter}>
          {isLocked ? (
            <AppBadge label={t("Locked")} textStyle={styles.badgeText} style={styles.lockedBadge} />
          ) : (
            <LpPoints points={points} />
          )}
        </View>
      </View>

      {isLocked && <View style={styles.lockedOverlay} />}
    </BaseCard>
  );
});

RewardCard.displayName = "RewardCard";

const getStyles = (theme) =>
  StyleSheet.create({
    gridCard: {
      flex: 1
    },
    cardImageContainer: {
      height: 100,
      backgroundColor: theme.secondary
    },
    cardImage: {
      width: "100%",
      height: "100%"
    },
    cardContent: {
      flex: 1,
      justifyContent: "space-between",
      padding: Spacing.sm,
      gap: Spacing.xs - 2
    },
    cardHeader: {
      gap: 2
    },
    cardBrand: {
      color: theme.primaryAccent,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5
    },
    titleText: {
      minHeight: 40
    },
    cardFooter: {
      height: 36,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginLeft: Spacing.xs
    },
    badge: {
      position: "absolute",
      bottom: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: theme.glas
    },
    badgeText: {
      fontSize: 10,
      color: theme.text
    },
    lockedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    lockedBadge: {
      alignSelf: "center",
      backgroundColor: theme.glas
    }
  });

export default RewardCard;
