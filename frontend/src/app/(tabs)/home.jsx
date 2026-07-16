import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, View } from "react-native";

import ActiveTaskCard from "@/components/home/ActiveTaskCard";
import CommentSheet from "@/components/home/CommentSheet";
import FeedItem from "@/components/home/FeedItem";
import HeroCarousel from "@/components/home/HeroCarousel";
import LootGameModal from "@/components/home/LootGameModal";
import PostOptionsSheet from "@/components/home/PostOptionsSheet";
import QuestModal from "@/components/home/QuestModal";
import { Icon } from "@/components/icons/Icon";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import LevelUpModal from "@/components/LevelUpModal";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import AppText from "@/components/ui/AppText";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useHome } from "@/hooks/useHome";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

const SKELETON_ITEMS = [1, 2, 3];

const HOME_HERO_DATA = [
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

export default function HomeScreen() {
  const { feedItems, quests, isLoading, isRefreshing, refreshHomeData } = useHome();
  const MyTheme = useAppTheme();
  const { t } = useTranslation("home");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [optionsPostData, setOptionsPostData] = useState(null);
  const [questmodalVisible, setQuestModalVisible] = useState(false);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isBatchLoading, setIsBatchLoading] = useState(false);
  const [visibleItemIds, setVisibleItemIds] = useState([]);
  const viewConfig = useMemo(() => ({ viewAreaCoveragePercentThreshold: 70 }), []);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const activeTaskIds = useStore((state) => state.activeTaskIds);
  const completeTask = useStore((state) => state.completeTask);
  const addExperience = useStore((state) => state.addExperience);
  const showLevelUpModal = useStore((state) => state.showLevelUpModal);
  const setShowLevelUpModal = useStore((state) => state.setShowLevelUpModal);
  const notifyQuestSystem = useStore((state) => state.notifyQuestSystem);
  const level = useStore((state) => state.profile.level);
  const myActiveTasks = useMemo(() => tasksCatalog.filter((t) => activeTaskIds.includes(t.id)), [activeTaskIds]);

  useEffect(() => {
    if (feedItems?.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedItems(feedItems);
    }
  }, [feedItems]);

  const loadMoreItems = useCallback(() => {
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
  }, [isBatchLoading, isLoading, feedItems]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setVisibleItemIds((prev) => {
      const newIds = viewableItems.map((vItem) => String(vItem.key));
      if (prev.length === newIds.length && prev.every((val, index) => val === newIds[index])) {
        return prev;
      }
      return newIds;
    });
  }, []);

  const skeletonProps = useMemo(
    () => ({
      colorMode: MyTheme.isDark ? "dark" : "light",
      transition: { type: "timing", duration: 1500 },
      show: isLoading
    }),
    [MyTheme.isDark, isLoading]
  );

  const renderHeader = useMemo(
    () => (
      <>
        <HeroCarousel data={HOME_HERO_DATA} isLoading={isLoading} onPressItem={() => console.log("Test")} />
        <View style={styles.headerContainer}>
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
          <SectionHeader title={"Feed"} />
        </View>
      </>
    ),
    [isLoading, myActiveTasks, notifyQuestSystem, completeTask, addExperience, t]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isItemVisible = item?.id ? visibleItemIds.includes(String(item.id)) : false;
      return (
        <FeedItem
          {...item}
          isLoading={isLoading}
          skeletonProps={skeletonProps}
          onOpenComments={(id) => setSelectedPostId(id)}
          onOpenOptions={(id, isOwner) => setOptionsPostData({ id, isOwner })}
          isReady={isItemVisible}
        />
      );
    },
    [isLoading, skeletonProps, visibleItemIds]
  );

  const renderFooter = useCallback(
    () =>
      isBatchLoading ? (
        <View style={styles.loadingFooter}>
          <AppLoadingSpinner centered />
        </View>
      ) : (
        <View style={styles.emptyFooter} />
      ),
    [isBatchLoading]
  );

  return (
    <ScreenWrapper
      scrollY={scrollY}
      scrollable={false}
      withPaddingBottom={false}
      withPaddingSides={false}
      withPaddingTop={false}
    >
      <AnimatedScreenList
        scrollY={scrollY}
        data={isLoading ? SKELETON_ITEMS : displayedItems}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : String(item.id))}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        onRefresh={refreshHomeData}
        refreshing={isRefreshing}
        renderItem={renderItem}
      />
      <CommentSheet
        isVisible={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        postId={selectedPostId}
      />
      <PostOptionsSheet
        isVisible={optionsPostData !== null}
        onClose={() => setOptionsPostData(null)}
        postId={optionsPostData?.id}
        isOwner={optionsPostData?.isOwner}
      />
      <QuestModal visible={questmodalVisible} onClose={() => setQuestModalVisible(false)} mockQuests={quests} />
      <LootGameModal />
      <LevelUpModal visible={showLevelUpModal} level={level} onTransitionEnd={() => setShowLevelUpModal(false)} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
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
  loadingFooter: {
    marginTop: Spacing.md
  },
  emptyFooter: {
    height: Spacing.xl
  }
});
