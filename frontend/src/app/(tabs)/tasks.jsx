import ScreenWrapper from "@/components/layout/ScreenWrapper";
import FYTaskItem from "@/components/tasks/FYTaskItem";
import TaskItem from "@/components/tasks/TaskItem";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { mockTasks, recommendedTasks } from "@/constants/MockData";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

const COLORS = {
  primary: "#f4257b",
  backgroundDark: "#1a0d13",
  surfaceDark: "#2d1621",
  accentNeon: "#ff2d85",
  textMain: "#f1f5f9",
  textMuted: "#94a3b8",
  white: "#ffffff"
};

const TasksScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("all");

  const uniqueCategories = [...new Set(mockTasks.map((c) => c.category))];
  const categories = ["All", ...uniqueCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    // Loading simulation
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const filteredTasks = mockTasks.filter(
    (c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase()
  );

  return (
    <ScreenWrapper scrollable>
      <AppInput icon="search" placeholder="Search tasks..." value={searchQuery} onChangeText={setSearchQuery} />

      <View style={styles.sectionHeader}>
        <AppText type="title">For You</AppText>
        <AppButton variant="ghost" title={"See more"} size="sm" textStyle={{ color: MyTheme.primaryAccent }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
        {recommendedTasks.map((task, index) => (
          <FYTaskItem key={task.id || index} {...task} />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <AppText type="title">All Tasks</AppText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: Spacing.sm }}
      >
        {categories.map((cat, index) => (
          <AppButton
            key={index}
            title={cat}
            variant={cat.toLowerCase() === activeCat ? "primary" : "secondary"}
            size="md"
            onPress={() => setActiveCat(cat.toLowerCase())}
          />
        ))}
      </ScrollView>

      <View style={styles.taskList}>
        {filteredTasks.map((task) => (
          <TaskItem title={task.title} lp={task.lp} progress={task.progress} status={task.limit} icon={task.icon} />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md
  },
  carouselContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.md
  },
  tabsContainer: {
    marginHorizontal: -Spacing.lg
  },
  taskList: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
    gap: Spacing.md
  }
});

export default TasksScreen;
