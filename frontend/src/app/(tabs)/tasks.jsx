import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import FYTaskItem from "@/components/tasks/FYTaskItem";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { mockTasks, recommendedTasks } from "@/constants/MockData";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Skeleton } from "moti/skeleton";
import CategoryButtons from "@/components/ui/CategoryButtons";

const SKELETON_TASKS = Array.from({ length: 4 }).map((_, i) => ({ id: `s-${i}`, isSkeleton: true }));
const SKELETON_FY_TASKS = Array.from({ length: 2 }).map((_, i) => ({ id: `sfy-${i}`, isSkeleton: true }));

const TasksScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const bottomPadding = useFloatingNavbarPadding();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

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
    <View>
      <Skeleton {...skeletonProps} width="100%" radius={Spacing.borderRadius.lg}>
        <AppInput icon="search" placeholder="Search tasks..." value={searchQuery} onChangeText={setSearchQuery} />
      </Skeleton>
      <View style={styles.sectionHeader}>
        <AppText type="title">For You</AppText>
        {!isLoading && (
          <AppButton variant="ghost" title={"See more"} size="sm" textStyle={{ color: MyTheme.primaryAccent }} />
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
        {isLoading
          ? SKELETON_FY_TASKS.map((item) => <FYTaskItem key={item.id} isLoading={isLoading} />)
          : recommendedTasks.map((task, index) => (
              <FYTaskItem key={task.id || index} {...task} isLoading={isLoading} />
            ))}
      </ScrollView>

      <AppText type="title" style={styles.sectionHeader}>
        {activeCat.toLowerCase() === "all"
          ? "All Tasks"
          : `${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Tasks`}
      </AppText>

      <CategoryButtons
        categories={categories}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        skeletonProps={skeletonProps}
        isLoading={isLoading}
      />
    </View>
  );

  const renderFooter = () => (
    <View style={{ marginTop: Spacing.md }}>
      <AppText type="title" style={{ textAlign: "center", marginBottom: Spacing.md }}>
        Can't find what you're searching for?
      </AppText>
      <SuggestTaskInput />
    </View>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <FlatList
        data={isLoading ? SKELETON_TASKS : filteredTasks}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={!isLoading ? renderFooter() : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => {
          return (
            <TaskItem
              isLoading={isLoading}
              title={item.title}
              lp={item.lp}
              progress={item.progress}
              status={item.limit}
              icon={item.icon}
              onPress={() => router.push(`task/${item.id}`)}
            />
          );
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  carouselContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.md
  }
});

export default TasksScreen;
