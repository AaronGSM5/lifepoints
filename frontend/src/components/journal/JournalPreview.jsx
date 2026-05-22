import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";
import BaseCard from "../ui/BaseCard";
import { Skeleton } from "moti/skeleton";
import SectionHeader from "../ui/SectionHeader";
import { router } from "expo-router";
import HistoryCard from "../ui/HistoryCard";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

const JournalPreview = ({ skeletonProps, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("profile");
  const activities = useStore((state) => state.activities);

  const previewData = activities?.slice(0, 3) || [];

  const formatTimeOrDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      // Heute -> z.B. "14:30"
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    // Älter -> z.B. "22.05.2026"
    return date.toLocaleDateString();
  };

  if (!isLoading && previewData.length === 0) return null;

  const renderData = isLoading && previewData.length === 0 ? [1, 2, 3] : previewData;

  if (isLoading) {
    return (
      <View>
        <SectionHeader title={t("My Impact Journal")} icon={"journal"} rightLabel={t("More")} isLoading={isLoading} />
        <View style={styles.container}>
          {renderData.map((item, i) => (
            <BaseCard key={item.id || `skel-${i}`} style={styles.activityItem} padding={Spacing.sm}>
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
      </View>
    );
  }

  return (
    <View>
      <SectionHeader
        title={t("My Impact Journal")}
        icon={"journal"}
        rightLabel={t("More")}
        onRightPress={() => router.push("/journal")}
        isLoading={isLoading}
      />
      <View style={styles.container}>
        {previewData?.map((item, i) => (
          <HistoryCard
            key={item.id || i}
            title={item.title}
            time={formatTimeOrDate(item.time)}
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

const getStyles = (theme) =>
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
      backgroundColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center"
    },
    textContainer: {
      flex: 1,
      marginLeft: Spacing.md - 4
    }
  });

export default JournalPreview;
