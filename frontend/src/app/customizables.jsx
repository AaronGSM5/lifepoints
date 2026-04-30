import React, { useState } from "react";
import { View, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import CustomizablesCard from "@/components/customizables/CustomizablesCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import AppText from "@/components/ui/AppText";
import useStore from "@/store/useStore";

const initialMockDatabase = {
  frames: [
    { id: "f0", name: "Standard", icon: "eyeOpen", color: "#ccc", unlocked: true, justUnlocked: false },
    { id: "f1", name: "Neon Glow", icon: "star", color: "#00E5FF", unlocked: true, justUnlocked: true },
    { id: "f2", name: "Solar Flare", icon: "sun", color: "#FF8E00", unlocked: false, justUnlocked: false },
    { id: "f3", name: "Neon Glow", icon: "star", color: "#00E5FF", unlocked: true, justUnlocked: true }
  ],
  titles: [
    { id: "t1", name: "Der Anfänger", icon: "trash", color: "#4C2F30", unlocked: true, justUnlocked: false },
    { id: "t2", name: "Eco-Held", icon: "bulb", color: "#4CAF50", unlocked: true, justUnlocked: true }
  ]
};

export default function CustomizablesScreen() {
  const [customizablesDb, setCustomizablesDb] = useState(initialMockDatabase);

  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();
  const containerWidth = Math.min(width, 480) - 32;
  const totalGapSpace = 32;
  const exactCardWidth = Math.floor((containerWidth - totalGapSpace) / 3);

  const profile = useStore((state) => state.profile);
  const activeFrame = profile?.activeFrame || "f0";
  const activeTitle = profile?.activeTitle || "t1";

  const checkIsActive = (categoryKey, itemId) => {
    if (categoryKey === "frames") return activeFrame === itemId;
    if (categoryKey === "titles") return activeTitle === itemId;
    return false;
  };

  const handleEquip = (categoryKey, itemId) => {
    console.log(`[Studio] Rüste ${itemId} aus Kategorie ${categoryKey} aus.`);
  };

  const handleAnimationFinished = (categoryKey, id) => {
    setCustomizablesDb((prevDb) => {
      const newDb = { ...prevDb };
      newDb[categoryKey] = newDb[categoryKey].map((item) => (item.id === id ? { ...item, justUnlocked: false } : item));
      return newDb;
    });
  };

  const categories = [
    { key: "frames", title: "Frames", data: customizablesDb.frames },
    { key: "titles", title: "Titel", data: customizablesDb.titles }
  ];

  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
      >
        <View style={styles.contentMaxWidth}>
          <ScreenTitle title={"Customizables"} />

          {categories.map((category) => (
            <View key={category.key} style={styles.categorySection}>
              <AppText type="h2" style={styles.categoryTitle}>
                {category.title}
              </AppText>

              <View style={styles.gridContainer}>
                {category.data.map((item) => {
                  const isActive = checkIsActive(category.key, item.id);

                  return (
                    <View key={item.id} style={{ width: exactCardWidth }}>
                      <CustomizablesCard
                        id={item.id}
                        name={item.name}
                        icon={item.icon}
                        color={item.color}
                        isActive={isActive}
                        unlocked={item.unlocked}
                        justUnlocked={item.justUnlocked}
                        onAnimationComplete={() => handleAnimationFinished(category.key, item.id)}
                        onPress={() => (item.unlocked ? handleEquip(category.key, item.id) : null)}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: "center",
    paddingTop: Spacing.lg
  },
  contentMaxWidth: {
    width: "100%",
    maxWidth: 480
  },
  categorySection: {
    marginBottom: Spacing.md
  },
  categoryTitle: {
    marginBottom: Spacing.md,
    color: "#afafaf"
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  }
});
