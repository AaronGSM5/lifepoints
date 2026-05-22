import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";
import TrophyCard from "@/components/trophies/TrophyCard";
import { Skeleton } from "moti/skeleton";
import { publicProfile } from "@/mocks/PublicProfile";
import useStore from "@/store/useStore";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";

export default function PublicProfileScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const { username } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonProps = {
    colorMode: isDarkMode ? "dark" : "light",
    transition: { type: "timing", duration: 1500 },
    show: isLoading
  };

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      <ProfileHeader skeletonProps={skeletonProps} isLoading={isLoading} />
      <View style={styles.trophySection}>
        <View style={styles.pinnedGrid}>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <View key={i}>
                  <Skeleton {...skeletonProps} width={80} height={80} radius={Spacing.borderRadius.lg} />
                </View>
              ))
            : publicProfile.pinnedTrophies.map((trophy) => {
                const selectedTrophy = trophiesCatalog.find((entry) => entry.id === trophy.id);
                return (
                  <View key={selectedTrophy.id} style={{ width: 80 }}>
                    <TrophyCard
                      id={selectedTrophy.id}
                      title={selectedTrophy.title}
                      icon={selectedTrophy.icon}
                      unlocked
                    />
                  </View>
                );
              })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    profileHeader: {
      alignItems: "center",
      paddingTop: Spacing.xl,
      paddingHorizontal: Spacing.lg
    },
    avatarContainer: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: theme.primaryAccent,
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    levelBadge: {
      position: "absolute",
      bottom: -Spacing.sm,
      alignSelf: "center",
      backgroundColor: theme.primaryAccent,
      paddingVertical: 2,
      borderWidth: 2,
      borderColor: theme.background
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
