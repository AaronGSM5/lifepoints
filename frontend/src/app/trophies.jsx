import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import { useMyProfile } from "@/api/profile/useMyProfile";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import TrophyGridItem from "@/components/trophies/TrophyGridItem";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import useStore from "@/store/useStore";

export default function TrophiesScreen() {
  const { t } = useTranslation("trophies");
  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();
  const { data: profileData } = useMyProfile();
  const trophies = profileData?.trophies;
  const justUnlockedTrophies = useStore((state) => state.profile.justUnlockedTrophies || []);
  const clearJustUnlockedTrophy = useStore((state) => state.clearJustUnlockedTrophy);

  const exactCardWidth = useMemo(() => {
    const containerWidth = Math.min(width, 480) - 32;
    return Math.floor((containerWidth - 32) / 3);
  }, [width]);

  const userTrophiesMap = useMemo(() => {
    if (!trophies) return {};
    return trophies.reduce((acc, t) => {
      acc[t.id] = t;
      return acc;
    }, {});
  }, [trophies]);

  const handleAnimationFinished = useCallback(
    (id) => {
      clearJustUnlockedTrophy(id);
    },
    [clearJustUnlockedTrophy]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TrophyGridItem
        item={item}
        userTrophy={userTrophiesMap[item.id]}
        isJustUnlocked={justUnlockedTrophies.includes(item.id)}
        onAnimationComplete={handleAnimationFinished}
        cardWidth={exactCardWidth}
      />
    ),
    [userTrophiesMap, justUnlockedTrophies, handleAnimationFinished, exactCardWidth]
  );

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.container}>
        <FlatList
          data={trophiesCatalog}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={[styles.flatListContent, { paddingBottom: bottomPadding }]}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ScreenTitle title={t("Trophies")} />}
          renderItem={renderItem}
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
  },
  columnWrapper: {
    gap: 16,
    marginBottom: Spacing.lg
  }
});
