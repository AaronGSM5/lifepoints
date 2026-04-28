import { View, FlatList } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import { useMemo, useState } from "react";
import FeedItem from "@/components/home/FeedItem";
import LpChart from "@/components/home/LpChart";
import CommentSheet from "@/components/home/CommentSheet";
import SectionHeader from "@/components/ui/SectionHeader";
import EventHero from "@/components/home/EventHero";
import ActiveTaskCard from "@/components/home/ActiveTaskCard";
import { useHome } from "@/hooks/useHome";
import { Icon } from "@/components/icons/Icon";
import QuestModal from "@/components/home/QuestModal";
import useStore from "@/store/useStore";
import AppText from "@/components/ui/AppText";
import LevelUpModal from "@/components/LevelUpModal";

const SKELETON_ITEMS = [1, 2, 3];

export default function HomeScreen() {
  const { feedItems, quests, isLoading, isRefreshing, refreshHomeData } = useHome();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [questmodalVisible, setQuestModalVisible] = useState(false);
  const bottomPadding = useFloatingNavbarPadding();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const allTasks = useStore((state) => state.tasks);
  const completeTask = useStore((state) => state.completeTask);
  const addExperience = useStore((state) => state.addExperience);
  const showLevelUpModal = useStore((state) => state.showLevelUpModal);
  const setShowLevelUpModal = useStore((state) => state.setShowLevelUpModal);
  const profileLevel = useStore((state) => state.profile.profileLevel);
  const myActiveTasks = allTasks.filter((t) => activeTaskIds.includes(t.id));

  if (shouldCrash) {
    throw new Error("Das ist ein provozierter Render-Crash!");
  }

  const skeletonProps = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  const renderHeader = useMemo(
    () => (
      <View style={{ paddingHorizontal: Spacing.md }}>
        <EventHero imageSource={require("../../../public/assets/events/achtsamkeit2.png")} isLoading={isLoading} />
        <SectionHeader
          title={"Active Tasks"}
          rightIcon={<Icon name={"survey"} />}
          onRightPress={() => setQuestModalVisible(true)}
        />
        {myActiveTasks.length === 0 ? (
          <>
            <View style={{ marginBottom: Spacing.md }} />
            <AppText type="caption" bold style={{ alignSelf: "center" }}>
              NO ACTIVE TASKS
            </AppText>
            <View style={{ marginBottom: Spacing.lg }} />
          </>
        ) : (
          myActiveTasks.map((task) => (
            <>
              <ActiveTaskCard
                key={task.id}
                title={task.title}
                points={task.lp}
                isLoading={isLoading}
                onAction={() => {
                  completeTask(task.id);
                  addExperience(task.xp);
                }}
              />
              <View style={{ marginBottom: Spacing.md }} />
            </>
          ))
        )}
        <SectionHeader title={"Feed"} />
      </View>
    ),
    [isLoading, myActiveTasks]
  );

  const renderFooter = () => (
    <View style={{ marginTop: Spacing.md, paddingHorizontal: Spacing.sm }}>
      <LpChart />
    </View>
  );
  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false} withPaddingSides={false} withPaddingTop={false}>
      <FlatList
        data={isLoading ? SKELETON_ITEMS : feedItems}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : item.id.toString())}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        onRefresh={refreshHomeData}
        refreshing={isRefreshing}
        renderItem={({ item }) => (
          <FeedItem
            {...item}
            isLoading={isLoading}
            skeletonProps={skeletonProps}
            onOpenComments={(id) => setSelectedPostId(id)}
          />
        )}
      />
      <CommentSheet
        isVisible={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        postId={selectedPostId}
      />
      <QuestModal visible={questmodalVisible} onClose={() => setQuestModalVisible(false)} mockQuests={quests} />
      <LevelUpModal
        visible={showLevelUpModal}
        level={profileLevel}
        onTransitionEnd={() => setShowLevelUpModal(false)}
      />
    </ScreenWrapper>
  );
}
