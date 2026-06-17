import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import useStore from "@/store/useStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export const usePushNotifications = () => {
  const setNotificationSettings = useStore((state) => state.setNotificationPermissionSettings);
  const hasSeenPrompt = useStore((state) => state.profile.hasSeenNotificationPrompt);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (hasSeenPrompt) return;

      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        let token = null;
        if (finalStatus === "granted") {
          const tokenData = await Notifications.getExpoPushTokenAsync();
          token = tokenData.data;
          console.log("Nativer Push Token erfolgreich generiert:", token);
        }
        setNotificationSettings(true, token);
      } catch (error) {
        console.log("Fehler bei der nativen Notification-Abfrage:", error);
        setNotificationSettings(true, null);
      }
    };

    registerForPushNotificationsAsync();
  }, [hasSeenPrompt, setNotificationSettings]);
};
