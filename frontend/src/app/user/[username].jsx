import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PublicRoutineCard from "@/components/tasks/PublicRoutineCard";
import TrophyCard from "@/components/trophies/TrophyCard";
import AppSkeleton from "@/components/ui/AppSkeleton";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { publicProfiles } from "@/mocks/PublicProfile";
import { getPublicRoutinesByAuthor } from "@/mocks/PublicRoutines";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

export default function PublicProfileScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const { username, sourceId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const routines = useStore((state) => state.routines);
  const adoptPublicRoutine = useStore((state) => state.adoptPublicRoutine);

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

  const authorRoutines = useMemo(() => getPublicRoutinesByAuthor(username), [username]);
  const adoptedIds = useMemo(
    () => new Set(routines.map((routine) => routine.source?.publicRoutineId).filter(Boolean)),
    [routines]
  );

  const handleAdopt = useCallback(
    (routine) => {
      adoptPublicRoutine(routine);
      triggerHaptic("success");
    },
    [adoptPublicRoutine]
  );

  return (
    <ScreenWrapper scrollable>
      <ProfileHeader isLoading={isLoading} isExternUser sourceId={sourceId} profileData={activePublicProfile} />
      {/* Showroom: bis zu 3 ausgewählte Trophäen, zentriert präsentiert */}
      {(isLoading || pinnedTrophies.length > 0) && (
        <View style={styles.trophyShowroom}>
          {isLoading
            ? [1, 2, 3].map((i) => <AppSkeleton key={i} width={80} height={80} radius={Spacing.borderRadius.lg} />)
            : pinnedTrophies.map((selectedTrophy) => (
                <View key={selectedTrophy.id} style={styles.trophyWrapper}>
                  <TrophyCard id={selectedTrophy.id} title={selectedTrophy.title} icon={selectedTrophy.icon} unlocked />
                </View>
              ))}
        </View>
      )}

      {!isLoading && authorRoutines.length > 0 && (
        <View style={[styles.routinesSection, !pinnedTrophies.length && styles.routinesSectionStandalone]}>
          <SectionHeader title={t("Routines")} />
          <View style={styles.routinesList}>
            {authorRoutines.map((routine) => (
              <PublicRoutineCard
                key={routine.id}
                routine={routine}
                showAuthor={false}
                isAdopted={adoptedIds.has(routine.id)}
                onAdopt={() => handleAdopt(routine)}
              />
            ))}
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    // Gleiche Sektionsabstände wie im eigenen Profil (xl)
    trophyShowroom: {
      flexDirection: "row",
      justifyContent: "center",
      gap: Spacing.lg,
      marginTop: Spacing.xl,
      marginBottom: Spacing.xl
    },
    trophyWrapper: {
      width: 80
    },
    routinesSection: {
      marginBottom: Spacing.xl
    },
    // Ohne Trophy-Sektion fehlt sonst der Abstand zum ProfileHeader
    routinesSectionStandalone: {
      marginTop: Spacing.xl
    },
    routinesList: {
      gap: Spacing.md
    }
  });
