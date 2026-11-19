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

const RewardCard = memo(
  ({ id, image, brand, title, points, icon, isLocked, requiredLevel, userLp, onPress, isLoading }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("shop");

    if (isLoading) return <RewardCardSkeleton styles={styles} />;

    const missingLp = typeof userLp === "number" ? Math.max(points - userLp, 0) : 0;

    return (
      <BaseCard style={styles.gridCard} padding={0} onPress={onPress} accessibilityLabel={`${brand} ${title}`}>
        <View style={styles.cardImageContainer}>
          <Animated.Image source={{ uri: image }} style={styles.cardImage} sharedTransitionTag={`reward-image-${id}`} />
          {isLocked && <View style={styles.lockedOverlay} />}
          <AppBadge iconNode={<Icon name={icon} size={14} />} style={styles.categoryBadge} />
          {isLocked && (
            <AppBadge
              variant="premium"
              iconNode={<Icon name="lock" size={12} color={MyTheme.gold} />}
              label={t("From level {{level}}", { level: requiredLevel })}
              style={styles.lockedBadge}
            />
          )}
        </View>

        <View style={styles.cardContent}>
          <AppText type="labelSm" style={styles.cardBrand}>
            {brand}
          </AppText>
          <AppText bold type="body" numberOfLines={2} style={styles.titleText}>
            {title}
          </AppText>

          <View style={styles.cardFooter}>
            <LpPoints points={points} size="small" />
          </View>
          {!isLocked && missingLp > 0 && (
            <AppText type="caption" numberOfLines={1}>
              {t("{{missing}} LP missing", { missing: missingLp })}
            </AppText>
          )}
        </View>
      </BaseCard>
    );
  }
);

RewardCard.displayName = "RewardCard";

const getStyles = (theme) =>
  StyleSheet.create({
    gridCard: {
      flex: 1
    },
    skeletonContent: {
      padding: Spacing.sm,
      gap: Spacing.xs
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
      padding: Spacing.sm,
      gap: 2
    },
    cardBrand: {
      color: theme.primaryAccent
    },
    titleText: {
      minHeight: 44
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Spacing.xs
    },
    categoryBadge: {
      position: "absolute",
      bottom: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: theme.glas
    },
    lockedBadge: {
      position: "absolute",
      top: Spacing.sm,
      left: Spacing.sm,
      backgroundColor: theme.background
    },
    lockedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.backdrop
    }
  });

export default RewardCard;
