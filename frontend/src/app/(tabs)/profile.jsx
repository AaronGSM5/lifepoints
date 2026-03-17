import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, ScrollView, Animated, Easing, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { router, useFocusEffect } from "expo-router";
import TrophyCard from "@/components/trophies/TrophyCard";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { mockActivities, mockProfile, mockTrophies, mockTutorialSteps } from "@/constants/MockData";
import { Skeleton } from "moti/skeleton";
import JournalPreview from "@/components/journal/JournalPreview";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorialSteps, setTutorialSteps] = useState(mockTutorialSteps);
  const completedCount = tutorialSteps.filter((q) => q.completed).length;
  const progress = completedCount / tutorialSteps.length;
  // // 1. Der Startwert der Animation (0%)
  const animatedWidth = useRef(new Animated.Value(0)).current;
  // // 2. Berechnung des Zielwerts (Prozentsatz)
  const targetPercentage = (mockProfile.profileXp / (500 + mockProfile.profileLevel * 300)) * 100;

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"]
  });

  // Animation: jedes Mal, wenn der Tab aktiv wird
  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        animatedWidth.setValue(0);
        return;
      }
      animatedWidth.setValue(0);
      const animation = Animated.timing(animatedWidth, {
        toValue: targetPercentage,
        duration: 1800,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        // easing: Easing.out(Easing.quad),
        useNativeDriver: false
      });

      const timer = setTimeout(() => {
        animation.start();
      }, 150); // small delay

      return () => {
        // cleanup
        animation.stop();
        clearTimeout(timer);
      };
    }, [targetPercentage, isLoading])
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  // Alternative Animation: nur beim ersten Laden
  // useEffect(() => {
  //   // 3. Startet die Animation, sobald die Seite lädt
  //   Animated.timing(animatedWidth, {
  //     toValue: targetPercentage,
  //     duration: 2000,             // 2 Sekunden für ein sattes Gefühl
  //     easing: Easing.out(Easing.exp), // Startet schnell, bremst sanft ab
  //     useNativeDriver: false,     // Breite kann nicht nativ animiert werden
  //   }).start();
  // }, [targetPercentage]);

  return (
    <ScreenWrapper scrollable>
      {/* Header Section */}
      <View style={styles.profileHeader}>
        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <Skeleton {...skeletonProps} radius="round" width={100} height={100} />
            <View style={{ height: Spacing.md }} />
            <Skeleton {...skeletonProps} width={180} height={24} />
            <View style={{ height: Spacing.xs }} />
            <Skeleton {...skeletonProps} width={120} height={14} />
          </View>
        ) : (
          <>
            <View style={styles.avatarContainer}>
              <Image source={require("@/../public/assets/icon-profile.png")} style={styles.avatar} />
              <View style={styles.levelBadge}>
                <AppText bold type="caption" style={{ color: MyTheme.text }}>
                  LVL {mockProfile.profileLevel}
                </AppText>
              </View>
            </View>
            <AppText type="h1">{mockProfile.profileName}</AppText>
            <AppText type="caption" style={{ marginTop: Spacing.xs }}>
              {mockProfile.profileClass} •{" "}
              <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
                {mockProfile.profileRank}
              </AppText>
            </AppText>
          </>
        )}

        <View style={styles.xpContainer}>
          <View style={styles.xpHeader}>
            <AppText bold type="caption">
              XP PROGRESS
            </AppText>
            {isLoading ? (
              <Skeleton {...skeletonProps} width={60} height={12} />
            ) : (
              <AppText bold type="caption" style={{ color: MyTheme.text }}>
                {mockProfile.profileXp} / {500 + mockProfile.profileLevel * 300}
              </AppText>
            )}
          </View>

          <View style={styles.progressBarBg}>
            {/* Wir nutzen Animated.View als Container für den Gradienten */}
            {isLoading ? (
              <Skeleton {...skeletonProps} width="100%" height={8} />
            ) : (
              <Animated.View style={[styles.progressBarFillContainer, { width: widthInterpolation }]}>
                <LinearGradient
                  colors={[MyTheme.primaryAccent, "#335399"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            )}
          </View>
        </View>

        <View style={styles.actionButtons}>
          {isLoading ? (
            <>
              {/* Skeleton Edit Profile */}
              <Skeleton {...skeletonProps} width={130} height={44} radius={Spacing.borderRadius.full} />
              {/* Skeleton Share Stats */}
              <Skeleton {...skeletonProps} width={130} height={44} radius={Spacing.borderRadius.full} />
            </>
          ) : (
            <>
              <AppButton
                variant="primary"
                title={"Edit Profile"}
                icon={<Icon name="pencil" size={16} color={MyTheme.background} />}
                iconPosition="left"
                textStyle={{ color: MyTheme.background }}
                bgColor={MyTheme.primaryAccent}
                onPress={() => router.push("/setting/edit-profile")}
              />

              <AppButton
                variant="primary"
                title={"Share Stats"}
                icon={<Icon name="share" size={16} color={MyTheme.text} />}
                iconPosition="left"
                textStyle={{ color: MyTheme.text }}
                bgColor={"#2A2A2A"}
              />
            </>
          )}
        </View>
      </View>
      {isLoading ? (
        /* 1. DAS SKELETON (Nutzt deine globalen <Skeleton /> Tags) */
        <View style={styles.guideContainer}>
          {/* Header Skeleton */}
          <View style={styles.guideHeader}>
            <Skeleton width={140} height={28} borderRadius={6} />
            <Skeleton width={80} height={16} borderRadius={4} />
          </View>

          {/* Progress Bar Skeleton */}
          <View style={{ marginBottom: Spacing.lg }}>
            <Skeleton width="100%" height={8} borderRadius={4} />
          </View>

          {/* Quest Liste Skeleton */}
          <View style={styles.questList}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.questItem}>
                {/* Icon Skeleton (Rund) */}
                <View style={styles.questIconContainer}>
                  <Skeleton width={28} height={28} borderRadius={14} />
                </View>

                {/* Text Skeleton */}
                <View style={styles.questTextContainer}>
                  <View style={{ marginBottom: 6 }}>
                    <Skeleton width="60%" height={18} borderRadius={4} />
                  </View>
                  <Skeleton width="30%" height={14} borderRadius={4} />
                </View>

                {/* Arrow Skeleton */}
                <Skeleton width={16} height={16} borderRadius={4} />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.guideContainer}>
          <View style={styles.guideHeader}>
            <AppText type="h2">Dein Leitfaden</AppText>
            <AppText type="caption">
              {completedCount} von {tutorialSteps.length} erledigt
            </AppText>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressInner, { width: `${progress * 100}%` }]} />
          </View>

          <View style={styles.questList}>
            {tutorialSteps.map((quest) => (
              <Pressable
                key={quest.id}
                style={[styles.questItem, quest.completed && styles.questItemCompleted]}
                onPress={() => {
                  if (!quest.completed && quest.route) {
                    router.push(quest.route);
                  } else {
                    return;
                  }
                }}
              >
                <View style={styles.questIconContainer}>
                  <Icon
                    name={quest.completed ? "checkmark" : quest.icon}
                    color={quest.completed ? MyTheme.primaryAccent : "gray"}
                  />
                </View>

                <View style={styles.questTextContainer}>
                  <AppText type="body" style={[styles.questTitle, quest.completed && styles.textStrikeThrough]}>
                    {quest.title}
                  </AppText>
                  <AppText type="caption" bold style={styles.rewardText}>
                    +{quest.reward} LP
                  </AppText>
                </View>

                {!quest.completed && <Icon name="right" />}
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Stats Section */}
      <View style={{ marginTop: Spacing.xl }}>
        <View style={styles.sectionHeader}>
          <Icon name="statsChart" size={20} color={MyTheme.primaryAccent} outline={false} />
          <AppText type="title">Your Stats</AppText>
        </View>

        <View style={styles.statsGrid}>
          {isLoading ? (
            <>
              <StatCardSkeleton skBase={skeletonProps} />
              <StatCardSkeleton skBase={skeletonProps} />
              <StatCardSkeleton skBase={skeletonProps} />
              <StatCardSkeleton skBase={skeletonProps} />
            </>
          ) : (
            <>
              <StatCard label="DAY STREAK" value="45" icon="fire" color="#FF5733" badge="Best: 52" />
              <StatCard label="TOTAL POINTS" value="12.4k" icon="gem" color="#007ec7" badge="Top 5%" />
              <StatCard label="BAD HABITS AVOIDED" value="120" icon="ban" color="#900C3F" blurred />
              <StatCard label="MEMBER SINCE" value="2023" icon="calendar" color="#581845" />
            </>
          )}
        </View>
      </View>

      {/* Trophies Section */}
      <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
            <Icon name="trophy" size={20} color={MyTheme.gold} outline={false} />
            <AppText type="title">Trophies</AppText>
          </View>
          <AppButton
            variant="ghost"
            title={"See all"}
            size="sm"
            textStyle={{ color: MyTheme.gold }}
            onPress={() => router.push("/trophies")}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.md }}>
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <Skeleton key={i} {...skeletonProps} width={80} height={80} radius={Spacing.borderRadius.lg} />
              ))
            : mockTrophies.map((t, i) => (
                <View key={i} style={{ width: 80 }}>
                  <TrophyCard key={i} id={t.id} title={t.title} icon={t.icon} unlocked={t.unlocked} />
                </View>
              ))}
        </ScrollView>
      </View>
      <View>
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
            <Icon name="journal" size={20} />
            <AppText type="title">My Impact Journal</AppText>
          </View>
          <AppButton
            variant="ghost"
            title={"More"}
            size="sm"
            textStyle={{ color: MyTheme.primaryAccent }}
            onPress={() => router.push("/journal")}
          />
        </View>
        <JournalPreview activities={mockActivities} />
      </View>
    </ScreenWrapper>
  );
}

const StatCardSkeleton = ({ skeletonProps }) => (
  <View style={[styles.statCard, { borderColor: MyTheme.secondary }]}>
    <View style={styles.statTop}>
      <Skeleton {...skeletonProps} width={50} height={20} />
      <Skeleton {...skeletonProps} width={16} height={16} radius={4} />
    </View>
    <View style={{ height: Spacing.sm }} />
    <Skeleton {...skeletonProps} width={80} height={10} />
  </View>
);

// Sub components
const StatCard = ({ label, value, icon, color, badge, blurred }) => (
  <View style={styles.statCard}>
    <View style={styles.statTop}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
        <View style={styles.numberContainer}>
          <AppText type="h2">{value}</AppText>
          {blurred && <BlurView intensity={22} tint="dark" style={StyleSheet.absoluteFill} />}
        </View>

        {blurred && (
          <View style={styles.getMoreBadge}>
            <AppText type="caption" style={styles.getMoreText}>
              GET +
            </AppText>
          </View>
        )}
      </View>

      <Icon name={icon} size={16} color={color} />
    </View>

    <AppText type="caption" style={{ marginTop: Spacing.xs }}>
      {label}
    </AppText>

    {badge && (
      <View style={styles.statBadge}>
        <AppText bold type="caption" style={{ fontSize: 10, color: MyTheme.text }}>
          {badge}
        </AppText>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  // Profile Header Styles
  profileHeader: {
    alignItems: "center",
    paddingTop: Spacing.lg
  },
  avatarContainer: {
    position: "relative",
    marginBottom: Spacing.md
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: MyTheme.secondary
  },
  levelBadge: {
    position: "absolute",
    bottom: -Spacing.sm,
    alignSelf: "center",
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 2,
    borderColor: MyTheme.background
  },
  // XP Styles
  xpContainer: {
    width: "100%",
    marginTop: Spacing.lg
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: Spacing.borderRadius.full,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#333"
  },
  progressBarFillContainer: {
    height: "100%",
    borderRadius: Spacing.borderRadius.full,
    overflow: "hidden" // Hält den Gradienten in Form
  },
  // Buttons
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg
  },
  // Sections Common
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: Spacing.sm
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md
  },
  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md
  },
  statCard: {
    width: "47%", // Knapp unter 50% für 2 Spalten
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  numberContainer: {
    overflow: "hidden",
    borderRadius: 4
  },
  statBadge: {
    backgroundColor: MyTheme.primaryAccent,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.borderRadius.sm,
    alignSelf: "flex-start"
  },
  getMoreBadge: {
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: Spacing.borderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    marginLeft: Spacing.sm
  },
  getMoreText: {
    color: "gold",
    fontSize: 12
  },
  // Neww
  guideContainer: {
    marginTop: Spacing.xl,
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  guideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: Spacing.lg
  },
  progressBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginBottom: Spacing.lg,
    overflow: "hidden"
  },
  progressInner: {
    height: "100%",
    backgroundColor: MyTheme.primaryAccent
  },
  questList: {
    gap: Spacing.sm
  },
  questItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm
  },
  questItemCompleted: {
    opacity: 0.6
  },
  questIconContainer: {
    width: 40,
    alignItems: "center"
  },
  questTextContainer: {
    flex: 1,
    marginLeft: Spacing.sm
  },
  questTitle: {
    fontSize: 16
  },
  textStrikeThrough: {
    textDecorationLine: "line-through",
    color: MyTheme.muted
  },
  rewardText: {
    color: MyTheme.primaryAccent
  }
});
