import { StyleSheet, FlatList } from "react-native";
import NotificationEntry from "@/components/notifications/NotificationEntry";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { notificationItems } from "@/mocks/NotificationData";

export default function NotificationsScreen() {
  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <ScreenTitle title={"Mitteilungen"} />

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
