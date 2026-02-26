import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Animated, Easing, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useFocusEffect } from "expo-router";
import RewardCard from "@/components/shop/RewardCard";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";

export default function ShopScreen() {
  const [activeCat, setActiveCat] = useState("all");
  const mockCoupons = [
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
      brand: "ADIDAS",
      title: "15% Off Storewide",
      points: 450,
      icon: "shoppingCat",
      category: "fashion",
      isLocked: false
    },
    {
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400",
      brand: "STARBUCKS",
      title: "Free Tall Coffee",
      points: 300,
      icon: "coffeeCat",
      category: "food",
      isLocked: false
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
      brand: "AMAZON",
      title: "$10 Gift Card",
      points: 2000,
      icon: "techCat",
      category: "tech",
      isLocked: true
    },
    {
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400",
      brand: "NIKE",
      title: "20% Off Shoes",
      points: 800,
      icon: "shoppingCat",
      category: "fashion",
      isLocked: false
    }
  ];
  const uniqueCategories = [...new Set(mockCoupons.map((c) => c.category))];
  const categories = ["All", ...uniqueCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];

  // 1. Animations-Wert (0 bis 60 für 60%)
  const animatedWalletProgress = useRef(new Animated.Value(0)).current;
  const walletWidth = animatedWalletProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"]
  });

  useFocusEffect(
    useCallback(() => {
      animatedWalletProgress.setValue(0); // Reset

      Animated.timing(animatedWalletProgress, {
        toValue: 60,
        duration: 1500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false
      }).start();
    }, [])
  );

  const filteredCoupons = mockCoupons.filter(
    (c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase()
  );

  const renderHeader = useMemo(
    () => (
      <View>
        {/* Wallet Card */}
        <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <AppText bold type="caption" style={{ opacity: 0.9 }}>
              YOUR POINTS
            </AppText>
            <Icon name="wallet" size={22} color={MyTheme.primaryAccent} />
          </View>

          <View style={styles.pointsRow}>
            <AppText type="h1">1.250</AppText>
            <AppText type="title" style={styles.pointsLabel}>
              LP
            </AppText>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <Animated.View
                style={[styles.progressBarFill, { width: walletWidth, backgroundColor: MyTheme.primaryAccent }]}
              />
            </View>
            <AppText type="caption">750 pts until Gold Tier</AppText>
          </View>
        </LinearGradient>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: Spacing.sm }}
        >
          {categories.map((cat, index) => (
            <AppButton
              key={index}
              title={cat}
              variant={cat.toLowerCase() === activeCat ? "primary" : "secondary"}
              size="md"
              onPress={() => setActiveCat(cat.toLowerCase())}
            />
          ))}
        </ScrollView>

        {/* Featured Reward */}
        <View style={{ marginBottom: Spacing.md }}>
          <AppText type="title">Featured Reward</AppText>
        </View>

        <View style={styles.featuredWrapper}>
          <LinearGradient
            colors={["#8A2387", "#E94057", "#F27121"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredIconContainer}>
              <Icon name="music" size={20} />
            </View>

            <View style={styles.featuredContent}>
              <View style={styles.bestValueBadge}>
                <AppText bold type="caption" style={{ color: "#00FF7F" }}>
                  BEST VALUE
                </AppText>
              </View>

              <AppText type="h2">Free Month Premium</AppText>
              <AppText type="caption" style={styles.featuredSubtitle}>
                Spotify Individual Plan
              </AppText>

              <View style={styles.featuredFooter}>
                <View>
                  <AppText type="caption" style={{ textDecorationLine: "line-through" }}>
                    2.500 PTS
                  </AppText>
                  <AppText type="title">2.000 PTS</AppText>
                </View>
                <AppButton
                  variant="primary"
                  title={"Redeem"}
                  size="md"
                  textStyle={{ color: "#E94057" }}
                  bgColor="white"
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 'For You' Grid */}
        <AppText type="title" style={{ marginTop: Spacing.lg, marginBottom: Spacing.md }}>
          {activeCat.toLowerCase() === "all"
            ? "For You"
            : `${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)} Rewards`}
        </AppText>
      </View>
    ),
    [activeCat, walletWidth]
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
        data={filteredCoupons}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        numColumns={2} // 🔥 Die Magie! FlatList macht das Grid automatisch
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.xl }}
        // Das Styling ZWISCHEN den Spalten
        columnWrapperStyle={styles.rowGap}
        // Fügt unseren ganzen oberen Bereich ein
        ListHeaderComponent={renderHeader}
        // Fügt unseren Empty State ein
        ListEmptyComponent={renderEmptyState}
        // Rendert die einzelnen Karten
        renderItem={({ item }) => (
          <RewardCard
            image={item.image}
            brand={item.brand}
            title={item.title}
            points={item.points}
            icon={item.icon}
            isLocked={item.isLocked}
          />
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  // Wallet Card
  walletCard: {
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary,
    marginVertical: Spacing.md
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.md
  },
  pointsLabel: {
    color: MyTheme.primaryAccent,
    marginLeft: Spacing.xs
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: Spacing.borderRadius.full,
    marginBottom: Spacing.xs,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    borderRadius: Spacing.borderRadius.full
  },
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
  featuredWrapper: {
    borderRadius: Spacing.borderRadius.lg,
    shadowColor: "#E94057",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 10
  },
  featuredCard: {
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    minHeight: 240,
    justifyContent: "space-between",
    overflow: "hidden"
  },
  featuredIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: Spacing.borderRadius.sm,
    justifyContent: "center",
    alignItems: "center"
  },
  featuredContent: {
    marginTop: Spacing.md,
    gap: Spacing.xs
  },
  bestValueBadge: {
    backgroundColor: "rgba(0, 255, 127, 0.2)",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: "flex-start",
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 127, 0.8)"
  },
  featuredSubtitle: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.md
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  redeemButton: {
    backgroundColor: MyTheme.text,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.borderRadius.full
  },
  redeemText: {
    color: "#E94057",
    fontSize: 14
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
