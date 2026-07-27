import { memo, useEffect } from "react";
import { Platform, UIManager, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { account } from "@/api/client/appwrite";
import { ErrorFallback } from "@/components/ErrorFallback";
import TrophyPopup from "@/components/ui/TrophyPopup";
import { useAppTheme } from "@/hooks/useAppTheme";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import useStore from "@/store/useStore";

import "@/utils/i18n";

SplashScreen.preventAutoHideAsync();

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function ErrorBoundary({ error, retry }) {
  return <ErrorFallback error={error} resetError={retry} />;
}

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
};

const TopNotchMask = memo(() => {
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
});
TopNotchMask.displayName = "TopNotchMask";

const queryClient = new QueryClient();

if (typeof window !== "undefined") {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

export default function RootLayout() {
  const isAppReady = useStore((state) => state.isAppReady);
  const hasCompletedOnboarding = useStore((state) => state.hasCompletedOnboarding);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const segments = useSegments();
  const router = useRouter();

  const [loaded, error] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      useStore.getState().setAppReady(true);
    }
  }, [loaded, error]);

  useEffect(() => {
    const hideNavigationBar = async () => {
      if (Platform.OS === "android") {
        try {
          await NavigationBar.setVisibilityAsync("hidden");
          await NavigationBar.setBehaviorAsync("overlay-swipe");
        } catch (e) {
          console.warn("Konnte Android NavBar nicht verstecken", e);
        }
      }
    };

    hideNavigationBar();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        useStore.getState().login();
      } catch {
        useStore.getState().logout();
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    console.log("🚪 Türsteher Status:", {
      isAppReady,
      hasCompletedOnboarding,
      isAuthenticated,
      segment: segments[0]
    });
    if (!isAppReady || (!loaded && !error)) return;

    const segment = segments[0];

    const isDevRoute = segment === "dev";
    if (isDevRoute) {
      console.log("🛠 Dev-Mode aktiv: Route wird ignoriert.");
      return;
    }

    const inAuthGroup = segment === "auth";
    const inOnboardingGroup = segment === "(onboarding)";

    if (!hasCompletedOnboarding && !inOnboardingGroup) {
      console.log("➡️ Türsteher: Leite um zu /(onboarding)");
      router.replace("/(onboarding)");
    } else if (hasCompletedOnboarding && !isAuthenticated && !inAuthGroup) {
      console.log("➡️ Türsteher: Leite um zu /auth");
      router.replace("/auth");
    } else if (hasCompletedOnboarding && isAuthenticated && (inAuthGroup || inOnboardingGroup)) {
      router.replace("/(tabs)/home");
    }
  }, [isAppReady, error, hasCompletedOnboarding, isAuthenticated, loaded, router, segments]);

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
