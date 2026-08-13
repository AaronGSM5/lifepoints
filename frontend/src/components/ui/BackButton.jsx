import React, { forwardRef, memo, useCallback } from "react";
import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";

import { Spacing } from "@/constants/Spacing";

import AppIconButton from "./AppIconButton";

const BackButton = memo(
  forwardRef(({ onPress, style, iconColor, withBackground = false, ...rest }, ref) => {
    const router = useRouter();

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
      <AppIconButton
        ref={ref}
        icon="back"
        onPress={handlePress}
        color={iconColor}
        style={[styles.button, style]}
        withBackground={withBackground}
        accessibilityLabel={"Back"}
        {...rest}
      />
    );
  })
);
BackButton.displayName = "BackButton";

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: Spacing.borderRadius.full
  }
});

export default BackButton;
