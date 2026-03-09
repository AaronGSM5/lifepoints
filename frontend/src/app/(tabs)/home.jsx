import { StyleSheet, View, Image, Animated, FlatList } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { useCallback, useEffect, useRef, useState } from "react";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { mockFeedItems } from "@/constants/MockData";
import FeedItem from "@/components/home/FeedItem";
import SuggestTaskInput from "@/components/tasks/SuggestTaskInput";
import LpChart from "@/components/home/LpChart";
import RecommendedTasks from "@/components/RecommendedTasks";
import { Skeleton } from "moti/skeleton";
import CommentSheet from "@/components/home/CommentSheet";

const SKELETON_FEED_ITEMS = Array.from({ length: 3 }).map((_, index) => ({
  id: `skeleton-${index}`,
  isSkeleton: true
}));

export default function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);

  if (shouldCrash) {
    throw new Error("Das ist ein provozierter Render-Crash!");
  }
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 1700,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Loading simulation
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
      <View style={styles.heroSection}>
        <Skeleton {...skeletonProps} width={"100%"} height={"100%"} radius={Spacing.borderRadius.lg}>
          <Image source={require("../../../public/assets/genImg.png")} style={styles.heroImage} resizeMode="cover" />
        </Skeleton>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText type="title">Active Tasks</AppText>
          {!isLoading && <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />}
        </View>

        <Skeleton {...skeletonProps} width="100%" radius={Spacing.borderRadius.lg}>
          <View style={styles.taskCardActive}>
            <View style={styles.taskIconContainer}>
              <Icon name="timer" size={20} color={MyTheme.primaryAccent} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText bold type="title">
                {isLoading ? " " : "Morning Vitality"}
              </AppText>
            </View>
            <View style={styles.lpContainer}>
              <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
                {isLoading ? " " : "1,500"}
              </AppText>
              <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
                {isLoading ? " " : "LP"}
              </AppText>
            </View>
            <AppButton
              size="sm"
              icon={<Icon name="checkmark" size={20} />}
              iconPosition="center"
              bgColor={MyTheme.primaryAccent}
              onPress={() => setShouldCrash(true)}
              disabled={isLoading}
            />
          </View>
        </Skeleton>
      </View>
      <View style={styles.sectionHeader}>
        <AppText type="title">Feed</AppText>
      </View>
    </View>
  );

  return (
    <ScreenWrapper scrollable={false} withPaddingBottom={false} withPaddingSides={false}>
      <FlatList
        data={isLoading ? SKELETON_FEED_ITEMS : mockFeedItems}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => {
          if (item.isSkeleton) {
            return (
              <View
                style={{
                  paddingBottom: Spacing.md,
                  backgroundColor: MyTheme.primary,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: MyTheme.separator
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm
                  }}
                >
                  {/* Picture */}
                  <Skeleton {...skeletonProps} radius="round" width={32} height={32} />

                  <View style={{ marginLeft: Spacing.sm, gap: 4 }}>
                    {/* Name */}
                    <Skeleton {...skeletonProps} width={120} height={12} />
                  </View>
                </View>

                {/* Content */}
                <Skeleton {...skeletonProps} width="100%" height={350} />
                <View
                  style={{
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm,
                    marginTop: Spacing.xs,
                    gap: Spacing.md
                  }}
                >
                  <View style={{ flexDirection: "row", gap: Spacing.lg }}>
                    <Skeleton {...skeletonProps} width={24} height={24} radius="round" />
                    <Skeleton {...skeletonProps} width={24} height={24} radius="round" />
                    <Skeleton {...skeletonProps} width={24} height={24} radius="round" />
                  </View>
                  {/* Text Platzhalter */}
                  <Skeleton {...skeletonProps} width={120} height={12} />
                  <Skeleton {...skeletonProps} width="80%" height={12} />
                </View>
              </View>
            );
          }
          return <FeedItem {...item} onOpenComments={(id) => setSelectedPostId(id)} />;
        }}
      />

      {/* <RecommendedTasks /> */}
      {/* <LpChart /> */}
      {/* <SuggestTaskInput /> */}
      <CommentSheet
        isVisible={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        postId={selectedPostId}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: Spacing.lg
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: Spacing.borderRadius.lg
  },
  section: {
    marginBottom: Spacing.lg
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  pulseDot: {
    width: Spacing.xs + 2,
    height: Spacing.xs + 2,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: MyTheme.primaryAccent,
    marginLeft: Spacing.sm
  },
  taskCardActive: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.25)"
  },
  taskIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(16, 185, 129, 0.16)",
    borderRadius: Spacing.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md
  },
  lpContainer: {
    flexDirection: "row",
    gap: Spacing.xs,
    marginRight: Spacing.md
  },
  listContent: {
    paddingBottom: Spacing.md
  }
});
