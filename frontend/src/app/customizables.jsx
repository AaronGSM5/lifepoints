import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

import CustomizablesGridItem from "@/components/customizables/CustomizablesGridItem";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { mockCustomizables } from "@/mocks/Customizables";
import useStore from "@/store/useStore";

export default function CustomizablesScreen() {
  const { t } = useTranslation("profile");
  const bottomPadding = useFloatingNavbarPadding();
  const { width } = useWindowDimensions();

  const unlockedCustomizables = useStore((state) => state.profile.unlockedCustomizables);
  const justUnlockedCustomizables = useStore((state) => state.profile.justUnlockedCustomizables);
  const clearJustUnlockedCustomizable = useStore((state) => state.clearJustUnlockedCustomizable);
  const activeFrame = useStore((state) => state.profile.activeFrame) || "frame_default";
  const activeStatusBadge = useStore((state) => state.profile.activeStatusBadge) || null;
  const setActiveFrame = useStore((state) => state.setActiveFrame);
  const setActiveStatusBadge = useStore((state) => state.setActiveStatusBadge);

  const unlockedSet = useMemo(() => new Set(unlockedCustomizables), [unlockedCustomizables]);
  const justUnlockedSet = useMemo(() => new Set(justUnlockedCustomizables), [justUnlockedCustomizables]);

  const exactCardWidth = useMemo(() => {
    const containerWidth = Math.min(width, 480) - 32;
    const totalGapSpace = 32;
    return Math.floor((containerWidth - totalGapSpace) / 3);
  }, [width]);

  const checkIsActive = useCallback(
    (categoryKey, itemId) => {
      if (categoryKey === "frames") {
        return activeFrame === itemId;
      }
      if (categoryKey === "badges") {
        return itemId === "badge_none" ? activeStatusBadge === null : activeStatusBadge === itemId;
      }
      return false;
    },
    [activeFrame, activeStatusBadge]
  );

  const handleSelectItem = useCallback(
    (categoryKey, itemId) => {
      if (categoryKey === "frames") {
        setActiveFrame(itemId);
      } else if (categoryKey === "badges") {
        setActiveStatusBadge(itemId === "badge_none" ? null : itemId);
      }
    },
    [setActiveFrame, setActiveStatusBadge]
  );

  const categories = useMemo(
    () => [
      { key: "frames", title: "Frames", data: mockCustomizables.frames },
      { key: "badges", title: "Status Badges", data: mockCustomizables.badges }
    ],
    []
  );

  return (
    <ScreenWrapper scrollable={false}>
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
                  const isUnlocked = unlockedSet.has(item.id) || item.id === "badge_none";
                  const isJustUnlocked = justUnlockedSet.has(item.id);
                  return (
                    <CustomizablesGridItem
                      key={item.id}
                      item={item}
                      categoryKey={category.key}
                      isActive={isActive}
                      isUnlocked={isUnlocked}
                      isJustUnlocked={isJustUnlocked}
                      exactCardWidth={exactCardWidth}
                      onSelect={handleSelectItem}
                      onClearAnimation={clearJustUnlockedCustomizable}
                    />
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
