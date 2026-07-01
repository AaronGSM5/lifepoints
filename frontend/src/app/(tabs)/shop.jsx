import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useRouter } from "expo-router";
import RewardCard from "@/components/shop/RewardCard";
import CategoryButtons from "@/components/ui/CategoryButtons";
import FeaturedRewardCard from "@/components/shop/FeaturedRewardCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useShop } from "@/hooks/useShop";
import EmptyState from "@/components/shop/EmptyState";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";

const SKELETON_REWARDS = Array.from({ length: 4 }).map((_, i) => ({ id: `sr-${i}`, isSkeleton: true }));

export default function ShopScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
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
  const scrollY = useRef(new Animated.Value(0)).current;
  const isDarkMode = useStore((state) => state.isDarkMode);
  const userLevel = useStore((state) => state.profile.level);

  const skeletonProps = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  const renderHeader = useMemo(
    () => (
      <View>
        <View style={styles.featuredRewardCard}>
          <FeaturedRewardCard skeletonProps={skeletonProps} isLoading={isLoading} />
        </View>
        <CategoryButtons
          categories={categories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          skeletonProps={skeletonProps}
          isLoading={isLoading}
        />
        <View style={styles.paddedContent}>
          <SectionHeader
            title={
              activeCat.toLowerCase() === "all"
                ? t("For You")
                : `${t(`categories.${activeCat.toLowerCase()}`)} ${t("Rewards")}`
            }
            isLoading={isLoading}
          />
        </View>
      </View>
    ),
    [activeCat, isLoading, categories]
  );

  const renderEmptyState = () => (
    <View style={styles.paddedContent}>
      <EmptyState activeCat={activeCat} setActiveCat={setActiveCat} />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <AppLoadingSpinner />
      </View>
    );
  };

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
              skeletonProps={skeletonProps}
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
    rowGap: {
      gap: Spacing.md,
      marginBottom: Spacing.md,
      justifyContent: "space-between"
    },
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    footerLoader: {
      paddingVertical: Spacing.lg,
      alignItems: "center",
      justifyContent: "center"
    }
  });
