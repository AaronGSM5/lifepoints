import { Tabs } from "expo-router";
import Navbar from "@/components/Navbar.jsx";
import Toolbar from "@/components/Toolbar.jsx";
import { MyTheme } from "@/constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <Navbar {...props} />}
      screenOptions={{
        header: () => <Toolbar />,
        contentStyle: { backgroundColor: MyTheme.background }
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
    </Tabs>
  );
}
