import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";

export const CHIP_HEIGHT = 36;

// Filter-/Auswahl-Chip: bewusst ruhiger als ein CTA (kein Verlauf, nur Rahmen + Tönung im aktiven Zustand)
const AppChip = memo(({ label, icon, isActive = false, onPress, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      style={({ pressed }) => [styles.chip, isActive && styles.active, pressed && styles.pressed, style]}
    >
      {icon}
      <AppText type="label" style={{ color: isActive ? MyTheme.primaryAccent : MyTheme.text }}>
        {label}
      </AppText>
    </Pressable>
  );
});
AppChip.displayName = "AppChip";

const getStyles = (theme) =>
  StyleSheet.create({
    chip: {
      height: CHIP_HEIGHT,
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      paddingHorizontal: Spacing.md,
      borderRadius: Spacing.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.separator,
      backgroundColor: theme.glas
    },
    active: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.12)
    },
    pressed: {
      opacity: 0.8
    }
  });

export default AppChip;
