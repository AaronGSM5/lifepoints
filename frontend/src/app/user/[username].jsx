import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { Skeleton } from "moti/skeleton";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TrophyCard from "@/components/trophies/TrophyCard";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { publicProfiles } from "@/mocks/PublicProfile";

export default function PublicProfileScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { username, sourceId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const activePublicProfile = useMemo(
    () => publicProfiles.find((profile) => profile.username === username),
    [username]
  );

  const pinnedTrophies = useMemo(() => {
    if (!activePublicProfile?.pinnedTrophies) return [];

    return activePublicProfile.pinnedTrophies
      .map((trophy) => trophiesCatalog?.find((entry) => entry.id === trophy.id))
      .filter(Boolean);
  }, [activePublicProfile]);

  const skeletonProps = useMemo(
    () => ({
      colorMode: MyTheme.isDark ? "dark" : "light",
      transition: { type: "timing", duration: 1500 },
      show: isLoading
    }),
    [MyTheme.isDark, isLoading]
  );

  return (
    <ScreenWrapper scrollable>
      <ProfileHeader
        skeletonProps={skeletonProps}
        isLoading={isLoading}
        sourceId={sourceId}
        profileData={activePublicProfile}
      />
      <View style={styles.trophySection}>
        <View style={styles.pinnedGrid}>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <View key={i}>
                  <Skeleton {...skeletonProps} width={80} height={80} radius={Spacing.borderRadius.lg} />
                </View>
              ))
            : pinnedTrophies.map((selectedTrophy) => (
                <View key={selectedTrophy.id} style={styles.trophyWrapper}>
                  <TrophyCard id={selectedTrophy.id} title={selectedTrophy.title} icon={selectedTrophy.icon} unlocked />
                </View>
              ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    trophySection: {
      marginTop: Spacing.xl,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.xl
    },
    pinnedGrid: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    trophyWrapper: {
      width: 80
    }
  });
