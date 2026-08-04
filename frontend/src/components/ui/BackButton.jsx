import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";

import { Spacing } from "@/constants/Spacing";

import AppIconButton from "./AppIconButton";

const BackButton = ({ onPress, style, iconColor, ref, ...rest }) => {
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
      withBackground
      accessibilityLabel={"Back"}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: Spacing.borderRadius.full,
    position: "absolute",
    top: 20,
    left: Spacing.md
  }
});

export default BackButton;
