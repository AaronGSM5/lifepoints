import React, { useState } from "react";
import { View, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import CustomizablesCard from "@/components/customizables/CustomizablesCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import AppText from "@/components/ui/AppText";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { mockCustomizables } from "@/mocks/Customizables";

export default function CustomizablesScreen() {
  const { t } = useTranslation("profile");
  const [customizablesDb, setCustomizablesDb] = useState(mockCustomizables);
  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();

  const unlockedCustomizables = useStore((state) => state.profile.unlockedCustomizables);
  const justUnlockedCustomizables = useStore((state) => state.profile.justUnlockedCustomizables);
  const clearJustUnlockedCustomizable = useStore((state) => state.clearJustUnlockedCustomizable);
  const activeFrame = useStore((state) => state.profile.activeFrame) || "frame_default";
  const activeStatusBadge = useStore((state) => state.profile.activeStatusBadge) || null;
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const setActiveStatusBadge = useStore((state) => state.setActiveStatusBadge);

  const containerWidth = Math.min(width, 480) - 32;
  const totalGapSpace = 32;
  const exactCardWidth = Math.floor((containerWidth - totalGapSpace) / 3);

  const checkIsActive = (categoryKey, itemId) => {
    if (categoryKey === "frames") {
      return activeFrame === itemId;
    }
    if (categoryKey === "badges") {
      if (itemId === "badge_none") {
        return activeStatusBadge === null;
      }
      return activeStatusBadge === itemId;
    }
    return false;
  };

  const handleSelectItem = (categoryKey, itemId) => {
    if (categoryKey === "frames") {
      setActiveFrame(itemId);
    } else if (categoryKey === "badges") {
      if (itemId === "badge_none") {
        setActiveStatusBadge(null);
        return;
      }
      setActiveStatusBadge(itemId);
    }
  };

  const categories = [
    { key: "frames", title: "Frames", data: customizablesDb.frames },
    { key: "badges", title: "Status Badges", data: customizablesDb.badges }
  ];

  return (
    <ScreenWrapper scrollable={false} withPaddingTop={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
      >
        <View style={styles.contentMaxWidth}>
          <ScreenTitle title={t("Customizables")} />

          {categories.map((category) => (
            <View key={category.key} style={styles.categorySection}>
              <AppText type="h2" style={styles.categoryTitle}>
                {t(category.title)}
              </AppText>

              <View style={styles.gridContainer}>
                {category.data.map((item) => {
                  const isActive = checkIsActive(category.key, item.id);
                  const isUnlocked = unlockedCustomizables.includes(item.id) || item.id === "badge_none";
                  const isJustUnlocked = justUnlockedCustomizables.includes(item.id);
                  return (
                    <View key={item.id} style={{ width: exactCardWidth }}>
                      <CustomizablesCard
                        id={item.id}
                        name={item.name}
                        icon={item.icon}
                        color={item.color}
                        isActive={isActive}
                        unlocked={isUnlocked}
                        justUnlocked={isJustUnlocked}
                        onAnimationComplete={() => clearJustUnlockedCustomizable(item.id)}
                        onPress={() => (isUnlocked ? handleSelectItem(category.key, item.id) : null)}
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
