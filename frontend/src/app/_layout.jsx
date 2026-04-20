import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MyTheme } from "@/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Toolbar from "@/components/layout/Toolbar";
import { Platform, View } from "react-native";
import { ErrorFallback } from "@/components/ErrorFallback";
import * as NavigationBar from "expo-navigation-bar";

SplashScreen.preventAutoHideAsync();

export function ErrorBoundary({ error, retry }) {
  return <ErrorFallback error={error} resetError={retry} />;
}

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const hideNavigationBar = async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync("overlay-swipe");
      }
    };

    hideNavigationBar();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: MyTheme.background }}>
      <SafeAreaProvider initialMetrics={Platform.OS === "web" ? initialMetrics : undefined}>
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <Stack
          screenOptions={{
            header: (props) => <Toolbar {...props} />,
            headerShown: true,
            contentStyle: { backgroundColor: MyTheme.background }
          }}
        >
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />

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

          <Stack.Screen name="journal" />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
}
