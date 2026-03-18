import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import BaseCard from "@/components/ui/BaseCard";
import { Skeleton } from "moti/skeleton";

const FYTaskItem = ({ title, description, lp, badge, image, isLoading }) => {
  if (isLoading) {
    return (
      <BaseCard style={styles.card} padding={0}>
        {/* Image */}
        <Skeleton
          colorMode="dark"
          width="100%"
          height={120}
          radius={0}
          transition={{ type: "timing", duration: 1500 }}
        />

        <View style={styles.cardContent}>
          <View style={styles.cardInfoRow}>
            <View style={{ flex: 1, paddingRight: Spacing.sm }}>
              <View style={{ marginBottom: 8 }}>
                <Skeleton colorMode="dark" width="80%" height={20} transition={{ type: "timing", duration: 1500 }} />
              </View>
              <View style={{ marginBottom: 4 }}>
                <Skeleton colorMode="dark" width="100%" height={14} transition={{ type: "timing", duration: 1500 }} />
              </View>
              <Skeleton colorMode="dark" width="60%" height={14} transition={{ type: "timing", duration: 1500 }} />
            </View>
            <Skeleton colorMode="dark" width={40} height={20} transition={{ type: "timing", duration: 1500 }} />
          </View>
          {/* Button */}
          <Skeleton
            colorMode="dark"
            width="100%"
            height={44}
            radius={Spacing.borderRadius.lg}
            transition={{ type: "timing", duration: 1500 }}
          />
        </View>
      </BaseCard>
    );
  }

  const renderBadge = () => {
    if (!badge) return null;
    return (
      <View style={styles.badgeHot}>
        <AppText bold type="caption" style={{ color: MyTheme.text }}>
          {badge}
        </AppText>
      </View>
    );
  };

  return (
    <BaseCard style={styles.card} padding={0}>
      {image ? (
        <ImageBackground source={image} style={styles.cardImage} resizeMode="cover">
          {renderBadge()}
        </ImageBackground>
      ) : (
        <View style={[styles.cardImage, { backgroundColor: MyTheme.background }]}>{renderBadge()}</View>
      )}

      <View style={styles.cardContent}>
        <View style={styles.cardInfoRow}>
          <View style={{ flex: 1, paddingRight: Spacing.sm }}>
            <AppText bold type="title" numberOfLines={1}>
              {title}
            </AppText>
            <AppText type="caption" numberOfLines={1}>
              {description}
            </AppText>
          </View>

          <AppText bold style={styles.lpText}>
            {lp} LP
          </AppText>
        </View>

        <AppButton title={"Activate"} bgColor={MyTheme.primaryAccent} />
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 280
  },
  cardImage: {
    height: 120,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: Spacing.sm
  },
  badgeHot: {
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.borderRadius.md
  },
  cardContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "space-between"
  },
  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  lpText: {
    color: MyTheme.primaryAccent
  }
});

export default FYTaskItem;
