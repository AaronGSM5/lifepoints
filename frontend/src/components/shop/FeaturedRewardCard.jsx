import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";

const FeaturedRewardCard = ({ skeletonProps, isLoading }) => {
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
          <Icon name="music" size={20} />
        </View>

        <View style={styles.featuredContent}>
          <View style={styles.bestValueBadge}>
            <AppText bold type="caption" style={{ color: "#00FF7F" }}>
              BEST VALUE
            </AppText>
          </View>

          <AppText type="h2">Free Month Premium</AppText>
          <AppText type="caption" style={styles.featuredSubtitle}>
            Spotify Individual Plan
          </AppText>

          <View style={styles.featuredFooter}>
            <View>
              <AppText type="caption" style={{ textDecorationLine: "line-through" }}>
                2.500 PTS
              </AppText>
              <AppText type="title">2.000 PTS</AppText>
            </View>
            <AppButton variant="primary" title={"Redeem"} size="md" textStyle={{ color: "#E94057" }} bgColor="white" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  featuredWrapper: {
    borderRadius: Spacing.borderRadius.lg,
    shadowColor: "#E94057",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
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
  bestValueBadge: {
    backgroundColor: "rgba(0, 255, 127, 0.2)",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: "flex-start",
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 127, 0.8)"
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
