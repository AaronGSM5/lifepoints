import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { formatTimeOrDate } from "@/utils/dateHelpers";

import JournalPreviewSkeleton from "./JournalPreviewSkeleton";
import { Icon } from "../icons/Icon";
import EmptyView from "../ui/EmptyView";
import HistoryCard from "../ui/HistoryCard";
import SectionHeader from "../ui/SectionHeader";

const JournalPreview = ({ activities, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");

  const previewData = activities?.slice(0, 3) || [];

  const isEmpty = !isLoading && !previewData.length;

  const renderData = isLoading && !previewData.length ? [1, 2, 3] : previewData;

  if (isLoading) return <JournalPreviewSkeleton renderData={renderData} styles={styles} />;

  return (
    <View style={styles.section}>
      <SectionHeader
        title={t("My Impact Journal")}
        icon={"journal"}
        rightLabel={t("More")}
        rightLabelColor={MyTheme.primaryAccent}
        onRightPress={() => router.push("/journal")}
        isLoading={isLoading}
      />
      {isEmpty ? (
        <EmptyView
          icon="journal"
          iconSize={24}
          iconColor={MyTheme.primaryAccent}
          title={t("Your journal is still empty")}
          description={t("Every good deed you log shows up here.")}
          actionTitle={t("Find a task")}
          onAction={() => router.push("/tasks")}
          containerStyle={styles.empty}
        />
      ) : (
        <View style={styles.container}>
          {previewData?.map((item, i) => (
            <HistoryCard
              key={item.id || i}
              title={item.title}
              time={formatTimeOrDate(item.time)}
              points={item.points}
              type={item.type}
              pointsSuffix="LP"
              iconNode={<Icon name="star" size={20} color={MyTheme.primaryAccent} />}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginTop: Spacing.lg
    },
    container: {
      gap: Spacing.sm
    },
    empty: {
      minHeight: 0,
      paddingVertical: Spacing.md
    },
    activityItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.sm
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center"
    },
    textContainer: {
      flex: 1,
      marginLeft: Spacing.sm
    }
  });

export default JournalPreview;
