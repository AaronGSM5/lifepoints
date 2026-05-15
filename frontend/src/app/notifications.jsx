import { StyleSheet, FlatList } from "react-native";
import NotificationEntry from "@/components/notifications/NotificationEntry";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { notificationItems } from "@/mocks/NotificationData";
import { useTranslation } from "react-i18next";

export default function NotificationsScreen() {
  const { t } = useTranslation("common");
  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <ScreenTitle title={t("Announcements")} />

      <FlatList
        data={notificationItems}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => <NotificationEntry notification={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: Spacing.xl,
    gap: Spacing.md
  }
});
