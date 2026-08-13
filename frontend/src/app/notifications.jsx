import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, StyleSheet, View } from "react-native";

import { useNotifications } from "@/api/notifications/useNotifications";
import { ErrorFallback } from "@/components/ErrorFallback";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import NotificationListItem from "@/components/notifications/NotificationListItem";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import AppText from "@/components/ui/AppText";
import EmptyView from "@/components/ui/EmptyView";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { groupDataByDate } from "@/utils/helpers";

export default function NotificationsScreen() {
  const { t } = useTranslation("common");
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const { data: rawNotifications, isLoading, isError, error } = useNotifications();

  const sections = useMemo(() => {
    if (!rawNotifications || rawNotifications.length === 0) return [];
    const sorted = [...rawNotifications].sort((a, b) => new Date(b.date) - new Date(a.date));

    const prozessed = sorted.map((item) => ({
      ...item,
      formattedTime: new Date(item.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    }));
    return groupDataByDate(prozessed, "date", t);
  }, [rawNotifications, t]);

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

  return (
    <ScreenWrapper scrollable={false}>
      <ScreenTitle title={t("Announcements")} />
      {isLoading ? (
        <AppLoadingSpinner centered />
      ) : isError ? (
        <ErrorFallback error={error} />
      ) : sections.length === 0 ? (
        <EmptyView
          icon="bell"
          title={t("All caught up!")}
          description={t("You have no new notifications right now. Check back later!")}
        />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => <NotificationListItem item={item} />}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    listContainer: {
      paddingBottom: Spacing.xl
    },
    sectionHeader: {
      paddingBottom: Spacing.sm,
      backgroundColor: "transparent"
    }
  });
