import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "../icons/Icon";
import BaseCard from "../ui/BaseCard";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";

const RewardCard = ({ image, brand, title, points, icon, isLocked, onPress, skeletonProps, isLoading }) => {
  const styles = getStyles();
  const isDarkMode = useStore((state) => state.isDarkMode);
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
    <BaseCard style={[styles.gridCard, isLocked && { borderWidth: 0 }]} padding={0} onPress={onPress}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <AppBadge
          iconNode={<Icon name={icon} size={14} color={!isDarkMode && "rgb(0, 0, 0)"} />}
          style={{
            position: "absolute",
            bottom: Spacing.sm,
            right: Spacing.sm,
            backgroundColor: MyTheme.glas
          }}
        />
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
            <AppBadge
              label={"Locked"}
              textStyle={{ fontSize: 10, color: MyTheme.text }}
              style={{ backgroundColor: MyTheme.muted }}
            />
          ) : (
            <AppBadge
              iconNode={<Icon name="shopping" size={16} color={MyTheme.primaryAccent} />}
              style={{
                backgroundColor: MyTheme.background,
                borderColor: isDarkMode ? MyTheme.secondary : MyTheme.separator
              }}
            />
          )}
        </View>
      </View>

      {isLocked && <View style={styles.lockedOverlay} />}
    </BaseCard>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
    lockedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(18, 18, 18, 0.6)"
    }
  });

export default RewardCard;
