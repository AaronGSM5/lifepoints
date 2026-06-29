import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { addOpacity } from "@/utils/addOpacity";

const BaseCard = ({ children, onPress, style, padding = Spacing.md }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const baseStyles = [styles.card, { padding }, style];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [...baseStyles, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }

  return <View style={baseStyles}>{children}</View>;
};

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: addOpacity(theme.primary, 0.6),
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 1,
      borderColor: addOpacity(theme.secondary, 0.7),
      overflow: "hidden"
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }]
    }
  });

export default BaseCard;
