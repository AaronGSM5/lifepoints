import { MyTheme } from "@/constants/Colors";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: MyTheme.text }}>🎉 Expo Router works 🎉</Text>
      <Text style={{ color: MyTheme.text }}>Go to /home</Text>
    </View>
  );
}
