import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";
import TrophyCard from "@/components/trophies/TrophyCard";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { Skeleton } from "moti/skeleton";
import { mockPublicProfile, mockTrophies } from "@/constants/MockData";

export default function PublicProfileScreen() {
  const { username } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuliere einen Fetch der User-Daten
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonProps = {
    colorMode: "dark",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      {/* 1. Avatar & Info Section (Zentriert) */}
      <View style={styles.profileHeader}>
        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <Skeleton {...skeletonProps} radius="round" width={110} height={110} />
            <View style={{ height: Spacing.md }} />
            <Skeleton {...skeletonProps} width={180} height={28} />
            <View style={{ height: Spacing.xs }} />
            <Skeleton {...skeletonProps} width={220} height={16} />
            <View style={{ height: 4 }} />
            <Skeleton {...skeletonProps} width={180} height={16} />
          </View>
        ) : (
          <>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: "https://i.pravatar.cc/150?u=aaron" }} style={styles.avatar} />
              <View style={styles.levelBadge}>
                <AppText bold type="caption" style={{ color: MyTheme.text }}>
                  LVL {mockPublicProfile.profileLevel}
                </AppText>
              </View>
            </View>

            <AppText type="h1" style={{ marginBottom: Spacing.xs }}>
              {mockPublicProfile.profileName}
            </AppText>

            <AppText style={{ textAlign: "center" }}>{mockPublicProfile.profileBio}</AppText>

            <AppText type="caption" style={{ marginTop: Spacing.sm, color: MyTheme.muted }}>
              {mockPublicProfile.profileClass} •{" "}
              <AppText bold type="caption" style={{ color: MyTheme.gold }}>
                {mockPublicProfile.profileRank}
              </AppText>
            </AppText>
          </>
        )}
      </View>

      {/* 2. Actionbar (50/50 Split) */}
      <View style={styles.actionButtons}>
        {isLoading ? (
          <>
            <View style={{ flex: 1 }}>
              <Skeleton {...skeletonProps} width="100%" height={48} radius={Spacing.borderRadius.full} />
            </View>
            <View style={{ flex: 1 }}>
              <Skeleton {...skeletonProps} width="100%" height={48} radius={Spacing.borderRadius.full} />
            </View>
          </>
        ) : (
          <>
            <AppButton
              title="Add Friend"
              style={{ flex: 1 }}
              textStyle={{ color: MyTheme.background }}
              bgColor={MyTheme.primaryAccent}
              onPress={() => console.log("Friend Request sent")}
              icon={<Icon name="add" size={18} color={MyTheme.background} />}
            />
            <AppButton
              variant="outline"
              title="Message"
              style={{ flex: 1 }}
              onPress={() => console.log("Open Chat")}
              icon={<Icon name="chat" size={18} color={MyTheme.primaryAccent} />}
            />
          </>
        )}
      </View>

      <View style={styles.trophySection}>
        <View style={styles.pinnedGrid}>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <View key={i}>
                  <Skeleton {...skeletonProps} width={80} height={80} radius={Spacing.borderRadius.lg} />
                </View>
              ))
            : mockPublicProfile.pinnedTrophies.map((trophy) => (
                <View key={trophy.id} style={{ width: 80 }}>
                  <TrophyCard id={trophy.id} title={trophy.title} icon={trophy.icon} unlocked />
                </View>
              ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg
  },
  avatarContainer: {
    position: "relative",
    marginBottom: Spacing.md
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: MyTheme.secondary
  },
  levelBadge: {
    position: "absolute",
    bottom: -Spacing.sm,
    alignSelf: "center",
    backgroundColor: MyTheme.primaryAccent,
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 2,
    borderColor: MyTheme.background
  },
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg
  },
  trophySection: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl
  },
  pinnedGrid: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
