import { View, StyleSheet } from "react-native";
import NotificationEntry from "@/components/notifications/NotificationEntry";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { mockNotifications } from "@/constants/MockData";

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable>
        <View style={styles.header}>
          <AppText type="h1">Mitteilungen</AppText>
        </View>
        <View style={styles.listContainer}>
          {mockNotifications.map((note, index) => (
            <NotificationEntry key={index} notification={note} />
          ))}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  },
  listContainer: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xl
  }
});
