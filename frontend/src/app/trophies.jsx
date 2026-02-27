import { View, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import TrophyCard from "@/components/trophies/TrophyCard";
import { useState } from "react";
import { mockTrophies } from "@/constants/MockData";

export default function TrophiesScreen() {
  const [trophies, setTrophies] = useState(mockTrophies);
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
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable>
        <View style={styles.header}>
          <AppText type="h1">Trophies</AppText>
        </View>
        <View style={styles.trophiesContainer}>
          {trophies.map((trophy) => (
            <TrophyCard
              key={trophy.id}
              id={trophy.id}
              title={trophy.title}
              icon={trophy.icon}
              unlocked={trophy.unlocked}
              justUnlocked={trophy.justUnlocked}
              onAnimationComplete={handleAnimationFinished}
            />
          ))}
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  },
  trophiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: Spacing.lg
  }
});
