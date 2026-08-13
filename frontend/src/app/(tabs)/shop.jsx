import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import FeaturedRewardCard from "@/components/shop/FeaturedRewardCard";
import RewardCard from "@/components/shop/RewardCard";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import CategoryButtons from "@/components/ui/CategoryButtons";
import EmptyView from "@/components/ui/EmptyView";
import SectionHeader from "@/components/ui/SectionHeader";
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
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const renderHeader = useMemo(() => {
    const forYouRewards = rewards ? rewards.slice(0, 5) : [];
    return (
      <View>
        <View style={styles.featuredRewardCard}>
          <FeaturedRewardCard isLoading={isLoading} />
        </View>
        <View style={styles.forYouSection}>
          <View style={styles.paddedContent}>
            <SectionHeader title={t("For You")} isLoading={isLoading} />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={isLoading ? SKELETON_REWARDS : forYouRewards}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : `fy-${index}`)}
            contentContainerStyle={styles.horizontalListContent}
            renderItem={({ item }) => (
              <View style={styles.horizontalCardWrapper}>
                <RewardCard
                  id={item.id}
                  isLoading={isLoading}
                  image={item.image}
                  brand={item.brand}
                  title={item.title}
                  points={item.points}
                  icon={item.icon}
                  isLocked={userLevel < (item.requiredLevel || 0)}
                  onPress={() => router.push(`/reward/${item.id}`)}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.categoriesSection}>
          <CategoryButtons
            categories={categories}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.paddedContent}>
          <SectionHeader
            title={`${t(`categories.${activeCat.toLowerCase()}`)} ${t("Rewards")}`}
            isLoading={isLoading}
          />
        </View>
      </View>
    );
  }, [activeCat, isLoading, categories, t, userLevel, rewards, setActiveCat, router, styles]);

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
        data={isLoading ? SKELETON_REWARDS : rewards}
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
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <RewardCard
              id={item.id}
              isLoading={isLoading}
              image={item.image}
              brand={item.brand}
              title={item.title}
              points={item.points}
              icon={item.icon}
              isLocked={userLevel < item.requiredLevel}
              onPress={() => router.push(`/reward/${item.id}`)}
            />
          </View>
        )}
      />
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    featuredRewardCard: {
      padding: Spacing.md
    },
    forYouSection: {
      marginBottom: Spacing.md
    },
    horizontalListContent: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      gap: Spacing.md
    },
    horizontalCardWrapper: {
      width: 240
    },
    categoriesSection: {
      marginTop: Spacing.sm
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
