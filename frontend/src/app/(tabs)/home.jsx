import { View, FlatList } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import { useCallback, useEffect, useState } from "react";
import { mockFeedItems } from "@/constants/MockData";
import FeedItem from "@/components/home/FeedItem";
import LpChart from "@/components/home/LpChart";
import CommentSheet from "@/components/home/CommentSheet";
import SectionHeader from "@/components/ui/SectionHeader";
import EventHero from "@/components/home/EventHero";
import ActiveTaskCard from "@/components/home/ActiveTaskCard";

const SKELETON_ITEMS = [1, 2, 3];

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [shouldCrash, setShouldCrash] = useState(false);
  const bottomPadding = useFloatingNavbarPadding();

  if (shouldCrash) {
    throw new Error("Das ist ein provozierter Render-Crash!");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  const renderHeader = () => (
    <View style={{ paddingHorizontal: Spacing.md }}>
      <EventHero imageSource={require("../../../public/assets/events/achtsamkeit2.png")} isLoading={isLoading} />
      <SectionHeader title={"Active Tasks"} />
      <ActiveTaskCard
        title={"Morning Vitality"}
        points={"500"}
        isLoading={isLoading}
        onAction={() => setShouldCrash(true)}
      />
      <View style={{ marginBottom: Spacing.lg }} />
      <SectionHeader title={"Feed"} />
    </View>
  );

  const renderFooter = () => (
    <View style={{ marginTop: Spacing.md, paddingHorizontal: Spacing.sm }}>
      <LpChart />
    </View>
  );
  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false} withPaddingSides={false}>
      <FlatList
        data={isLoading ? SKELETON_ITEMS : mockFeedItems}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : item.id.toString())}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        onRefresh={handleRefresh}
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
    </ScreenWrapper>
  );
}
