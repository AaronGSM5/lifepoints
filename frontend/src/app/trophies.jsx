import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import TrophyCard from "@/components/trophies/TrophyCard";
import { useState } from "react";
import { mockTrophies } from "@/constants/MockData";

export default function TrophiesScreen() {
  const [trophies, setTrophies] = useState(mockTrophies);
  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();

  const containerWidth = Math.min(width, 480) - 32;

  const totalGapSpace = 32;

  const exactCardWidth = Math.floor((containerWidth - totalGapSpace) / 3);

  const handleAnimationFinished = (id) => {
    const trophyIndex = mockTrophies.findIndex((trophy) => trophy.id === id);
    if (trophyIndex !== -1) {
      mockTrophies[trophyIndex].justUnlocked = false;
    }
    setTrophies((currentTrophies) =>
      currentTrophies.map((trophy) => (trophy.id === id ? { ...trophy, justUnlocked: false } : trophy))
    );
  };

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.container}>
        <FlatList
          data={trophies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={[styles.flatListContent, { paddingBottom: bottomPadding }]}
          columnWrapperStyle={{ gap: 16, marginBottom: Spacing.lg }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <AppText type="h1">Trophies</AppText>
            </View>
          }
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
  },
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  }
});
