import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, StyleSheet, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import HistoryCard from "@/components/ui/HistoryCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useMyProfile } from "@/api/profile/useMyProfile";
import { groupDataByDate } from "@/utils/helpers";

const JournalPage = () => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("profile");
  const { data: profileData, isLoading } = useMyProfile();
  const activities = profileData?.activities;
  const groupedActivities = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const sorted = [...activities].sort((a, b) => new Date(b.time) - new Date(a.time));
    return groupDataByDate(sorted, "time", t);
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

  if (!isLoading && (!activities || activities.length === 0)) {
    return (
      <ScreenWrapper style={styles.wrapper}>
        <ScreenTitle title={t("My Impact Journal")} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: Spacing.xl }}>
          <AppText type="body" style={{ textAlign: "center", color: MyTheme.muted }}>
            {t("No activities yet. Start completing tasks to see your impact here!")}
          </AppText>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={styles.wrapper} withPaddingBottom={false}>
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
