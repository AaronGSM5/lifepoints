import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { formatTimeOrDate } from "@/utils/helpers";

import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";
import HistoryCard from "../ui/HistoryCard";
import SectionHeader from "../ui/SectionHeader";

const JournalPreview = ({ activities, skeletonProps, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");

  const previewData = activities?.slice(0, 3) || [];

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
        rightLabelColor={MyTheme.primaryAccent}
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
