import { useCallback } from "react";

import { Tabs } from "expo-router";

import Navbar from "@/components/layout/Navbar.jsx";
import { FEATURES } from "@/constants/FeatureFlags";

export default function TabsLayout() {
  const renderTabBar = useCallback((props) => <Navbar {...props} />, []);

  return (
    <Tabs
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
      <Tabs.Screen name="social" options={{ title: "Social" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop", href: FEATURES.shop ? undefined : null }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
