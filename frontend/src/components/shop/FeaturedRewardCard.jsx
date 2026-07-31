import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { DarkTheme } from "@/constants/Colors";
import { featuredRewards } from "@/constants/FeaturedRewards";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

import AppBadge from "../ui/AppBadge";
import AppSkeleton from "../ui/AppSkeleton";
import LpPoints from "../ui/LpPoints";

const FeaturedRewardCard = memo(({ isLoading }) => {
  const { t } = useTranslation("shop");
  const redeemReward = useStore((state) => state.redeemReward);
  const selectedReward = featuredRewards?.[0];
  const styles = useMemo(() => getStyles(), []);

  if (isLoading) {
    return (
      <View style={{ marginBottom: Spacing.md }}>
        <AppSkeleton height={240} radius={Spacing.borderRadius.lg} />
      </View>
    );
  }

  if (!selectedReward) return null;

  const isDiscounted = !!selectedReward.discount;
  const currentPrice = isDiscounted ? selectedReward.discount.newPrice : selectedReward.price;
  const oldPrice = isDiscounted ? selectedReward.discount.oldPrice : null;

  return (
    <View style={[styles.featuredWrapper, { marginBottom: Spacing.md }]}>
      <LinearGradient
        colors={["#8A2387", "#E94057", "#F27121"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.featuredCard, { padding: 0 }]}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.75)"]}
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          style={styles.featuredCard}
        >
          <View style={styles.featuredIconContainer}>
            <Icon name={selectedReward.icon} size={20} />
          </View>

          <View style={styles.featuredContent}>
            <AppBadge label={t("BEST VALUE")} variant="secondary" />

            <AppText type="h2" style={{ color: DarkTheme.text }}>
              {t(selectedReward.title)}
            </AppText>
            <AppText type="caption" style={styles.featuredSubtitle}>
              {t(selectedReward.description)}
            </AppText>

            <View style={styles.featuredFooter}>
              <View>
                {isDiscounted && (
                  <AppText type="caption" style={[styles.oldPrice, { color: DarkTheme.muted }]}>
                    {oldPrice}
                  </AppText>
                )}
                <LpPoints points={currentPrice} />
              </View>
              <AppButton
                title={t("Redeem")}
                textStyle={{ color: "#E94057" }}
                bgColor="white"
                onPress={() => redeemReward(selectedReward.id)}
              />
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
});
FeaturedRewardCard.displayName = "FeaturedRewardCard";

const getStyles = () =>
  StyleSheet.create({
    featuredWrapper: {
      borderRadius: Spacing.borderRadius.lg,
      boxShadow: `0px 4px 25px rgba(233, 64, 87, 0.7)`,
      elevation: 10
    },
    featuredCard: {
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      minHeight: 240,
      justifyContent: "space-between",
      overflow: "hidden"
    },
    featuredIconContainer: {
      width: 36,
      height: 36,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: Spacing.borderRadius.sm,
      justifyContent: "center",
      alignItems: "center"
    },
    featuredContent: {
      marginTop: Spacing.md,
      gap: Spacing.xs
    },
    featuredSubtitle: {
      color: "rgba(255,255,255,0.7)",
      marginBottom: Spacing.md
    },
    featuredFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end"
    },
    oldPrice: {
      textDecorationLine: "line-through"
    }
  });

export default FeaturedRewardCard;
