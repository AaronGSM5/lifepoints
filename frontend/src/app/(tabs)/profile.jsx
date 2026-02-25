import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Image, ScrollView, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { router, useFocusEffect } from "expo-router";
import TrophyCard from "@/components/trophies/TrophyCard";
import AppButton from "@/components/ui/AppButton";

export default function ProfileScreen() {
  const mockProfile = {
    backgroundImg: "",
    profileName: "Tomhtzx",
    profileClass: "Habit Hunter Class",
    profileRank: "Elite",
    profileLevel: 42,
    profileXp: 9020
  };

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
    }, [targetPercentage])
  );

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
      {/* Avatar Section */}
      <View style={styles.profileHeader}>
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

        {/* XP Bar */}
        <View style={styles.xpContainer}>
          <View style={styles.xpHeader}>
            <AppText bold type="caption">
              XP PROGRESS
            </AppText>
            <AppText bold type="caption" style={{ color: MyTheme.text }}>
              {mockProfile.profileXp} / {500 + mockProfile.profileLevel * 300}
            </AppText>
          </View>
          <View style={styles.progressBarBg}>
            {/* Wir nutzen Animated.View als Container für den Gradienten */}
            <Animated.View style={[styles.progressBarFillContainer, { width: widthInterpolation }]}>
              <LinearGradient
                // Alternate design in primary accent?
                colors={[MyTheme.primaryAccent, "#335399"]}
                // colors={['#8A2387', '#E94057', '#F27121']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <AppButton
            variant="primary"
            title={"Edit Profile"}
            icon={<MaterialCommunityIcons name="pencil" size={16} color={MyTheme.background} />}
            iconPosition="left"
            textStyle={{ color: MyTheme.background }}
            bgColor={MyTheme.primaryAccent}
          />

          <AppButton
            variant="primary"
            title={"Share Stats"}
            icon={<Ionicons name="share-social-outline" size={16} color={MyTheme.text} />}
            iconPosition="left"
            textStyle={{ color: MyTheme.text }}
            bgColor={"#2A2A2A"}
          />
        </View>
      </View>

      {/* Stats Section */}
      <View style={{ marginTop: Spacing.xl }}>
        <View style={styles.sectionHeader}>
          {/* Alternative design in primary accent */}
          <Ionicons name="stats-chart" size={18} color={MyTheme.primaryAccent} />
          {/* <Ionicons name="stats-chart" size={18} color={MyTheme.secondaryAccent} /> */}
          <AppText type="title">Your Stats</AppText>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="DAY STREAK" value="45" icon="fire" color="#FF5733" badge="Best: 52" />
          <StatCard label="TOTAL POINTS" value="12.4k" icon="gem" color="#007ec7" badge="Top 5%" />
          <StatCard label="BAD HABITS AVOIDED" value="120" icon="ban" color="#900C3F" blurred />
          <StatCard label="MEMBER SINCE" value="2023" icon="calendar" color="#581845" />
        </View>
      </View>

      {/* Trophies Section */}
      <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}>
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
            <FontAwesome5 name="trophy" size={18} color="#FFD700" />
            <AppText type="title">Trophies</AppText>
          </View>
          <AppButton
            variant="ghost"
            title={"See all"}
            size="sm"
            textStyle={{ color: "#FFD700" }}
            onPress={() => router.push("/trophies")}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.md }}>
          <TrophyCard title="Gym Rat" icon="dumbbell" />
          <TrophyCard title="Early Riser" icon="sun" unlocked />
          <TrophyCard title="Cyborg" icon="robot" />
          <TrophyCard title="Reader" icon="book" unlocked />
          <TrophyCard title="Sugar Free" icon="candy-cane" />
          <TrophyCard title="Sleeper" icon="bed" />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

// Sub components
const StatCard = ({ label, value, icon, color, badge, blurred }) => (
  <View style={styles.statCard}>
    <View style={styles.statTop}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
        <View style={styles.numberContainer}>
          <AppText type="h2">{value}</AppText>
          {blurred && (
            <BlurView
              intensity={22} // (0-100)
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          )}
        </View>

        {blurred && (
          <View style={styles.getMoreBadge}>
            <AppText type="caption" style={styles.getMoreText}>
              GET +
            </AppText>
          </View>
        )}
      </View>

      <FontAwesome5 name={icon} size={16} color={color} />
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
  }
});
