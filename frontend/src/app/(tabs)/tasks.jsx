import ScreenWrapper from "@/components/layout/ScreenWrapper";
import FYTaskItem from "@/components/tasks/FYTaskItem";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import CategoryButtons from "@/components/ui/CategoryButtons";
import { useTasks } from "@/hooks/useTasks";
import SectionHeader from "@/components/ui/SectionHeader";
import useStore from "@/store/useStore";
import InstaTrackingModal from "@/components/home/InstaTrackingModal";
import { useTranslation } from "react-i18next";
import { triggerHaptic } from "@/utils/haptics";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";

const SKELETON_TASKS = Array.from({ length: 4 }).map((_, i) => ({ id: `s-${i}`, isSkeleton: true }));
const SKELETON_FY_TASKS = [1, 2, 3];

const TasksScreen = () => {
  const router = useRouter();
  const { t } = useTranslation(["tasks", "common"]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [taskToTrack, setTaskToTrack] = useState(null);
  const [instaTrackingModalVisible, setInstaTrackingModalVisible] = useState(false);
  const showInstaTrackingModal = useStore((state) => state.showInstaTrackingModal);
  const disableInstaTrackingModal = useStore((state) => state.disableInstaTrackingModal);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const trackTask = useStore((state) => state.trackTask);
  const completeTask = useStore((state) => state.completeTask);
  const { tasks, recommendedTasks, categories, activeCat, setActiveCat, isLoading, isRefreshing, refreshTasks } =
    useTasks();

  const styles = getStyles();
  const skeletonProps = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  const handleInstaTrackingConfirm = (dontShowAgain) => {
    setInstaTrackingModalVisible(false);

    if (dontShowAgain) {
      disableInstaTrackingModal();
    }

    if (taskToTrack) {
      completeTask(taskToTrack);
      setTaskToTrack(null);
    }
  };

  const listData = useMemo(() => {
    const topElements = [
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
      case "for_you":
        return (
          <View style={styles.sectionMargin}>
            <View style={styles.paddedContent}>
              <SectionHeader title={t("For You")} />
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
                title={activeCat === "all" ? t("All Tasks") : `${t(`categories.${activeCat}`)} ${t("Tasks")}`}
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
              id={item.id}
              isLoading={isLoading}
              title={item.title}
              lp={item.lp}
              progress={item.progress}
              status={item.limit}
              icon={item.icon}
              requiresInput={item.requiresInput}
              onTrack={() => trackTask(item.id)}
              onInstaTrack={() => {
                if (showInstaTrackingModal) {
                  setTaskToTrack(item.id);
                  setInstaTrackingModalVisible(true);
                } else {
                  triggerHaptic();
                  completeTask(item.id);
                }
              }}
              onNavigate={() => router.push(`task/${item.id}`)}
              isExpanded={expandedTaskId === item.id}
              onToggleExpand={() => {
                setExpandedTaskId(expandedTaskId === item.id ? null : item.id);
              }}
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
        {t("Can't find what you're searching for?")}
      </AppText>
      <SuggestTaskInput />
    </View>
  );

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingTop={false}>
      <AnimatedScreenList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={!isLoading ? renderFooter() : null}
        onRefresh={refreshTasks}
        refreshing={isRefreshing}
      />
      <InstaTrackingModal
        visible={instaTrackingModalVisible}
        onClose={() => setInstaTrackingModalVisible(false)}
        onConfirm={handleInstaTrackingConfirm}
      />
    </ScreenWrapper>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
