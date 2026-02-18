import { Image, StyleSheet, View } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";
import TaskList from "@/components/TaskList";

export default function TasksScreen() {
  return (
    <ScreenWrapper scrollable={true}>
      <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.background} />

      <View style={styles.contentContainer}>

      <View style={styles.heroSection}>
        <Image source={require('../../../public/assets/sportevent.png')} style={styles.heroImage} resizeMode="cover"/>
      </View>

      <View style={styles.taskListContainer}>
        <TaskList />
      </View>

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
  heroSection: {
    width: "100%",
    minHeight: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  taskListContainer: {
    paddingBottom: Spacing.xl
  }
});
