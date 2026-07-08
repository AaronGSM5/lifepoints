import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

import ColorThemeItem from "./ColorThemeItem";
import SectionHeader from "../ui/SectionHeader";

const THEME_OPTIONS = [
  { id: "default_green", bg: "#121212", accent: "#4ADE80", isLocked: false },
  { id: "blue_dark", bg: "#121212", accent: "#3B82F6", isLocked: false },
  { id: "purple_dark", bg: "#121212", accent: "#A855F7", isLocked: true },
  { id: "orange_light", bg: "#121212", accent: "#F97316", isLocked: false },
  { id: "pink_dark", bg: "#121212", accent: "#EC4899", isLocked: false }
];

const ColorThemePicker = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const currentColorThemeId = useStore((state) => state.activeColorThemeId) || "default_green";
  const setColorTheme = useStore((state) => state.setColorTheme);
  const { t } = useTranslation("settings");

  const handlePress = useCallback(
    (theme) => {
      if (theme.isLocked) return;
      triggerHaptic();
      setColorTheme(theme.id);
    },
    [setColorTheme]
  );

  return (
    <View style={styles.container}>
      <SectionHeader title={t("Color Theme")} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {THEME_OPTIONS.map((theme) => (
          <ColorThemeItem
            key={theme.id}
            theme={theme}
            isSelected={currentColorThemeId === theme.id}
            onPress={() => handlePress(theme)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.xl
    },
    scrollContainer: {
      gap: Spacing.md,
      paddingVertical: Spacing.xs,
      paddingLeft: Spacing.sm
    }
  });

export default ColorThemePicker;
