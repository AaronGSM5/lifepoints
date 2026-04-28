import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";

const FeaturedRewardCard = ({ skeletonProps, isLoading }) => {
  const redeemReward = useStore((state) => state.redeemReward);
  const featuredRewards = useStore((state) => state.featuredRewards);
  const selectedReward = featuredRewards?.[0];
  if (isLoading) {
    return (
      <View style={{ marginBottom: Spacing.md }}>
        <Skeleton {...skeletonProps} width="100%" height={240} radius={Spacing.borderRadius.lg} />
      </View>
    );
  }

  return (
    <View style={[styles.featuredWrapper, { marginBottom: Spacing.md }]}>
      <LinearGradient
        colors={["#8A2387", "#E94057", "#F27121"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featuredCard}
      >
        <View style={styles.featuredIconContainer}>
          <Icon name={selectedReward?.icon} size={20} />
        </View>

        <View style={styles.featuredContent}>
          <AppBadge label={"BEST VALUE"} variant="secondary" />

          <AppText type="h2">{selectedReward?.title}</AppText>
          <AppText type="caption" style={styles.featuredSubtitle}>
            {selectedReward?.description}
          </AppText>

          <View style={styles.featuredFooter}>
            {selectedReward?.discount ? (
              <View>
                <AppText type="caption" style={{ textDecorationLine: "line-through" }}>
                  {selectedReward?.discount?.oldPrice} LP
                </AppText>
                <AppText type="title">{selectedReward?.discount?.newPrice} LP</AppText>
              </View>
            ) : (
              <View>
                <AppText type="title">{selectedReward?.price} LP</AppText>
              </View>
            )}
            <AppButton
              variant="primary"
              title={"Redeem"}
              size="md"
              textStyle={{ color: "#E94057" }}
              bgColor="white"
              onPress={() => redeemReward(selectedReward.id)}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default FeaturedRewardCard;
