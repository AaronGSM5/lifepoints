import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const BackButton = memo(({ onPress, style, iconColor, backgroundColor }) => {
  const MyTheme = useAppTheme();
  const router = useRouter();

  const resolvedBackgroundColor = backgroundColor ?? (MyTheme.isDark ? "rgba(0,0,0,0.4)" : MyTheme.glas);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  }, [onPress, router]);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: resolvedBackgroundColor }, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Icon name="back" color={iconColor} />
    </TouchableOpacity>
  );
});
BackButton.displayName = "BackButton";

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: Spacing.md
  }
});

export default BackButton;
