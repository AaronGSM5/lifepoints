import React, { useCallback, useMemo, useState } from "react";
import { Animated, View } from "react-native";

import InstaTrackingModal from "@/components/home/InstaTrackingModal";
import QuestModal from "@/components/home/QuestModal";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CatalogTab from "@/components/tasks/CatalogTab";
import NavigationRow from "@/components/tasks/NavigationRow";
import RoutinesTab from "@/components/tasks/RoutinesTab";
import TodayTab from "@/components/tasks/TodayTab";
import { useTasks } from "@/hooks/useTasks";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import useStore from "@/store/useStore";

const TABS = ["Today", "Catalog", "Routines"];

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
        completeTask(taskToTrack);
        setTaskToTrack(null);
      }
    },
    [completeTask, taskToTrack, disableInstaTrackingModal]
  );

  const renderActiveTab = () => {
    const handleOpenInstaTracking = (taskId) => {
      setTaskToTrack(taskId);
      setInstaTrackingModalVisible(true);
    };

    const handleOpenQuestModal = () => {
      setQuestModalVisible(true);
    };

    switch (activeTabIndex) {
      case 0:
        return (
          <TodayTab
            scrollY={scrollY}
            onOpenInstaTracking={handleOpenInstaTracking}
            onOpenQuestModal={handleOpenQuestModal}
          />
        );
      case 1:
        return <CatalogTab scrollY={scrollY} onOpenInstaTracking={handleOpenInstaTracking} />;
      case 2:
        return <RoutinesTab scrollY={scrollY} onOpenInstaTracking={handleOpenInstaTracking} />;
      default:
        return (
          <TodayTab
            scrollY={scrollY}
            onOpenInstaTracking={handleOpenInstaTracking}
            onOpenQuestModal={handleOpenQuestModal}
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
      <QuestModal visible={questmodalVisible} onClose={() => setQuestModalVisible(false)} mockQuests={quests} />
    </ScreenWrapper>
  );
};

export default TasksScreen;
