import { View } from "react-native";
import AppText from "@/components/AppText";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AppText type="body">Login</AppText>
    </View>
  );
}
