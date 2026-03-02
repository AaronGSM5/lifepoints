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
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";

const TasksScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = useMemo(() => {
    const unique = [...new Set(mockTasks.map((c) => c.category))];
    return ["All", ...unique.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];
  }, [mockTasks]);

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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
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
    </View>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            lp={item.lp}
            progress={item.progress}
            status={item.limit}
            icon={item.icon}
            onPress={() => router.push(`task/${item.id}`)}
          />
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: Spacing.md
  },
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
  }
});

export default TasksScreen;
