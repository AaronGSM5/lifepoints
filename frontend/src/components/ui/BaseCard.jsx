import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

const BaseCard = ({ children, onPress, style, padding = Spacing.md }) => {
  const styles = getStyles();
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

const getStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: MyTheme.primary,
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 1,
      borderColor: MyTheme.secondary,
      overflow: "hidden"
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }]
    }
  });

export default BaseCard;
