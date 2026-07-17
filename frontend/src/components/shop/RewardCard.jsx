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

const RewardCard = memo(({ id, image, brand, title, points, icon, isLocked, onPress, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("shop");

  if (isLoading) return <RewardCardSkeleton styles={styles} />;

  return (
    <BaseCard style={[styles.gridCard, isLocked && { borderWidth: 0 }]} padding={0} onPress={onPress}>
      <View style={styles.cardImageContainer}>
        <Animated.Image source={{ uri: image }} style={styles.cardImage} sharedTransitionTag={`reward-image-${id}`} />
        <AppBadge iconNode={<Icon name={icon} size={14} color={MyTheme.text} />} style={styles.badge} />
      </View>

      <View style={styles.cardContent}>
        <AppText bold type="caption" style={styles.cardBrand}>
          {brand}
        </AppText>
        <AppText bold type="body" numberOfLines={2} style={styles.titleText}>
          {title}
        </AppText>

        <View style={styles.cardFooter}>
          <AppText bold type="body" style={[styles.pointsText, isLocked && { color: MyTheme.muted }]}>
            {points} LP
          </AppText>

          {isLocked ? (
            <AppBadge label={t("Locked")} textStyle={styles.badgeText} style={{ backgroundColor: MyTheme.muted }} />
          ) : (
            <AppBadge
              iconNode={<Icon name="shopping" size={16} color={MyTheme.primaryAccent} />}
              style={{
                backgroundColor: MyTheme.background,
                borderColor: MyTheme.secondary
              }}
            />
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
    skeletonContent: {
      padding: Spacing.sm,
      gap: 6
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
      color: theme.primaryAccent,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5
    },
    titleText: {
      minHeight: 40
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Spacing.xs
    },
    pointsText: {
      fontSize: 14
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
    }
  });

export default RewardCard;
