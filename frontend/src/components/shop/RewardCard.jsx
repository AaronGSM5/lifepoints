import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "../icons/Icon";
import BaseCard from "../ui/BaseCard";

const RewardCard = ({ image, brand, title, points, icon, isLocked, onPress, skeletonProps, isLoading }) => {
  if (isLoading) {
    return (
      <BaseCard style={styles.gridCard} padding={0}>
        <Skeleton {...skeletonProps} width="100%" height={100} radius={0} />
        <View style={{ padding: Spacing.sm, gap: 6 }}>
          <Skeleton {...skeletonProps} width="40%" height={12} />
          <Skeleton {...skeletonProps} width="90%" height={16} />
          <View style={[styles.cardFooter, { marginTop: Spacing.xs }]}>
            <Skeleton {...skeletonProps} width="30%" height={14} />
            <Skeleton {...skeletonProps} width={28} height={28} radius={14} />
          </View>
        </View>
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.gridCard} padding={0} onPress={onPress}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardIconBadge}>
          <Icon name={icon} size={14} color={MyTheme.text} />
        </View>
      </View>

      <View style={styles.cardContent}>
        <AppText bold type="caption" style={styles.cardBrand}>
          {brand}
        </AppText>
        <AppText bold type="body" numberOfLines={2} style={styles.titleText}>
          {title}
        </AppText>

        <View style={styles.cardFooter}>
          <AppText bold type="body" style={[{ fontSize: 14 }, isLocked && { color: MyTheme.muted }]}>
            {points} PTS
          </AppText>

          {isLocked ? (
            <View style={styles.lockedBadge}>
              <AppText bold type="caption" style={{ fontSize: 10 }}>
                Locked
              </AppText>
            </View>
          ) : (
            <View style={styles.miniFab}>
              <Icon name="shopping" size={16} color={MyTheme.primaryAccent} />
            </View>
          )}
        </View>
      </View>

      {isLocked && <View style={styles.lockedOverlay} />}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    flex: 1
  },
  cardImageContainer: {
    height: 100,
    backgroundColor: "#333"
  },
  cardImage: {
    width: "100%",
    height: "100%"
  },
  cardIconBadge: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContent: {
    padding: Spacing.sm,
    gap: 2
  },
  cardBrand: {
    color: MyTheme.primaryAccent,
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
  miniFab: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: MyTheme.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  lockedBadge: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.6)"
  }
});

export default RewardCard;
