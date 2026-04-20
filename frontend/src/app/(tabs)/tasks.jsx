import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import FYTaskItem from "@/components/tasks/FYTaskItem";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, Pressable } from "react-native";
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

  const listData = useMemo(() => {
    const topElements = [
      { id: "search", type: "search" },
      { id: "for_you", type: "for_you" },
      { id: "categories", type: "categories" }
    ];

    if (isLoading) {
      return [...topElements, ...SKELETON_TASKS.map((skel) => ({ ...skel, type: "task" }))];
    }

    return [...topElements, ...tasks.map((task) => ({ ...task, type: "task" }))];
  }, [isLoading, tasks]);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "search":
        return (
          <View style={[styles.paddedContent, styles.stickySearchWrapper]}>
            <Skeleton {...skeletonProps} width="100%" radius={Spacing.borderRadius.lg}>
              <Pressable onPress={() => router.push("/search")}>
                <View pointerEvents="none">
                  <AppInput icon="search" placeholder="Search..." bottomMargin={false} editable={false} blur />
                </View>
              </Pressable>
            </Skeleton>
          </View>
        );

      case "for_you":
        return (
          <View style={styles.sectionMargin}>
            <View style={styles.paddedContent}>
              <SectionHeader title={"For You"} />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
            >
              {isLoading
                ? SKELETON_FY_TASKS.map((i) => <FYTaskItem key={i} isLoading={true} />)
                : recommendedTasks.map((task, index) => (
                    <FYTaskItem key={task.id || index} {...task} isLoading={false} />
                  ))}
            </ScrollView>
          </View>
        );

      case "categories":
        return (
          <View style={styles.sectionMargin}>
            <View style={styles.paddedContent}>
              <SectionHeader
                title={
                  activeCat.toLowerCase() === "all"
                    ? "All Tasks"
                    : `${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Tasks`
                }
              />
            </View>
            <CategoryButtons
              categories={categories}
              activeCat={activeCat}
              setActiveCat={setActiveCat}
              skeletonProps={skeletonProps}
              isLoading={isLoading}
            />
          </View>
        );

      case "task":
        return (
          <View style={[styles.paddedContent, { marginBottom: Spacing.md }]}>
            <TaskItem
              isLoading={isLoading}
              title={item.title}
              lp={item.lp}
              progress={item.progress}
              status={item.limit}
              icon={item.icon}
              requiresInput={item.requiresInput}
              onTrack={(inputValue) => {
                console.log(`Tracke ${item.title} mit Wert: ${inputValue}`);
              }}
              onNavigate={() => router.push(`task/${item.id}`)}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const renderFooter = () => (
    <View style={[styles.paddedContent, { marginTop: Spacing.md }]}>
      <AppText type="title" style={{ textAlign: "center", marginBottom: Spacing.md }}>
        Can't find what you're searching for?
      </AppText>
      <SuggestTaskInput />
    </View>
  );

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingTop={false}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        ListFooterComponent={!isLoading ? renderFooter() : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        onRefresh={refreshTasks}
        refreshing={isRefreshing}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  stickySearchWrapper: {
    zIndex: 10,
    paddingTop: Spacing.sm
  },
  sectionMargin: {
    marginTop: Spacing.md
  },
  carouselContainer: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.lg
  },
  paddedContent: {
    paddingHorizontal: Spacing.md
  }
});

export default TasksScreen;
