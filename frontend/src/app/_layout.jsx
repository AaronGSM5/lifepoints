import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Platform, View } from "react-native";
import { ErrorFallback } from "@/components/ErrorFallback";
import * as NavigationBar from "expo-navigation-bar";
import "@/utils/i18n";
import TrophyPopup from "@/components/ui/TrophyPopup";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useAppTheme } from "@/hooks/useAppTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

export function ErrorBoundary({ error, retry }) {
  return <ErrorFallback error={error} resetError={retry} />;
}

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
};

function TopNotchMask() {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();

  if (insets.top === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: insets.top,
        backgroundColor: MyTheme.background,
        zIndex: 9999
      }}
    />
  );
}

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

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

  usePushNotifications();

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={Platform.OS === "web" ? initialMetrics : undefined}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={"auto"} translucent backgroundColor="transparent" />

          <TopNotchMask />

          <TrophyPopup />

          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: "horizontal",
              animation: Platform.OS === "ios" ? "default" : "slide_from_right"
            }}
          >
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="post/create" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="journal" />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </View>
  );
}
