import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ActiveTaskCard from "@/components/tasks/ActiveTaskCard";
import HeroCarousel from "@/components/ui/HeroCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import { FEATURES } from "@/constants/FeatureFlags";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTasks } from "@/hooks/useTasks";
import { TASKS_HERO_DATA } from "@/mocks/HeroData";
import { mockFYTasks } from "@/mocks/Tasks";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { normalizeTask } from "@/utils/taskHelpers";

import FYTaskCard from "./FYTaskCard";
import AppButton from "../ui/AppButton";
import EmptyView from "../ui/EmptyView";

const TodayTab = ({ scrollY, onOpenQuestModal, onOpenCatalog }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks"]);
  const trackTask = useStore((state) => state.trackTask);
  const completeTask = useStore((state) => state.completeTask);
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const trackedTasks = useStore((state) => state.trackedTasks);
  const { isLoading, isRefreshing, refreshTasks } = useTasks();

  // Getrackte Tasks aus dem Store (Snapshot) – Fallback für alte, nur per ID gespeicherte Einträge
  const myActiveTasks = useMemo(
    () =>
      activeTaskIds
        .map(
          (id) =>
            trackedTasks?.[String(id)] || normalizeTask(tasksCatalog.find((task) => String(task.id) === String(id)))
        )
        .filter(Boolean),
    [activeTaskIds, trackedTasks]
  );

  const listData = useMemo(
    () =>
      [
        FEATURES.heroCarousel && { id: "event_banner", type: "event_banner" },
        { id: "active_tasks", type: "active_tasks" },
        FEATURES.forYouTasks && { id: "for_you", type: "for_you" }
      ].filter(Boolean),
    []
  );

  const getIconConfig = useCallback(
    (icon) =>
      icon && typeof icon === "object"
        ? icon
        : { name: icon || "checkmark", color: MyTheme.primaryAccent, bg: addOpacity(MyTheme.primaryAccent, 0.16) },
    [MyTheme]
  );

  const handleTaskFinished = useCallback(
    (task) => {
      const completed = completeTask(task.id);
      if (!completed) return;

      triggerHaptic("success");
      router.push({
        pathname: "/task-completed",
        params: {
          title: completed.title,
          points: completed.lp,
          redirectUrl: "/(tabs)/tasks"
        }
      });
    },
    [completeTask]
  );

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "event_banner":
          return (
            <View style={{ marginTop: Spacing.md + 44 + Spacing.md }}>
              <HeroCarousel data={TASKS_HERO_DATA} isLoading={isLoading} onPressItem={() => {}} />
            </View>
          );

        case "active_tasks":
          return (
            <View style={[styles.paddedContent, !FEATURES.heroCarousel && styles.topOffset]}>
              <SectionHeader
                title={t("Active Tasks")}
                rightIcon={FEATURES.quests ? <Icon name={"survey"} /> : undefined}
                onRightPress={FEATURES.quests ? onOpenQuestModal : undefined}
              />
              {myActiveTasks.length === 0 ? (
                <>
                  <EmptyView
                    icon="flower"
                    iconColor={MyTheme.primaryAccent}
                    iconBgColor={addOpacity(MyTheme.primaryAccent, 0.16)}
                    iconSize={24}
                    title={t("No Active Tasks")}
                    description={t("common:EmptyTaskQuote1")}
                  />
                  {onOpenCatalog && <AppButton title={t("Browse tasks")} variant="outline" onPress={onOpenCatalog} />}
                </>
              ) : (
                <View style={styles.tasksList}>
                  {myActiveTasks.map((task, i) => (
                    <ActiveTaskCard
                      key={String(task.id)}
                      id={task.id}
                      title={task.title}
                      icon={getIconConfig(task.icon)}
                      lp={task.lp}
                      progress={0}
                      isLoading={false}
                      initialExpanded={i === 0}
                      showSubSteps={FEATURES.taskSubsteps}
                      onAction={() => handleTaskFinished(task)}
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
                      trackTask(task);
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
      onOpenCatalog,
      myActiveTasks,
      MyTheme,
      t,
      styles,
      trackTask,
      getIconConfig,
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
    topOffset: {
      marginTop: Spacing.md + 44 + Spacing.md
    },
    tasksList: {
      gap: Spacing.md,
      marginBottom: Spacing.md
    }
  });

export default TodayTab;
