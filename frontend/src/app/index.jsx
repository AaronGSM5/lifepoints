import AppText from "@/components/AppText";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AppText type="body">🎉 Expo Router works 🎉</AppText>
      <AppText type="body">Go to /home</AppText>
    </View>
  );
}
