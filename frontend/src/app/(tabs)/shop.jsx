import React, { useMemo } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { useRouter } from "expo-router";
import RewardCard from "@/components/shop/RewardCard";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import CategoryButtons from "@/components/ui/CategoryButtons";
import WalletCard from "@/components/shop/WalletCard";
import FeaturedRewardCard from "@/components/shop/FeaturedRewardCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useShop } from "@/hooks/useShop";

const SKELETON_REWARDS = Array.from({ length: 4 }).map((_, i) => ({ id: `sr-${i}`, isSkeleton: true }));

export default function ShopScreen() {
  const router = useRouter();
  const bottomPadding = useFloatingNavbarPadding();
  const { rewards, activeCat, setActiveCat, categories, isLoading, isRefreshing, refreshShop } = useShop();

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

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

        <SectionHeader title={"Featured Reward"} isLoading={isLoading} />
        <FeaturedRewardCard skeletonProps={skeletonProps} isLoading={isLoading} />

        <SectionHeader
          title={
            activeCat.toLowerCase() === "all"
              ? "For You"
              : `${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Rewards`
          }
          isLoading={isLoading}
        />
      </View>
    ),
    [activeCat, isLoading, categories]
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
        data={isLoading ? SKELETON_REWARDS : rewards}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        columnWrapperStyle={styles.rowGap}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        refreshing={isRefreshing}
        onRefresh={refreshShop}
        tintColor={MyTheme.primaryAccent}
        colors={[MyTheme.primaryAccent]}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <RewardCard
              isLoading={isLoading}
              image={item.image}
              brand={item.brand}
              title={item.title}
              points={item.points}
              icon={item.icon}
              isLocked={item.isLocked}
              onPress={() => router.push(`/reward/${item.id}`)}
            />
          </View>
        )}
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
