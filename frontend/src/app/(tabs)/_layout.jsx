import { Tabs } from "expo-router";
import Navbar from "@/components/layout/Navbar.jsx";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCallback } from "react";

export default function TabsLayout() {
  const MyTheme = useAppTheme();

  const renderTabBar = useCallback((props) => <Navbar {...props} />, []);

  return (
    <Tabs
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: { backgroundColor: MyTheme.background }
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
