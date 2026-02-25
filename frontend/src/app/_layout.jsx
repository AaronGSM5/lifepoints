import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MyTheme } from "@/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Toolbar from "@/components/layout/Toolbar";
import { View } from "react-native";

// Verhindert, dass der Splash-Screen verschwindet, bevor die Schrift geladen ist
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Schriften laden
  const [loaded, error] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold
  });

  useEffect(() => {
    if (loaded || error) {
      // Sobald geladen, Splash-Screen ausblenden
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Wichtig: Solange die Fonts laden, geben wir null zurück (App bleibt beim Splash-Screen)
  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: MyTheme.background }}>
      <SafeAreaProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <Stack
          screenOptions={{
            header: () => <Toolbar />,
            headerShown: true,
            contentStyle: { backgroundColor: MyTheme.background }
          }}
        >
          <Stack.Screen name="(tabs)" />

          <Stack.Screen name="auth" options={{ headerShown: false }} />

          <Stack.Screen
            name="notifications"
            options={{
              animation: "slide_from_bottom"
            }}
          />

          <Stack.Screen
            name="settings"
            options={{
              animation: "slide_from_bottom"
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
}
