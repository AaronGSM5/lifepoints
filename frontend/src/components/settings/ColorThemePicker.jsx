import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { THEME_OPTIONS } from "@/mocks/ThemeOptions";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

import ColorThemeItem from "./ColorThemeItem";
import SectionHeader from "../ui/SectionHeader";

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
