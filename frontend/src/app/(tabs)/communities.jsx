import { StyleSheet, View } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";

export default function TasksScreen() {
  return (
    <ScreenWrapper scrollable={true}>
      <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.background} />

      <View style={styles.contentContainer}>

        <AppText type="h1">Communities</AppText>

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  contentContainer: {
    // flexDirection: 'column',
  },
});
