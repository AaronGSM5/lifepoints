import { View } from "react-native";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../src/components/Navbar.jsx";
import Toolbar from "../../src/components/Toolbar.jsx";

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Toolbar />

        {/* Hier rendert Expo Router den aktuellen Screen */}
        <View style={{ flex: 1 }}>
          <Slot />
        </View>

        <Navbar />
      </View>
    </SafeAreaView>
  );
}
