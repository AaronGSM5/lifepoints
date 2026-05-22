import { View, FlatList, ActivityIndicator } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import { useEffect, useState, useMemo } from "react";
import FeedItem from "@/components/home/FeedItem";
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
import LootGameModal from "@/components/home/LootGameModal";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";
import { triggerHaptic } from "@/utils/haptics";
import { tasksCatalog } from "@/constants/TasksCatalog";

const SKELETON_ITEMS = [1, 2, 3];

export default function HomeScreen() {
  const { feedItems, quests, isLoading, isRefreshing, refreshHomeData } = useHome();
  const MyTheme = useAppTheme();
  const { t } = useTranslation("home");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [questmodalVisible, setQuestModalVisible] = useState(false);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isBatchLoading, setIsBatchLoading] = useState(false);
  const bottomPadding = useFloatingNavbarPadding();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const completeTask = useStore((state) => state.completeTask);
  const addExperience = useStore((state) => state.addExperience);
  const showLevelUpModal = useStore((state) => state.showLevelUpModal);
  const setShowLevelUpModal = useStore((state) => state.setShowLevelUpModal);
  const notifyQuestSystem = useStore((state) => state.notifyQuestSystem);
  const level = useStore((state) => state.profile.level);
  const myActiveTasks = tasksCatalog.filter((t) => activeTaskIds.includes(t.id));

  useEffect(() => {
    if (feedItems && feedItems.length > 0) {
      setDisplayedItems(feedItems);
    }
  }, [feedItems]);

  const loadMoreItems = () => {
    if (isBatchLoading || isLoading) return;

    setIsBatchLoading(true);

    setTimeout(() => {
      setDisplayedItems((prev) => {
        const newBatch = feedItems.map((item) => ({
          ...item,
          id: `${item.id}-${prev.length}`
        }));

        return [...prev, ...newBatch];
      });
      setIsBatchLoading(false);
    }, 500);
  };

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
          title={t("Active Tasks")}
          rightIcon={<Icon name={"survey"} />}
          onRightPress={() => setQuestModalVisible(true)}
        />
        {myActiveTasks.length === 0 ? (
          <>
            <View style={{ marginBottom: Spacing.md }} />
            <AppText type="caption" bold style={{ alignSelf: "center" }}>
              {t("No Active Tasks")}
            </AppText>
            <View style={{ marginBottom: Spacing.lg }} />
          </>
        ) : (
          myActiveTasks.map((task) => (
            <View key={task.id}>
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
              <View style={{ marginBottom: Spacing.md }} />
            </View>
          ))
        )}
        <SectionHeader title={"Feed"} />
      </View>
    ),
    [isLoading, myActiveTasks, notifyQuestSystem, completeTask, addExperience, t]
  );

  const renderFooter = () =>
    isBatchLoading ? (
      <View style={{ marginTop: Spacing.md, paddingHorizontal: Spacing.sm }}>
        <ActivityIndicator size="large" color={MyTheme.primaryAccent} />
      </View>
    ) : (
      <View style={{ height: Spacing.xl }} />
    );

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false} withPaddingSides={false} withPaddingTop={false}>
      <FlatList
        data={isLoading ? SKELETON_ITEMS : displayedItems}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : item.id.toString())}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
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
      <LootGameModal />
      <LevelUpModal visible={showLevelUpModal} level={level} onTransitionEnd={() => setShowLevelUpModal(false)} />
    </ScreenWrapper>
  );
}
