import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { MyTheme } from "@/constants/Colors";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";
import BaseCard from "../ui/BaseCard";
import { Skeleton } from "moti/skeleton";
import SectionHeader from "../ui/SectionHeader";
import { router } from "expo-router";
import HistoryCard from "../ui/HistoryCard";
import useStore from "@/store/useStore";

const JournalPreview = ({ skeletonProps, isLoading }) => {
  const styles = getStyles();
  const activities = useStore((state) => state.activities);
  const flatActivities = useMemo(() => {
    if (!activities) return [];
    return activities.flatMap((section) => section.data || []);
  }, [activities]);
  const previewData = flatActivities?.slice(0, 3);

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
        {previewData?.map((item) => (
          <HistoryCard
            key={item.id}
            title={item.title}
            time={item.time}
            points={item.points}
            type={item.type}
            pointsSuffix="LP"
            iconNode={<AppText>✨</AppText>}
          />
        ))}
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
    }
  });

export default JournalPreview;
