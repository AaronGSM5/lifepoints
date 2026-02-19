import { View, StyleSheet } from 'react-native';
import NotificationEntry from "@/components/NotificationEntry";
import ScreenWrapper from '@/components/ScreenWrapper';
import { MyTheme } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import AppText from '@/components/AppText';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsScreen() {
  const mockNotifications = [
    { title: 'Hello' },
    { title: 'Hola' },
    { title: 'Mahlzeit' },
    { title: 'Ich grüße' },
    { title: 'Hallo Bruder ich grüße dich' },
    { title: 'Hundegebell?' },
    { title: 'Knowledge Test' },
    { title: 'NIEMALS FLUSSABWÄRTS' },
    { title: 'okEE' },
    { title: 'Sie dürfen' },
    { title: '(Werde dafür lowkey bezahlt)' }
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable={true}>
        <LinearGradient colors={[ MyTheme.background, '#121212']} style={styles.background} />
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  },
  listContainer: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xl
  }
})