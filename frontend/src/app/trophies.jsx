import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import TrophyCard from "@/components/trophies/TrophyCard";
import { useState } from "react";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { useTranslation } from "react-i18next";

export default function TrophiesScreen() {
  const { t } = useTranslation("trophies");
  const [trophies, setTrophies] = useState(trophiesCatalog);
  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();

  const containerWidth = Math.min(width, 480) - 32;

  const totalGapSpace = 32;

  const exactCardWidth = Math.floor((containerWidth - totalGapSpace) / 3);

  const handleAnimationFinished = (id) => {
    const trophyIndex = trophiesCatalog.findIndex((trophy) => trophy.id === id);
    if (trophyIndex !== -1) {
      trophiesCatalog[trophyIndex].justUnlocked = false;
    }
    setTrophies((currentTrophies) =>
      currentTrophies.map((trophy) => (trophy.id === id ? { ...trophy, justUnlocked: false } : trophy))
    );
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <View style={styles.container}>
        <FlatList
          data={trophies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={[styles.flatListContent, { paddingBottom: bottomPadding }]}
          columnWrapperStyle={{ gap: 16, marginBottom: Spacing.lg }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ScreenTitle title={t("Trophies")} />}
          renderItem={({ item }) => (
            <View style={{ width: exactCardWidth }}>
              <TrophyCard
                id={item.id}
                title={item.title}
                icon={item.icon}
                unlocked={item.unlocked}
                justUnlocked={item.justUnlocked}
                onAnimationComplete={handleAnimationFinished}
                cardWidth={exactCardWidth}
              />
            </View>
          )}
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
