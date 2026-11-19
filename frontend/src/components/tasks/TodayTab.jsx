import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ActiveTaskCard from "@/components/tasks/ActiveTaskCard";
import EmptyView from "@/components/ui/EmptyView";
import EventCard from "@/components/ui/EventCard";
import HistoryCard from "@/components/ui/HistoryCard";
import { SEGMENT_OFFSET } from "@/components/ui/NavigationRow";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTasks } from "@/hooks/useTasks";
import { TASKS_HERO_DATA } from "@/mocks/HeroData";
import { mockActiveTasks, mockFYTasks } from "@/mocks/Tasks";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { calculateTaskProgress } from "@/utils/taskHelpers";

import FYTaskCard from "./FYTaskCard";

const DONE_PREVIEW_COUNT = 5;

const TodayTab = ({ scrollY, onOpenQuestModal }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks", "common"]);
  const [isDoneTasksVisible, setIsDoneTasksVisible] = useState(true);
  const trackTask = useStore((state) => state.trackTask);
  const completeTask = useStore((state) => state.completeTask);
  const completedTaskIds = useStore((state) => state.completedTaskIds);
  const addExperience = useStore((state) => state.addExperience);
  const notifyQuestSystem = useStore((state) => state.notifyQuestSystem);
  const { isLoading, isRefreshing, refreshTasks } = useTasks();

  const [activeTasks, setActiveTasks] = useState(mockActiveTasks);

  const doneTasks = useMemo(() => {
    const uniqueIds = [...new Set([...completedTaskIds].reverse().map(String))];
    return uniqueIds
      .map((id) => tasksCatalog.find((task) => String(task.id) === id))
      .filter(Boolean)
      .slice(0, DONE_PREVIEW_COUNT);
  }, [completedTaskIds]);

  const updateSubSteps = useCallback((taskId, updater) => {
    setActiveTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, substeps: updater(task.substeps) } : task))
    );
  }, []);

  const handleToggleSubStep = useCallback(
    (taskId, subStepId) => {
      triggerHaptic();
      updateSubSteps(taskId, (steps) =>
        steps.map((step) => (step._id === subStepId ? { ...step, completed: !step.completed } : step))
      );
    },
    [updateSubSteps]
  );

  const handleAddSubStep = useCallback(
    (taskId, subStepText) => {
      updateSubSteps(taskId, (steps) => [
        ...steps,
        {
          _id: Date.now().toString(),
          title: subStepText.title,
          description: subStepText.description,
          completed: false,
          isCustom: true
        }
      ]);
    },
    [updateSubSteps]
  );

  const handleDeleteSubStep = useCallback(
    (taskId, subStepId) => {
      updateSubSteps(taskId, (steps) => steps.filter((step) => step._id !== subStepId));
    },
    [updateSubSteps]
  );

  const handleTaskFinished = useCallback(
    (task) => {
      completeTask(task.id);
      setActiveTasks((prevTasks) => prevTasks.filter((item) => item.id !== task.id));
      triggerHaptic("success");
      notifyQuestSystem("TASK_COMPLETED", { category: task.category });
      addExperience(task.xp);
      router.push({
        pathname: "/task-completed",
        params: {
          title: task.title,
          points: task.lp,
          redirectUrl: "/(tabs)/tasks"
        }
      });
    },
    [addExperience, notifyQuestSystem, completeTask]
  );

  const listData = useMemo(() => {
    const items = [
      { id: "event", type: "event" },
      { id: "active_header", type: "active_header" }
    ];

    if (!activeTasks.length) {
      items.push({ id: "active_empty", type: "active_empty" });
    } else {
      activeTasks.forEach((task, index) => items.push({ id: `active_${task.id}`, type: "active_task", task, index }));
    }

    items.push({ id: "done_header", type: "done_header" });
    if (isDoneTasksVisible) {
      if (!doneTasks.length) {
        items.push({ id: "done_empty", type: "done_empty" });
      } else {
        doneTasks.forEach((task) => items.push({ id: `done_${task.id}`, type: "done_task", task }));
      }
    }

    items.push({ id: "for_you", type: "for_you" });
    return items;
  }, [activeTasks, doneTasks, isDoneTasksVisible]);

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "event":
          return (
            <View style={[styles.paddedContent, styles.topOffset]}>
              <EventCard event={TASKS_HERO_DATA[0]} label={t("common:Event")} />
            </View>
          );

        case "active_header":
          return (
            <SectionHeader
              title={t("Active Tasks")}
              counter={activeTasks.length || undefined}
              rightLabel={t("Quests")}
              onRightPress={onOpenQuestModal}
              style={[styles.paddedContent, styles.sectionSpacing]}
            />
          );

        case "active_empty":
          return (
            <View style={styles.paddedContent}>
              <EmptyView
                icon="flower"
                iconColor={MyTheme.primaryAccent}
                iconBgColor={addOpacity(MyTheme.primaryAccent, 0.16)}
                iconSize={24}
                title={t("No Active Tasks")}
                description={t("common:EmptyTaskQuote1")}
              />
            </View>
          );

        case "active_task": {
          const { task, index } = item;
          return (
            <View style={[styles.paddedContent, styles.itemSpacing]}>
              <ActiveTaskCard
                id={task.id}
                title={task.title}
                icon={task.icon}
                lp={task.lp}
                progress={calculateTaskProgress(task.substeps)}
                isLoading={isLoading}
                initialExpanded={index === 0}
                subSteps={task.substeps}
                onToggleSubStep={(subStepId) => handleToggleSubStep(task.id, subStepId)}
                onAddSubStep={(subStepText) => handleAddSubStep(task.id, subStepText)}
                onDeleteSubStep={(subStepId) => handleDeleteSubStep(task.id, subStepId)}
                onAction={() => handleTaskFinished(task)}
              />
            </View>
          );
        }

        case "done_header":
          return (
            <SectionHeader
              title={t("Done Tasks")}
              counter={doneTasks.length || undefined}
              collapsible
              isCollapsed={!isDoneTasksVisible}
              onToggle={() => setIsDoneTasksVisible((prev) => !prev)}
              style={[styles.paddedContent, styles.sectionSpacing]}
            />
          );

        case "done_empty":
          return (
            <View style={styles.paddedContent}>
              <EmptyView
                icon="checkmarkCircle"
                iconSize={24}
                title={t("Nothing done yet")}
                description={t("Finished tasks show up here.")}
                containerStyle={styles.compactEmpty}
              />
            </View>
          );

        case "done_task":
          return (
            <View style={[styles.paddedContent, styles.itemSpacingSm]}>
              <HistoryCard
                title={item.task.title}
                points={item.task.lp}
                iconNode={<Icon name="checkmark" size={20} color={MyTheme.primaryAccent} />}
              />
            </View>
          );

        case "for_you":
          return (
            <View style={[styles.paddedContent, styles.sectionSpacing]}>
              <SectionHeader title={t("For You")} />
              <View style={styles.tasksList}>
                {mockFYTasks.map((task) => (
                  <FYTaskCard
                    key={task.id}
                    title={task.title}
                    icon={task.icon}
                    lp={task.lp}
                    isLoading={isLoading}
                    onNavigate={() => router.push(`/task/${task.id}`)}
                    onAction={() => {
                      trackTask(task.id);
                      triggerHaptic("success");
                    }}
                  />
                ))}
              </View>
            </View>
          );

        default:
          return null;
      }
    },
    [
      styles,
      t,
      activeTasks.length,
      onOpenQuestModal,
      MyTheme,
      isLoading,
      handleToggleSubStep,
      handleAddSubStep,
      handleDeleteSubStep,
      handleTaskFinished,
      doneTasks.length,
      isDoneTasksVisible,
      trackTask
    ]
  );

  return (
    <AnimatedScreenList
      scrollY={scrollY}
      data={listData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onRefresh={refreshTasks}
      refreshing={isRefreshing}
      withTopPadding={false}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    topOffset: {
      marginTop: SEGMENT_OFFSET
    },
    sectionSpacing: {
      marginTop: Spacing.lg
    },
    itemSpacing: {
      marginBottom: Spacing.md
    },
    itemSpacingSm: {
      marginBottom: Spacing.sm
    },
    tasksList: {
      gap: Spacing.md
    },
    compactEmpty: {
      minHeight: 0,
      paddingVertical: Spacing.md
    }
  });

export default TodayTab;
