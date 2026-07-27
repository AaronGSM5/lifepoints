import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import ActiveTaskCard from "@/components/home/ActiveTaskCard";
import HeroCarousel from "@/components/home/HeroCarousel";
import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import AppText from "@/components/ui/AppText";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTasks } from "@/hooks/useTasks";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/addOpacity";
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

const TodayTab = ({ scrollY, onOpenQuestModal }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks"]);
  const [isDoneTasksVisible, setIsDoneTasksVisible] = useState(true);
  const completeTask = useStore((state) => state.completeTask);
  const { isLoading, isRefreshing, refreshTasks } = useTasks();
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const addExperience = useStore((state) => state.addExperience);
  const myActiveTasks = useMemo(() => tasksCatalog.filter((t) => activeTaskIds.includes(t.id)), [activeTaskIds]);
  const notifyQuestSystem = useStore((state) => state.notifyQuestSystem);

  const listData = useMemo(() => {
    const topElements = [
      { id: "event_banner", type: "event_banner" },
      { id: "active_tasks", type: "active_tasks" },
      { id: "done_tasks", type: "done_tasks" },
      { id: "for_you", type: "for_you" }
    ];

    return [...topElements];
  }, []);

  const handleToggleDoneTasks = () => {
    setIsDoneTasksVisible((prev) => !prev);
  };

  const handleToggleSubStep = useCallback((taskId, subStepId) => {
    console.log(`Substep ${subStepId} in Task ${taskId} geklickt!`);
    triggerHaptic();
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "event_banner":
          return (
            <View style={{ marginTop: Spacing.md + 44 + Spacing.md }}>
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
              {myActiveTasks.length === 1 ? (
                <View style={styles.emptyTasksContainer}>
                  <View style={styles.emptyTasksIconContainer}>
                    <Icon name={"flower"} color={MyTheme.primaryAccent} />
                  </View>
                  <AppText style={styles.noTasksText}>{t("No Active Tasks")}</AppText>
                  <AppText bold style={styles.noTasksQuote}>
                    {t("common:EmptyTaskQuote1")}
                  </AppText>
                </View>
              ) : (
                <View style={styles.activeTasksList}>
                  {[
                    {
                      id: 1,
                      title: "10-Min Morning Stretch",
                      icon: "timer",
                      lp: 10,
                      substeps: [
                        { _id: "s1", title: "Roll out mat", description: "Prepare your space", completed: true },
                        { _id: "s2", title: "Neck stretches", description: "Release tension", completed: false }
                      ]
                    }
                  ].map((task) => {
                    const totalSteps = task.substeps?.length || 0;
                    const completedSteps = task.substeps?.filter((step) => step.completed).length || 0;
                    const calculatedProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
                    return (
                      <ActiveTaskCard
                        key={task.id}
                        title={task.title}
                        icon={task.icon}
                        points={task.lp}
                        subSteps={task.substeps}
                        progress={calculatedProgress}
                        isLoading={isLoading}
                        onToggleSubStep={(subStepId) => handleToggleSubStep(task.id, subStepId)}
                        onAction={() => {
                          completeTask(task.id);
                          triggerHaptic("success");
                          notifyQuestSystem("TASK_COMPLETED", { category: task.category });
                          addExperience(task.xp);
                        }}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          );
        case "done_tasks":
          return (
            <SectionHeader
              title={t("Done Tasks")}
              rightIcon={<Icon name={isDoneTasksVisible ? "down" : "right"} color={MyTheme.muted} />}
              onRightPress={handleToggleDoneTasks}
              style={styles.paddedContent}
              textStyle={{ color: MyTheme.muted }}
            />
          );
        case "for_you":
          return (
            <View style={styles.paddedContent}>
              <SectionHeader title={t("For You")} />
            </View>
          );

        default:
          return null;
      }
    },
    [
      isLoading,
      addExperience,
      completeTask,
      onOpenQuestModal,
      isDoneTasksVisible,
      myActiveTasks,
      notifyQuestSystem,
      MyTheme,
      t,
      styles,
      handleToggleSubStep
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

const getStyles = (theme) =>
  StyleSheet.create({
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    emptyTasksContainer: {
      alignItems: "center",
      marginBottom: Spacing.xl,
      marginTop: Spacing.md
    },
    activeTasksList: {
      gap: Spacing.md,
      marginBottom: Spacing.md
    },
    emptyTasksIconContainer: {
      backgroundColor: addOpacity(theme.primaryAccent, 0.16),
      padding: Spacing.sm,
      borderRadius: Spacing.borderRadius.full
    },
    noTasksText: {
      textAlign: "center",
      marginTop: Spacing.sm,
      color: theme.muted
    },
    noTasksQuote: {
      textAlign: "center",
      marginTop: Spacing.md,
      color: addOpacity(theme.text, 0.85),
      fontSize: 13
    }
  });

export default TodayTab;
