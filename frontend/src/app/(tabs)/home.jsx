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

const SKELETON_ITEMS = [1, 2, 3];

export default function HomeScreen() {
  const { feedItems, quests, isLoading, isRefreshing, refreshHomeData } = useHome();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [questmodalVisible, setQuestModalVisible] = useState(false);
  const bottomPadding = useFloatingNavbarPadding();
  const isDarkMode = useStore((state) => state.isDarkMode);

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
        <ActiveTaskCard
          title={"Morning Vitality"}
          points={"500"}
          isLoading={isLoading}
          onAction={() => setShouldCrash(true)}
        />
        <View style={{ marginBottom: Spacing.lg }} />
        <SectionHeader title={"Feed"} />
      </View>
    ),
    [isLoading]
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
    </ScreenWrapper>
  );
}
