import { View, StyleSheet, FlatList } from "react-native";
import NotificationEntry from "@/components/notifications/NotificationEntry";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { mockNotifications } from "@/constants/MockData";

export default function NotificationsScreen() {
  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.header}>
        <AppText type="h1">Mitteilungen</AppText>
      </View>

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
  header: {
    marginBottom: Spacing.lg
  },
  listContainer: {
    paddingBottom: Spacing.xl,
    gap: Spacing.md
  }
});
