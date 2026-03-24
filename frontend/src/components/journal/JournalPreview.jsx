import React from "react";
import { View, StyleSheet } from "react-native";
import { MyTheme } from "@/constants/Colors";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";
import BaseCard from "../ui/BaseCard";
import { Skeleton } from "moti/skeleton";
import SectionHeader from "../ui/SectionHeader";
import { router } from "expo-router";

const JournalPreview = ({ activities, skeletonProps, isLoading }) => {
  const previewData = activities.slice(0, 3);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3].map((item) => (
          <BaseCard key={item} style={styles.activityItem} padding={Spacing.sm}>
            <View style={[styles.iconCircle, { backgroundColor: "transparent" }]}>
              <Skeleton {...skeletonProps} width={40} height={40} radius="round" />
            </View>

            <View style={styles.textContainer}>
              <View style={{ marginBottom: Spacing.xs }}>
                <Skeleton {...skeletonProps} width="60%" height={16} radius={4} />
              </View>
              <Skeleton {...skeletonProps} width="35%" height={12} radius={4} />
            </View>

            <Skeleton {...skeletonProps} width={40} height={16} radius={4} />
          </BaseCard>
        ))}
      </View>
    );
  }

  return (
    <View>
      <SectionHeader
        title={"My Impact Journal"}
        icon={"journal"}
        rightLabel={"More"}
        onRightPress={() => router.push("/journal")}
        isLoading={isLoading}
      />
      <View style={styles.container}>
        {previewData.map((item) => {
          const isSpend = item.type === "spend";
          const lpColor = isSpend ? MyTheme.warning : MyTheme.primaryAccent;
          const prefix = isSpend ? "-" : "+";
          return (
            <BaseCard key={item.id} style={styles.activityItem}>
              <View style={styles.iconCircle}>
                <AppText>✨</AppText>
              </View>

              <View style={styles.textContainer}>
                <AppText type="body" bold>
                  {item.title}
                </AppText>
                <AppText type="caption" style={{ fontSize: 12, marginTop: Spacing.xs }}>
                  {item.time}
                </AppText>
              </View>

              <AppText type="body" bold style={{ color: lpColor }}>
                {prefix}
                {item.points} LP
              </AppText>
            </BaseCard>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: MyTheme.secondary,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.md - 4
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs
  }
});

export default JournalPreview;
