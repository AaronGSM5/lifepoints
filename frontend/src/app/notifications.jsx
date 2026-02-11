import { ScrollView } from 'react-native';
import NotificationEntry from "@/components/NotificationEntry";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toolbar from '@/components/Toolbar';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets()
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
    { title: '(Werde dafür lowkey bezahlt)' },
    { title: 'Mock Note 12' },
    { title: 'Mock Note 13' },
    { title: 'Mock Note 14' },
    { title: 'Mock Note 15' },
    { title: 'Mock Note 16' },
    { title: 'Mock Note 17' }
  ];

  return (
    <>
      <Toolbar />
      <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: Math.max(16, insets.left + insets.right), paddingBottom: 16 }}>
        {mockNotifications.map((note, index) => (
          <NotificationEntry key={index} notification={note} />
        ))}
      </ScrollView>
    </>
  );
}
