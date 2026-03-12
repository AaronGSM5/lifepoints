import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { router } from "expo-router";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AppText type="h1">Hello there</AppText>
      <AppText type="body">Welcome to LifePoints</AppText>
      <AppButton title={'go to homepage'} onPress={() => router.replace('/home')} style={{ marginTop: 20 }} />
    </View>
  );
}
