import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import FeaturedRewardCard from "@/components/shop/FeaturedRewardCard";
import RewardCard from "@/components/shop/RewardCard";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import CategoryButtons from "@/components/ui/CategoryButtons";
import EmptyView from "@/components/ui/EmptyView";
import HorizontalRail, { RAIL_CARD_WIDTH } from "@/components/ui/HorizontalRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { rewardsCatalog } from "@/constants/RewardsCatalog";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useShop } from "@/hooks/useShop";
import useStore from "@/store/useStore";

const SKELETON_REWARDS = Array.from({ length: 4 }).map((_, i) => ({ id: `sr-${i}`, isSkeleton: true }));

export default function ShopScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("shop");
  const router = useRouter();
  const {
    rewards,
    activeCat,
    setActiveCat,
    categories,
    isLoading,
    isRefreshing,
    refreshShop,
    fetchMore,
    isFetchingMore
  } = useShop();
  const userLevel = useStore((state) => state.profile.level);
  const userLp = useStore((state) => state.profile.profileLp);

  // "Für dich": freigeschaltete Rewards, günstigste zuerst. Im "Alle"-Grid werden sie nicht noch einmal gezeigt.
  const forYouRewards = useMemo(
    () =>
      rewardsCatalog
        .filter((reward) => userLevel >= (reward.requiredLevel || 0))
        .sort((a, b) => a.points - b.points)
        .slice(0, 5),
    [userLevel]
  );
  const gridRewards = useMemo(() => {
    if (activeCat !== "all") return rewards;
    const forYouIds = new Set(forYouRewards.map((reward) => reward.id));
    return rewards.filter((reward) => !forYouIds.has(reward.id));
  }, [activeCat, rewards, forYouRewards]);
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const handleRewardPress = useCallback(
    (item) => {
      router.push(`/reward/${item.id}`);
    },
    [router]
  );

  const renderRewardCard = useCallback(
    (item) => (
      <RewardCard
        id={item.id}
        isLoading={isLoading}
        image={item.image}
        brand={item.brand}
        title={item.title}
        points={item.points}
        icon={item.icon}
        requiredLevel={item.requiredLevel}
        userLp={userLp}
        isLocked={userLevel < (item.requiredLevel || 0)}
        onPress={() => handleRewardPress(item)}
      />
    ),
    [isLoading, userLp, userLevel, handleRewardPress]
  );

  const renderHeader = useMemo(() => {
    const translatedCat = t(`categories.${activeCat.toLowerCase()}`);
    return (
      <View>
        <View style={styles.featuredRewardCard}>
          <FeaturedRewardCard isLoading={isLoading} />
        </View>
        <HorizontalRail
          title={t("For You")}
          isLoading={isLoading}
          data={isLoading ? SKELETON_REWARDS : forYouRewards}
          itemWidth={RAIL_CARD_WIDTH}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : `fy-${index}`)}
          renderItem={({ item }) => renderRewardCard(item)}
        />
        <CategoryButtons
          categories={categories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          isLoading={isLoading}
        />
        <View style={styles.paddedContent}>
          <SectionHeader
            title={activeCat === "all" ? t("More rewards") : t("{{category}} rewards", { category: translatedCat })}
            isLoading={isLoading}
          />
        </View>
      </View>
    );
  }, [activeCat, isLoading, categories, t, forYouRewards, setActiveCat, renderRewardCard, styles]);

  const renderEmptyState = useCallback(() => {
    const translatedCat = t(`categories.${activeCat.toLowerCase()}`);
    return (
      <View style={styles.paddedContent}>
        <EmptyView
          icon="search"
          title={t("No Rewards Found")}
          description={t("We don't have any deals for", { category: translatedCat })}
          actionTitle={t("Reset filter")}
          onAction={() => setActiveCat("all")}
        />
      </View>
    );
  }, [activeCat, setActiveCat, styles.paddedContent, t]);

  const renderFooter = useCallback(() => {
    if (!isFetchingMore) return null;
    return <AppLoadingSpinner centered />;
  }, [isFetchingMore]);

  return (
    <ScreenWrapper scrollY={scrollY} scrollable={false} withPaddingSides={false} withPaddingTop={false}>
      <AnimatedScreenList
        scrollY={scrollY}
        data={isLoading ? SKELETON_REWARDS : gridRewards}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        numColumns={2}
        columnWrapperStyle={[styles.rowGap, styles.paddedContent]}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={isRefreshing}
        onRefresh={refreshShop}
        tintColor={MyTheme.primaryAccent}
        colors={[MyTheme.primaryAccent]}
        renderItem={({ item }) => <View style={styles.gridItem}>{renderRewardCard(item)}</View>}
      />
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    featuredRewardCard: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      marginBottom: Spacing.lg
    },
    gridItem: {
      flex: 1
    },
    rowGap: {
      gap: Spacing.md,
      marginBottom: Spacing.md,
      justifyContent: "space-between"
    },
    paddedContent: {
      paddingHorizontal: Spacing.md
    }
  });
