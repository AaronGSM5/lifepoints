import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
      <Stack.Screen name="security" options={{ title: "Security & Login" }} />
      <Stack.Screen name="linked-services" options={{ title: "Linked Services" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="subscription" options={{ title: "Subscription" }} />

      <Stack.Screen name="language" options={{ title: "Language & Region" }} />

      <Stack.Screen name="support" options={{ title: "Help & Support" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy Policy" }} />
      <Stack.Screen name="terms" options={{ title: "Terms of Service" }} />
    </Stack>
  );
}
