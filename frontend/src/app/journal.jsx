import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, StyleSheet, View } from "react-native";

import { useMyProfile } from "@/api/profile/useMyProfile";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import AppText from "@/components/ui/AppText";
import HistoryCard from "@/components/ui/HistoryCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { groupDataByDate } from "@/utils/helpers";

const JournalPage = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");
  const { data: profileData, isLoading } = useMyProfile();
  const activities = useMemo(() => profileData?.activities, [profileData?.activities]);

  const groupedActivities = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const processedActivities = [...activities]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .map((item) => ({
        ...item,
        formattedTime: new Date(item.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }));
    return groupDataByDate(processedActivities, "time", t);
  }, [activities, t]);

  const renderItem = useCallback(
    ({ item }) => (
      <HistoryCard
        title={item.title}
        rightSubtitle={item.formattedTime}
        points={item.points}
        type={item.type}
        pointsSuffix="LP"
        iconNode={<AppText>✨</AppText>}
        iconContainerStyle={styles.iconContainer}
      />
    ),
    [styles.iconContainer]
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <AppText type="body" bold style={{ color: MyTheme.muted }}>
          {title}
        </AppText>
      </View>
    ),
    [MyTheme.muted, styles.sectionHeader]
  );

  if (isLoading) {
    return (
      <ScreenWrapper style={styles.wrapper}>
        <ScreenTitle title={t("My Impact Journal")} />
        <View style={styles.centerContent}>
          <AppLoadingSpinner />
        </View>
      </ScreenWrapper>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <ScreenWrapper style={styles.wrapper}>
        <ScreenTitle title={t("My Impact Journal")} />
        <View style={styles.centerContent}>
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
    },
    iconContainer: {
      width: 46,
      height: 46,
      borderRadius: 23
    },
    centerContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: Spacing.xl
    }
  });

export default JournalPage;
