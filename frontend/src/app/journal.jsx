import React, { useMemo } from "react";
import { View, StyleSheet, SectionList } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ScreenTitle from "@/components/ui/ScreenTitle";
import HistoryCard from "@/components/ui/HistoryCard";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

const JournalPage = () => {
  const styles = getStyles();
  const { t } = useTranslation("profile");
  const activities = useStore((state) => state.activities);
  const groupedActivities = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const groups = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    activities.forEach((activity) => {
      const activityDate = new Date(activity.time);
      const activityDay = new Date(activityDate);
      activityDay.setHours(0, 0, 0, 0);

      let sectionTitle = activityDate.toLocaleDateString();

      if (activityDay.getTime() === today.getTime()) {
        sectionTitle = t("Today", "Heute");
      } else if (activityDay.getTime() === yesterday.getTime()) {
        sectionTitle = t("Yesterday", "Gestern");
      }

      if (!groups[sectionTitle]) {
        groups[sectionTitle] = [];
      }
      groups[sectionTitle].push(activity);
    });

    return Object.keys(groups).map((title) => ({
      title,
      data: groups[title]
    }));
  }, [activities, t]);

  const renderItem = ({ item }) => (
    <HistoryCard
      key={item.id}
      title={item.title}
      rightSubtitle={new Date(item.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })}
      points={item.points}
      type={item.type}
      pointsSuffix="LP"
      iconNode={<AppText>✨</AppText>}
      iconContainerStyle={{ width: 46, height: 46, borderRadius: 23 }}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <AppText type="body" bold style={{ color: MyTheme.muted }}>
        {title}
      </AppText>
    </View>
  );

  return (
    <ScreenWrapper style={styles.wrapper} withPaddingBottom={false} withPaddingTop={false}>
      <ScreenTitle title={t("My Impact Journal")} />
      <SectionList
        sections={groupedActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1
    },
    sectionHeader: {
      paddingBottom: Spacing.sm,
      backgroundColor: "transparent",
      marginTop: Spacing.md
    }
  });

export default JournalPage;
