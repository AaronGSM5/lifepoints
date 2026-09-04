import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import CommentSheet from "@/components/home/CommentSheet";
import FeedItem from "@/components/home/FeedItem";
import LootGameModal from "@/components/home/LootGameModal";
import PostOptionsSheet from "@/components/home/PostOptionsSheet";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import LevelUpModal from "@/components/LevelUpModal";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import HeroCarousel from "@/components/ui/HeroCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useHome } from "@/hooks/useHome";
import { HOME_HERO_DATA } from "@/mocks/HeroData";
import useStore from "@/store/useStore";

const SKELETON_ITEMS = [1, 2, 3];

export default function HomeScreen() {
  const { feedItems, isLoading, isRefreshing, refreshHomeData } = useHome();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [optionsPostData, setOptionsPostData] = useState(null);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isBatchLoading, setIsBatchLoading] = useState(false);
  const [visibleItemIds, setVisibleItemIds] = useState([]);
  const viewConfig = useMemo(() => ({ viewAreaCoveragePercentThreshold: 70 }), []);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const showLevelUpModal = useStore((state) => state.showLevelUpModal);
  const setShowLevelUpModal = useStore((state) => state.setShowLevelUpModal);
  const level = useStore((state) => state.profile.level);

  useEffect(() => {
    if (feedItems?.length > 0) {
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

  const renderHeader = useMemo(
    () => (
      <>
        <HeroCarousel data={HOME_HERO_DATA} isLoading={isLoading} onPressItem={() => console.log("Test")} />
        <SectionHeader title={"Feed"} style={styles.paddedContent} />
      </>
    ),
    [isLoading]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isItemVisible = item?.id ? visibleItemIds.includes(String(item.id)) : false;
      return (
        <FeedItem
          {...item}
          isLoading={isLoading}
          onOpenComments={(id) => setSelectedPostId(id)}
          onOpenOptions={(id, isOwner) => setOptionsPostData({ id, isOwner })}
          isReady={isItemVisible}
        />
      );
    },
    [isLoading, visibleItemIds]
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
      <LootGameModal />
      <LevelUpModal visible={showLevelUpModal} level={level} onTransitionEnd={() => setShowLevelUpModal(false)} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  paddedContent: {
    paddingHorizontal: Spacing.md
  },
  loadingFooter: {
    marginTop: Spacing.md
  },
  emptyFooter: {
    height: Spacing.xl
  }
});
