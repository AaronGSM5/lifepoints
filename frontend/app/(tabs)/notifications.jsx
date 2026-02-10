import { ScrollView } from 'react-native';
import NotificationEnty from "../../src/components/NotificationEntry";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets()
  const mockNotifications = [
    { title: 'Mock Note 1' },
    { title: 'Mock Note 2' },
    { title: 'Mock Note 3' },
    { title: 'Mock Note 4' },
    { title: 'Mock Note 5' },
    { title: 'Mock Note 6' },
    { title: 'Mock Note 7' },
    { title: 'Mock Note 8' },
    { title: 'Mock Note 9' },
    { title: 'Mock Note 10' },
    { title: 'Mock Note 11' },
    { title: 'Mock Note 12' },
    { title: 'Mock Note 13' },
    { title: 'Mock Note 14' },
    { title: 'Mock Note 15' },
    { title: 'Mock Note 16' },
    { title: 'Mock Note 17' }
  ];

  return (
      <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: Math.max(16, insets.left + insets.right), paddingBottom: 16 }}>
        {mockNotifications.map((note, index) => (
          <NotificationEnty key={index} notification={note} />
        ))}
      </ScrollView>
  );
}
