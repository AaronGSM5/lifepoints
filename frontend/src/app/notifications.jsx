import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, StyleSheet, View } from "react-native";

import { useNotifications } from "@/api/notifications/useNotifications";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import NotificationEntry from "@/components/notifications/NotificationEntry";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import AppText from "@/components/ui/AppText";
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
    if (!rawNotifications) return [];
    const sorted = [...rawNotifications].sort((a, b) => new Date(b.date) - new Date(a.date));
    return groupDataByDate(sorted, "date", t);
  }, [rawNotifications, t]);

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <AppText type="body" bold style={{ color: MyTheme.muted }}>
        {title}
      </AppText>
    </View>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <ScreenTitle title={t("Announcements")} />
      {isLoading ? (
        <AppLoadingSpinner centered />
      ) : isError ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <AppText>Fehler beim Laden: {error.message}</AppText>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <NotificationEntry
              notification={{
                ...item,
                message: item.description,
                timestamp: new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              }}
            />
          )}
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
