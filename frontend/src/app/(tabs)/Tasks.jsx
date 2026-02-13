import { StyleSheet, View } from "react-native";
import TaskList from "@/components/TaskList";
import FloatingFilterButton from "@/components/FloatingFilterButton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";

export default function TasksScreen() {
  return (
    <ScreenWrapper scrollable={true}>
      <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.background} />
      <FloatingFilterButton />
      <View style={styles.heroSection}>
        <AppText type="body">Das ist jetzt die Section?</AppText>
      </View>
      <View style={styles.taskListContainer}>
        <TaskList />
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
  heroSection: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    minHeight: 200,
    borderColor: MyTheme.secondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    backgroundColor: MyTheme.primary
  },
  taskListContainer: {
    paddingBottom: Spacing.xl
  }
});
