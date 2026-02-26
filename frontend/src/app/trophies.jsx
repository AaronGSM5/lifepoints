import { View, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import TrophyCard from "@/components/trophies/TrophyCard";
import { useState } from "react";

const mockTrophies = [
  { id: 1, title: "Gym Rat", icon: "dumbbell", unlocked: false },
  { id: 2, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 3, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 4, title: "Reader", icon: "book", unlocked: true, justUnlocked: true },
  { id: 5, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 6, title: "Sleeper", icon: "bed", unlocked: false },
  { id: 7, title: "Gym Rat", icon: "dumbbell", unlocked: true, justUnlocked: true },
  { id: 8, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 9, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 10, title: "Reader", icon: "book", unlocked: false },
  { id: 11, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 12, title: "Sleeper", icon: "bed", unlocked: true, justUnlocked: true },
  { id: 13, title: "Gym Rat", icon: "dumbbell", unlocked: false },
  { id: 14, title: "Early Riser", icon: "sun", unlocked: true, justUnlocked: true },
  { id: 15, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 16, title: "Reader", icon: "book", unlocked: false },
  { id: 17, title: "Sugar Free", icon: "candy", unlocked: true, justUnlocked: true },
  { id: 18, title: "Sleeper", icon: "bed", unlocked: false },
  { id: 19, title: "Gym Rat", icon: "dumbbell", unlocked: true, justUnlocked: true },
  { id: 20, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 21, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 22, title: "Reader", icon: "book", unlocked: false },
  { id: 23, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 24, title: "Sleeper", icon: "bed", unlocked: false },
  { id: 25, title: "Gym Rat", icon: "dumbbell", unlocked: false },
  { id: 26, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 27, title: "Cyborg", icon: "robot", unlocked: true, justUnlocked: true },
  { id: 28, title: "Reader", icon: "book", unlocked: false },
  { id: 29, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 30, title: "Sleeper", icon: "bed", unlocked: false }
];

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
