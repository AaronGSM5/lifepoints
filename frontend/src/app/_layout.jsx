import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MyTheme } from "@/constants/Colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* "light" sorgt für weiße Symbole (Uhr, Akku) auf deinem dunklen Background */}
      <StatusBar style="light" />
      
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: MyTheme.background },
        }}
      >
        {/* main-app */}
        <Stack.Screen name="(tabs)" />
        
        <Stack.Screen 
          name="notifications" 
          options={{ 
            animation: 'slide_from_bottom', // Slide effekt for notifications
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}