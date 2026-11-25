import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";

const BaseCard = memo(({ children, onPress, style, padding = Spacing.md, disabled = false, isSelected = false }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const containerStyle = [styles.card, { padding }, isSelected && styles.selected, disabled && styles.disabled, style];

  if (onPress) {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{children}</View>;
});
BaseCard.displayName = "BaseCard";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: theme.radius.lg,
      borderWidth: theme.cardBorderWidth,
      borderBottomWidth: theme.cardBorderBottomWidth,
      borderColor: theme.cardBorderColor,
      overflow: "hidden",
      boxShadow: theme.cardShadow
    },
    selected: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.1)
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }]
    },
    disabled: {
      opacity: 0.6
    }
  });

export default BaseCard;
