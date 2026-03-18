import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import FYTaskItem from "@/components/tasks/FYTaskItem";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Skeleton } from "moti/skeleton";
import CategoryButtons from "@/components/ui/CategoryButtons";
import { useTasks } from "@/hooks/useTasks";
import SectionHeader from "@/components/ui/SectionHeader";

const SKELETON_TASKS = Array.from({ length: 4 }).map((_, i) => ({ id: `s-${i}`, isSkeleton: true }));
const SKELETON_FY_TASKS = [1, 2, 3];

const TasksScreen = () => {
  const router = useRouter();
  const bottomPadding = useFloatingNavbarPadding();
  const {
    tasks,
    recommendedTasks,
    categories,
    activeCat,
    setActiveCat,
    searchQuery,
    setSearchQuery,
    isLoading,
    isRefreshing,
    refreshTasks
  } = useTasks();

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  const renderHeader = useMemo(
    () => (
      <View>
        <Skeleton {...skeletonProps} width="100%" radius={Spacing.borderRadius.lg}>
          <AppInput icon="search" placeholder="Search tasks..." value={searchQuery} onChangeText={setSearchQuery} />
        </Skeleton>

        <SectionHeader title={"For You"} rightLabel={"See more"} onRightPress={() => {}} isLoading={isLoading} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
          {isLoading
            ? SKELETON_FY_TASKS.map((item, index) => <FYTaskItem key={item.id || index} isLoading={isLoading} />)
            : recommendedTasks.map((task, index) => (
                <FYTaskItem key={task.id || index} {...task} isLoading={isLoading} />
              ))}
        </ScrollView>

        <SectionHeader
          title={
            activeCat.toLowerCase() === "all"
              ? "All Tasks"
              : `${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Tasks`
          }
          isLoading={isLoading}
        />

        <CategoryButtons
          categories={categories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          skeletonProps={skeletonProps}
          isLoading={isLoading}
        />
      </View>
    ),
    [isLoading, activeCat, categories, recommendedTasks, searchQuery]
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
        data={isLoading ? SKELETON_TASKS : tasks}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : item.id.toString())}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={!isLoading ? renderFooter() : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        onRefresh={refreshTasks}
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
  carouselContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg
  }
});

export default TasksScreen;
