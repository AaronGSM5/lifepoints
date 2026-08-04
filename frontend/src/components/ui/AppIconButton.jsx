import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";

import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function AppIconButton({
  icon,
  iconSize,
  onPress,
  style,
  color,
  withBackground = false,
  accessibilityLabel,
  disabled = false,
  ref,
  ...rest
}) {
  const MyTheme = useAppTheme();

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      hitSlop={15}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || `Button: ${icon}`}
      android_ripple={{ color: "rgba(150, 150, 150, 0.2)", borderless: true }}
      style={({ pressed }) => [
        styles.button,
        withBackground && {
          backgroundColor: MyTheme.isDark ? "rgba(0,0,0,0.4)" : MyTheme.glas,
          borderRadius: Spacing.borderRadius.full,
          padding: Spacing.sm
        },
        pressed && Platform.OS === "ios" && { opacity: 0.6 },
        disabled && { opacity: 0.4 },
        style
      ]}
      {...rest}
    >
      <Icon name={icon} color={color || MyTheme.text} size={iconSize} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  }
});
