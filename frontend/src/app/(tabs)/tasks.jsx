import { Image, StyleSheet, View } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import TaskList from "@/components/TaskList";

export default function TasksScreen() {
  return (
    <ScreenWrapper scrollable>
      <AppText type="h1">Tasks</AppText>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

});
