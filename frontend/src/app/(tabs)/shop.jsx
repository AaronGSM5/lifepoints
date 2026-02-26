import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useFocusEffect } from "expo-router";

export default function ShopScreen() {
  const [activeCat, setActiveCat] = useState("all");
  const categories = ["All", "Food", "Fashion", "Tech", "Beauty"];
  const mockCoupons = [
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
      brand: "ADIDAS",
      title: "15% Off Storewide",
      points: 450,
      icon: "shopping-bag",
      category: "fashion",
      isLocked: false
    },
    {
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400",
      brand: "STARBUCKS",
      title: "Free Tall Coffee",
      points: 300,
      icon: "coffee",
      category: "food",
      isLocked: false
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
      brand: "AMAZON",
      title: "$10 Gift Card",
      points: 2000,
      icon: "lock",
      category: "tech",
      isLocked: true
    },
    {
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400",
      brand: "NIKE",
      title: "20% Off Shoes",
      points: 800,
      icon: "shopping-bag",
      category: "fashion",
      isLocked: false
    }
  ];

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

  return (
    <ScreenWrapper scrollable>
      {/* Wallet Card */}
      <LinearGradient colors={[MyTheme.background, "#121212"]} style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <AppText bold type="caption" style={{ opacity: 0.9 }}>
            YOUR POINTS
          </AppText>
          <Ionicons name="wallet-outline" size={20} color={MyTheme.primaryAccent} />
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
          <TouchableOpacity key={index} onPress={() => setActiveCat(cat.toLowerCase())}>
            {cat.toLowerCase() === activeCat ? (
              <LinearGradient
                colors={[MyTheme.secondary, MyTheme.primary]}
                style={styles.activeTabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <AppText bold type="title" style={{ fontSize: 14 }}>
                  {cat}
                </AppText>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTab}>
                <AppText bold type="title" style={{ fontSize: 14, color: MyTheme.muted }}>
                  {cat}
                </AppText>
              </View>
            )}
          </TouchableOpacity>
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
            <FontAwesome5 name="music" size={20} color="#fff" />
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
              <TouchableOpacity style={styles.redeemButton}>
                <AppText bold type="title" style={styles.redeemText}>
                  Redeem
                </AppText>
              </TouchableOpacity>
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
      <View style={styles.gridContainer}>
        {mockCoupons.filter((c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase()).length >
        0 ? (
          mockCoupons
            .filter((c) => activeCat === "all" || c.category === activeCat)
            .map((c, index) => (
              <RewardCard
                key={c.id || index}
                image={c.image}
                brand={c.brand}
                title={c.title}
                points={c.points}
                icon={c.icon}
                isLocked={c.isLocked}
              />
            ))
        ) : (
          // Empty State
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Feather name="search" size={32} color={MyTheme.muted} />
            </View>
            <AppText bold type="title" style={{ color: MyTheme.text, marginBottom: Spacing.xs }}>
              No Rewards Found
            </AppText>
            <AppText type="caption" style={{ textAlign: "center", color: MyTheme.muted }}>
              We don't have any deals for "{activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}" right now.
            </AppText>

            <TouchableOpacity style={styles.resetButton} onPress={() => setActiveCat("all")}>
              <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
                Reset filter
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const RewardCard = ({ image, brand, title, points, icon, isLocked }) => (
  <View style={styles.gridCard}>
    <View style={styles.cardImageContainer}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      {/* Icon Overlay */}
      <View style={styles.cardIconBadge}>
        <Feather
          name={icon === "shopping-bag" ? "shopping-bag" : icon === "coffee" ? "coffee" : "gift"}
          size={14}
          color={MyTheme.text}
        />
      </View>
    </View>

    <View style={{ padding: Spacing.sm, gap: 2 }}>
      <AppText bold type="caption" style={styles.cardBrand}>
        {brand}
      </AppText>
      <AppText bold type="body" numberOfLines={2}>
        {title}
      </AppText>

      <View style={styles.cardFooter}>
        <AppText bold type="body" style={[{ fontSize: 14 }, isLocked && { color: MyTheme.muted }]}>
          {points} PTS
        </AppText>
        {isLocked ? (
          <View style={styles.lockedBadge}>
            <AppText bold type="caption" style={{ fontSize: 10 }}>
              Locked
            </AppText>
          </View>
        ) : (
          <TouchableOpacity style={styles.miniFab}>
            <MaterialCommunityIcons name="shopping-outline" size={14} color={MyTheme.primaryAccent} />
          </TouchableOpacity>
        )}
      </View>
    </View>

    {/* Locked Overlay */}
    {isLocked && <View style={styles.lockedOverlay} />}
  </View>
);

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
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: Spacing.md
  },
  gridCard: {
    flexGrow: 0,
    width: "47%",
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  cardImageContainer: {
    height: 100,
    backgroundColor: "#333"
  },
  cardImage: {
    width: "100%",
    height: "100%"
  },
  cardIconBadge: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 28,
    height: 28,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  cardBrand: {
    color: MyTheme.primaryAccent,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm
  },
  miniFab: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: MyTheme.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  lockedBadge: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.6)"
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
  },
  resetButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.primaryAccent,
    borderRadius: Spacing.borderRadius.full
  }
});
