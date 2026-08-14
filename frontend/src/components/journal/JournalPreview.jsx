import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { formatTimeOrDate } from "@/utils/dateHelpers";

import JournalPreviewSkeleton from "./JournalPreviewSkeleton";
import AppText from "../ui/AppText";
import HistoryCard from "../ui/HistoryCard";
import SectionHeader from "../ui/SectionHeader";

const JournalPreview = ({ activities, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");

  const previewData = activities?.slice(0, 3) || [];

  if (!isLoading && previewData.length === 0) return null;

  const renderData = isLoading && previewData.length === 0 ? [1, 2, 3] : previewData;

  if (isLoading) return <JournalPreviewSkeleton renderData={renderData} styles={styles} />;

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
      paddingHorizontal: Spacing.md,
      gap: Spacing.sm
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
