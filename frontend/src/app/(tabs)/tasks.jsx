import React, { useCallback, useMemo, useState } from "react";
import { Animated, View } from "react-native";

import { router } from "expo-router";

import InstaTrackingModal from "@/components/home/InstaTrackingModal";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CatalogTab from "@/components/tasks/CatalogTab";
import NavigationRow from "@/components/tasks/NavigationRow";
import QuestModal from "@/components/tasks/QuestModal";
import RoutinesTab from "@/components/tasks/RoutinesTab";
import TodayTab from "@/components/tasks/TodayTab";
import { FEATURES } from "@/constants/FeatureFlags";
import { useTasks } from "@/hooks/useTasks";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import useStore from "@/store/useStore";

// MVP: Routinen sind ausgeblendet (FeatureFlags.js)
const TAB_CONFIG = [
  { key: "today", label: "Today" },
  { key: "catalog", label: "Catalog" },
  { key: "routines", label: "Routines", feature: "routines" }
].filter((tab) => !tab.feature || FEATURES[tab.feature]);
const TABS = TAB_CONFIG.map((tab) => tab.label);

const TasksScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [questmodalVisible, setQuestModalVisible] = useState(false);
  const [taskToTrack, setTaskToTrack] = useState(null);
  const [instaTrackingModalVisible, setInstaTrackingModalVisible] = useState(false);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const disableInstaTrackingModal = useStore((state) => state.disableInstaTrackingModal);
  const completeTask = useStore((state) => state.completeTask);
  const { quests } = useTasks();
  const toolbarHeight = useToolbarPadding();

  const handleInstaTrackingConfirm = useCallback(
    (dontShowAgain) => {
      setInstaTrackingModalVisible(false);

      if (dontShowAgain) {
        disableInstaTrackingModal();
      }

      if (taskToTrack) {
        const completed = completeTask(taskToTrack);
        setTaskToTrack(null);
        if (completed) {
          router.push({
            pathname: "/task-completed",
            params: { title: completed.title, points: completed.lp, redirectUrl: "/(tabs)/tasks" }
          });
        }
      }
    },
    [completeTask, taskToTrack, disableInstaTrackingModal]
  );

  const renderActiveTab = () => {
    const handleOpenInstaTracking = (task) => {
      setTaskToTrack(task);
      setInstaTrackingModalVisible(true);
    };

    const handleOpenQuestModal = () => {
      setQuestModalVisible(true);
    };

    const catalogIndex = TAB_CONFIG.findIndex((tab) => tab.key === "catalog");

    switch (TAB_CONFIG[activeTabIndex]?.key) {
      case "catalog":
        return <CatalogTab scrollY={scrollY} onOpenInstaTracking={handleOpenInstaTracking} />;
      case "routines":
        return <RoutinesTab scrollY={scrollY} />;
      case "today":
      default:
        return (
          <TodayTab
            scrollY={scrollY}
            onOpenQuestModal={handleOpenQuestModal}
            onOpenCatalog={() => setActiveTabIndex(catalogIndex)}
          />
        );
    }
  };

  return (
    <ScreenWrapper scrollY={scrollY} scrollable={false} withPaddingSides={false}>
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
        <NavigationRow tabs={TABS} activeIndex={activeTabIndex} onTabChange={setActiveTabIndex} />
      </View>
      {renderActiveTab()}
      <InstaTrackingModal
        visible={instaTrackingModalVisible}
        onClose={() => setInstaTrackingModalVisible(false)}
        onConfirm={handleInstaTrackingConfirm}
      />
      {FEATURES.quests && (
        <QuestModal visible={questmodalVisible} onClose={() => setQuestModalVisible(false)} mockQuests={quests} />
      )}
    </ScreenWrapper>
  );
};

export default TasksScreen;
