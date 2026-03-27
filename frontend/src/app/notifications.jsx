import { StyleSheet, FlatList } from "react-native";
import NotificationEntry from "@/components/notifications/NotificationEntry";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import { mockNotifications } from "@/constants/MockData";
import ScreenTitle from "@/components/ui/ScreenTitle";

export default function NotificationsScreen() {
  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <ScreenTitle title={"Mitteilungen"} />

      <FlatList
        data={mockNotifications}
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
