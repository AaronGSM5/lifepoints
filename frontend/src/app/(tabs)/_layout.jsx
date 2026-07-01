import { useCallback } from "react";

import { Tabs } from "expo-router";

import Navbar from "@/components/layout/Navbar.jsx";

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
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
