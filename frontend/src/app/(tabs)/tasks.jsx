import { StyleSheet, View } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import TaskList from "@/components/TaskList";

export default function TasksScreen() {
  return (
    <ScreenWrapper scrollable={false}>
      <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.background} />
      <AppText style={{ height: '100vh' }}>This is just a Placeholder</AppText>
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
  taskListContainer: {
    paddingBottom: Spacing.xl
  }
});
