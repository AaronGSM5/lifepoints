import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import TrophyCard from "@/components/trophies/TrophyCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useMyProfile } from "@/hooks/useProfileQueries";
import useStore from "@/store/useStore";

export default function TrophiesScreen() {
  const { t } = useTranslation("trophies");
  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();
  const { data: profileData } = useMyProfile();
  const justUnlockedTrophies = useStore((state) => state.profile.justUnlockedTrophies || []);
  const clearJustUnlockedTrophy = useStore((state) => state.clearJustUnlockedTrophy);

  const containerWidth = Math.min(width, 480) - 32;
  const exactCardWidth = Math.floor((containerWidth - 32) / 3);

  const trophiesMap = useMemo(() => {
    return trophiesCatalog.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }, []);

  const handleAnimationFinished = (id) => {
    clearJustUnlockedTrophy(id);
  };

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.container}>
        <FlatList
          data={trophiesCatalog}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={[styles.flatListContent, { paddingBottom: bottomPadding }]}
          columnWrapperStyle={{ gap: 16, marginBottom: Spacing.lg }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ScreenTitle title={t("Trophies")} />}
          renderItem={({ item }) => {
            const catalogTrophy = trophiesMap[item.id];
            const userTrophy = profileData?.trophies?.find((t) => t.id === item.id);
            const isUnlocked = userTrophy?.unlocked || false;
            return (
              <View style={{ width: exactCardWidth }}>
                <TrophyCard
                  id={catalogTrophy?.id}
                  title={catalogTrophy?.title}
                  icon={catalogTrophy?.icon}
                  unlocked={isUnlocked}
                  justUnlocked={justUnlockedTrophies.includes(item.id)}
                  onAnimationComplete={() => handleAnimationFinished(item.id)}
                  cardWidth={exactCardWidth}
                />
              </View>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  flatListContent: {
    width: "100%",
    maxWidth: 480
  }
});
