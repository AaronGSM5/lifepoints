import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import ActiveTaskCard from "@/components/home/ActiveTaskCard";
import HeroCarousel from "@/components/home/HeroCarousel";
import InstaTrackingModal from "@/components/home/InstaTrackingModal";
import QuestModal from "@/components/home/QuestModal";
import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import NavigationRow from "@/components/tasks/NavigationRow";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useTasks } from "@/hooks/useTasks";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

const TASKS_HERO_DATA = [
  {
    id: "1",
    image: require("@/../public/assets/events/achtsamkeit2.png"),
    title: "Sommer Party",
    eventLink: "/event/123"
  },
  {
    id: "2",
    image: require("@/../public/assets/events/sportevent.png"),
    title: "Tech Meetup",
    eventLink: "/event/456"
  }
];

const TasksScreen = () => {
  const router = useRouter();
  const { t } = useTranslation(["tasks", "common"]);
  const [questmodalVisible, setQuestModalVisible] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [taskToTrack, setTaskToTrack] = useState(null);
  const [instaTrackingModalVisible, setInstaTrackingModalVisible] = useState(false);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const showInstaTrackingModal = useStore((state) => state.showInstaTrackingModal);
  const disableInstaTrackingModal = useStore((state) => state.disableInstaTrackingModal);
  const trackTask = useStore((state) => state.trackTask);
  const completeTask = useStore((state) => state.completeTask);
  const { tasks, quests, categories, isLoading, isRefreshing, refreshTasks } = useTasks();
  const toolbarHeight = useToolbarPadding();
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const addExperience = useStore((state) => state.addExperience);
  const myActiveTasks = useMemo(() => tasksCatalog.filter((t) => activeTaskIds.includes(t.id)), [activeTaskIds]);
  const notifyQuestSystem = useStore((state) => state.notifyQuestSystem);

  const styles = getStyles();

  const handleInstaTrackingConfirm = useCallback(
    (dontShowAgain) => {
      setInstaTrackingModalVisible(false);

      if (dontShowAgain) {
        disableInstaTrackingModal();
      }

      if (taskToTrack) {
        completeTask(taskToTrack);
        setTaskToTrack(null);
      }
    },
    [completeTask, taskToTrack, disableInstaTrackingModal]
  );

  const listData = useMemo(() => {
    const topElements = [
      { id: "event_banner", type: "event_banner" },
      { id: "search_bar", type: "search_bar" },
      { id: "active_tasks", type: "active_tasks" }
    ];

    const groupedCategories = categories
      .map((cat) => {
        const categoryTasks = tasks.filter((task) => task.category === cat.id);
        return {
          id: `cat_row_${cat.id}`,
          type: "category_row",
          title: cat.label,
          data: categoryTasks
        };
      })
      .filter((cat) => cat.data.length > 0);

    return [...topElements, ...groupedCategories];
  }, [tasks, categories]);

  const renderHorizontalTaskItem = useCallback(
    ({ item }) => (
      <View style={styles.horizontalTaskContainer}>
        <TaskItem
          id={item.id}
          isLoading={isLoading}
          title={item.title}
          description={item.description}
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
          onToggleExpand={() => setExpandedTaskId(expandedTaskId === item.id ? null : item.id)}
        />
      </View>
    ),
    [isLoading, expandedTaskId, showInstaTrackingModal, trackTask, completeTask, router, styles]
  );

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "event_banner":
          return (
            <View style={{ marginTop: Spacing.md + 44 + Spacing.md }}>
              <HeroCarousel data={TASKS_HERO_DATA} isLoading={isLoading} onPressItem={() => console.log("Test")} />
            </View>
          );

        case "search_bar":
          return (
            <View style={styles.paddedContent}>
              <AppInput icon="search" placeholder={t("Search...")} blur />
            </View>
          );

        case "category_row":
          return (
            <View style={styles.categoryRow}>
              <SectionHeader title={item.title} isLoading={isLoading} style={styles.paddedContent} />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.data}
                keyExtractor={(t) => t.id.toString()}
                renderItem={renderHorizontalTaskItem}
                contentContainerStyle={styles.horizontalListPadding}
                snapToInterval={280 + Spacing.md}
                snapToAlignment="start"
                decelerationRate="fast"
              />
            </View>
          );

        case "active_tasks":
          return (
            <View style={styles.paddedContent}>
              <SectionHeader
                title={t("Active Tasks")}
                rightIcon={<Icon name={"survey"} />}
                onRightPress={() => setQuestModalVisible(true)}
              />
              {myActiveTasks.length === 0 ? (
                <View style={styles.emptyTasksContainer}>
                  <AppText type="caption" bold>
                    {t("No Active Tasks")}
                  </AppText>
                </View>
              ) : (
                <View style={styles.activeTasksList}>
                  {myActiveTasks.map((task) => (
                    <ActiveTaskCard
                      key={task.id}
                      title={task.title}
                      points={task.lp}
                      isLoading={isLoading}
                      onAction={() => {
                        completeTask(task.id);
                        triggerHaptic("success");
                        notifyQuestSystem("TASK_COMPLETED", { category: task.category });
                        addExperience(task.xp);
                      }}
                    />
                  ))}
                </View>
              )}
            </View>
          );

        default:
          return null;
      }
    },
    [isLoading, renderHorizontalTaskItem, addExperience, completeTask, myActiveTasks, notifyQuestSystem, t, styles]
  );

  const renderFooter = () => (
    <View style={[styles.paddedContent, { marginTop: Spacing.md }]}>
      <AppText type="title" style={{ textAlign: "center", marginBottom: Spacing.md }}>
        {t("Can't find what you're searching for?")}
      </AppText>
      <SuggestTaskInput />
    </View>
  );

  return (
    <ScreenWrapper scrollY={scrollY} scrollable={false} withPaddingSides={false}>
      <AnimatedScreenList
        scrollY={scrollY}
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={!isLoading ? renderFooter() : null}
        onRefresh={refreshTasks}
        refreshing={isRefreshing}
        withTopPadding={false}
      />
      <View
        style={{
          position: "absolute",
          top: toolbarHeight,
          left: 0,
          right: 0,
          zIndex: 10
        }}
        pointerEvents="box-none"
      >
        <NavigationRow />
      </View>
      <InstaTrackingModal
        visible={instaTrackingModalVisible}
        onClose={() => setInstaTrackingModalVisible(false)}
        onConfirm={handleInstaTrackingConfirm}
      />
      <QuestModal visible={questmodalVisible} onClose={() => setQuestModalVisible(false)} mockQuests={quests} />
    </ScreenWrapper>
  );
};

const getStyles = () =>
  StyleSheet.create({
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    emptyTasksContainer: {
      alignItems: "center",
      marginBottom: Spacing.lg,
      marginTop: Spacing.md
    },
    activeTasksList: {
      gap: Spacing.md,
      marginBottom: Spacing.md
    },
    categoryRow: {
      marginBottom: Spacing.lg
    },
    categoryTitle: {
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.sm,
      fontWeight: "bold"
    },
    horizontalListPadding: {
      paddingHorizontal: Spacing.md
    },
    horizontalTaskContainer: {
      width: 280,
      marginRight: Spacing.md
    }
  });

export default TasksScreen;
