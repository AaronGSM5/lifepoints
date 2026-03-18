import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { useRouter } from "expo-router";
import RewardCard from "@/components/shop/RewardCard";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { mockRewards } from "@/constants/MockData";
import { Skeleton } from "moti/skeleton";
import CategoryButtons from "@/components/ui/CategoryButtons";
import WalletCard from "@/components/shop/WalletCard";
import FeaturedRewardCard from "@/components/shop/FeaturedRewardCard";
import SectionHeader from "@/components/ui/SectionHeader";

const SKELETON_REWARDS = Array.from({ length: 4 }).map((_, i) => ({ id: `sr-${i}`, isSkeleton: true }));

export default function ShopScreen() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const bottomPadding = useFloatingNavbarPadding();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  const uniqueCategories = [...new Set(mockRewards.map((c) => c.category))];
  const categories = ["All", ...uniqueCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    // Loading simulation
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const filteredCoupons = mockRewards.filter(
    (c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase()
  );

  const renderHeader = useMemo(
    () => (
      <View>
        <WalletCard points={100} targetPoints={1000} skeletonProps={skeletonProps} isLoading={isLoading} />

        {isLoading && <View style={{ marginTop: Spacing.md }} />}
        <CategoryButtons
          categories={categories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          skeletonProps={skeletonProps}
          isLoading={isLoading}
        />

        <SectionHeader title={"Featured Reward"} />
        <FeaturedRewardCard skeletonProps={skeletonProps} isLoading={isLoading} />

        <SectionHeader
          title={
            activeCat.toLowerCase() === "all"
              ? "For You"
              : `${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Rewards`
          }
        />
      </View>
    ),
    [activeCat, isLoading]
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Icon name="search" size={32} color={MyTheme.muted} />
      </View>
      <AppText bold type="title" style={{ color: MyTheme.text, marginBottom: Spacing.xs }}>
        No Rewards Found
      </AppText>
      <AppText type="caption" style={{ textAlign: "center", color: MyTheme.muted }}>
        We don't have any deals for "{activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}" right now.
      </AppText>
      <View style={{ marginTop: Spacing.sm }}>
        <AppButton variant="outline" title={"Reset filter"} size="sm" onPress={() => setActiveCat("all")} />
      </View>
    </View>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <FlatList
        data={isLoading ? SKELETON_REWARDS : filteredCoupons}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        columnWrapperStyle={styles.rowGap}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        tintColor={MyTheme.primaryAccent}
        colors={[MyTheme.primaryAccent]}
        renderItem={({ item }) => {
          if (isLoading) {
            return (
              <View style={{ flex: 1 }}>
                <Skeleton {...skeletonProps} width="100%" height={200} radius={Spacing.borderRadius.lg}>
                  <View style={{ height: 200, width: "100%" }} />
                </Skeleton>
              </View>
            );
          }
          return (
            <View style={{ flex: 1 }}>
              <RewardCard
                image={item.image}
                brand={item.brand}
                title={item.title}
                points={item.points}
                icon={item.icon}
                isLocked={item.isLocked}
                onPress={() => router.push(`/reward/${item.id}`)}
                skeletonProps={skeletonProps}
                isLoading={isLoading}
              />
            </View>
          );
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  // Tabs
  tabsContainer: {
    marginBottom: Spacing.lg,
    marginHorizontal: -Spacing.lg
  },
  activeTabGradient: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  inactiveTab: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.06)"
  },
  // Grid
  rowGap: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
    justifyContent: "space-between"
  },
  emptyContainer: {
    width: "100%",
    paddingVertical: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm
  }
});
