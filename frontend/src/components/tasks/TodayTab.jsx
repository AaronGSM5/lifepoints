import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ActiveTaskCard from "@/components/tasks/ActiveTaskCard";
import HeroCarousel from "@/components/ui/HeroCarousel";
import HistoryCard from "@/components/ui/HistoryCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTasks } from "@/hooks/useTasks";
import { TASKS_HERO_DATA } from "@/mocks/HeroData";
import { mockActiveTasks } from "@/mocks/Tasks";
import { mockFYTasks } from "@/mocks/Tasks";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { formatTimeOrDate } from "@/utils/dateHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { calculateTaskProgress } from "@/utils/taskHelpers";

import FYTaskCard from "./FYTaskCard";
import EmptyView from "../ui/EmptyView";

const listData = [
  { id: "event_banner", type: "event_banner" },
  { id: "active_tasks", type: "active_tasks" },
  { id: "done_tasks", type: "done_tasks" },
  { id: "for_you", type: "for_you" }
];

const TodayTab = ({ scrollY, onOpenQuestModal }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks"]);
  const [isDoneTasksVisible, setIsDoneTasksVisible] = useState(true);
  const trackTask = useStore((state) => state.trackTask);
  const completeTask = useStore((state) => state.completeTask);
  const { isLoading, isRefreshing, refreshTasks } = useTasks();
  const addExperience = useStore((state) => state.addExperience);
  const notifyQuestSystem = useStore((state) => state.notifyQuestSystem);

  const [activeTasks, setActiveTasks] = useState(mockActiveTasks);
  // Heute erledigte Tasks (lokal, solange die Active Tasks noch Mock-Daten sind)
  const [doneTasks, setDoneTasks] = useState([]);

  const handleToggleDoneTasks = () => {
    setIsDoneTasksVisible((prev) => !prev);
  };

  const handleToggleSubStep = useCallback((taskId, subStepId) => {
    console.log(`Substep ${subStepId} in Task ${taskId} geklickt!`);
    triggerHaptic();
  }, []);

  const handleAddSubStep = useCallback((taskId, subStepText) => {
    setActiveTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            substeps: [
              ...task.substeps,
              {
                _id: Date.now().toString(),
                title: subStepText.title,
                description: subStepText.description,
                completed: false,
                isCustom: true
              }
            ]
          };
        }
        return task;
      })
    );
  }, []);

  const handleDeleteSubStep = useCallback((taskId, subStepId) => {
    setActiveTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            substeps: task.substeps.filter((step) => step._id !== subStepId)
          };
        }
        return task;
      })
    );
  }, []);

  const handleTaskFinished = useCallback(
    (task) => {
      completeTask(task.id);
      setActiveTasks((prev) => prev.filter((activeTask) => activeTask.id !== task.id));
      setDoneTasks((prev) => [{ ...task, completedAt: new Date().toISOString() }, ...prev]);
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

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "event_banner":
          return (
            <View style={{ marginTop: Spacing.md }}>
              <HeroCarousel data={TASKS_HERO_DATA} isLoading={isLoading} onPressItem={() => console.log("Test")} />
            </View>
          );

        case "active_tasks":
          return (
            <View style={styles.paddedContent}>
              <SectionHeader
                title={t("Active Tasks")}
                rightIcon={<Icon name={"survey"} />}
                onRightPress={onOpenQuestModal}
              />
              {activeTasks.length === 0 ? (
                <EmptyView
                  icon="flower"
                  iconColor={MyTheme.primaryAccent}
                  iconBgColor={addOpacity(MyTheme.primaryAccent, 0.16)}
                  iconSize={24}
                  title={t("No Active Tasks")}
                  description={t("common:EmptyTaskQuote1")}
                />
              ) : (
                <View style={styles.tasksList}>
                  {activeTasks.map((task, i) => {
                    const calculatedProgress = calculateTaskProgress(task.substeps);
                    return (
                      <ActiveTaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        icon={task.icon}
                        lp={task.lp}
                        progress={calculatedProgress}
                        isLoading={isLoading}
                        initialExpanded={i === 0 ? true : false}
                        subSteps={task.substeps}
                        onToggleSubStep={(subStepId) => handleToggleSubStep(task.id, subStepId)}
                        onAddSubStep={(subStepText) => handleAddSubStep(task.id, subStepText)}
                        onDeleteSubStep={(subStepId) => handleDeleteSubStep(task.id, subStepId)}
                        onAction={() => handleTaskFinished(task)}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          );
        case "done_tasks":
          // Ohne erledigte Tasks wird die Sektion ausgeblendet statt einer leeren Überschrift.
          if (!doneTasks.length) return null;
          return (
            <View style={styles.paddedContent} testID="done-tasks-section">
              <SectionHeader
                title={`${t("Done Tasks")} (${doneTasks.length})`}
                rightIcon={<Icon name={isDoneTasksVisible ? "down" : "right"} color={MyTheme.muted} />}
                onRightPress={handleToggleDoneTasks}
                textStyle={{ color: MyTheme.muted }}
              />
              {isDoneTasksVisible && (
                <View style={styles.tasksList}>
                  {doneTasks.map((task) => (
                    <HistoryCard
                      key={`done-${task.id}`}
                      title={task.title}
                      time={formatTimeOrDate(task.completedAt)}
                      points={task.lp}
                      type="earn"
                      pointsSuffix="LP"
                      iconNode={<Icon name="checkmark" size={16} color={MyTheme.primaryAccentText} />}
                    />
                  ))}
                </View>
              )}
            </View>
          );
        case "for_you":
          return (
            <View style={styles.paddedContent}>
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
      isLoading,
      onOpenQuestModal,
      isDoneTasksVisible,
      doneTasks,
      MyTheme,
      t,
      styles,
      handleToggleSubStep,
      activeTasks,
      trackTask,
      handleAddSubStep,
      handleDeleteSubStep,
      handleTaskFinished
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
    tasksList: {
      gap: Spacing.md,
      marginBottom: Spacing.md
    }
  });

export default TodayTab;
