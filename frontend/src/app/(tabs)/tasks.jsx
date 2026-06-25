import ScreenWrapper from "@/components/layout/ScreenWrapper";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import TaskItem from "@/components/tasks/TaskItem";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import CategoryButtons from "@/components/ui/CategoryButtons";
import { useTasks } from "@/hooks/useTasks";
import useStore from "@/store/useStore";
import InstaTrackingModal from "@/components/home/InstaTrackingModal";
import { useTranslation } from "react-i18next";
import { triggerHaptic } from "@/utils/haptics";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import EventHero from "@/components/home/EventHero";
import AppInput from "@/components/ui/AppInput";
import NavigationRow from "@/components/tasks/NavigationRow";

const SKELETON_TASKS = Array.from({ length: 4 }).map((_, i) => ({ id: `s-${i}`, isSkeleton: true }));
// const SKELETON_FY_TASKS = [1, 2, 3];

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
  const { tasks, categories, activeCat, setActiveCat, isLoading, isRefreshing, refreshTasks } = useTasks();

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
      { id: "event_banner", type: "event_banner" },
      { id: "search_bar", type: "search_bar" },
      { id: "categories", type: "categories" }
    ];

    if (isLoading) {
      return [...topElements, ...SKELETON_TASKS.map((skel) => ({ ...skel, type: "task" }))];
    }

    return [...topElements, ...tasks.map((task) => ({ ...task, type: "task" }))];
  }, [isLoading, tasks]);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "event_banner":
        return (
          <View style={[styles.paddedContent, { marginBottom: Spacing.md }]}>
            <EventHero imageSource={require("../../../public/assets/events/achtsamkeit2.png")} isLoading={isLoading} />
          </View>
        );

      case "search_bar":
        return (
          <View style={styles.paddedContent}>
            <AppInput placeholder={"Search..."} />
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

      case "categories":
        return (
          <CategoryButtons
            categories={categories}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            skeletonProps={skeletonProps}
            isLoading={isLoading}
          />
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
    <ScreenWrapper scrollable={false} withPaddingSides={false}>
      <NavigationRow />
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
    paddedContent: {
      paddingHorizontal: Spacing.md
    }
  });

export default TasksScreen;
