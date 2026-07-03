import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";

export default function BackButton({ onPress, style, iconColor = "#fff", backgroundColor = "rgba(0,0,0,0.5)" }) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  };

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={handlePress} activeOpacity={0.7}>
      <Icon name="back" color={iconColor} />
    </TouchableOpacity>
  );
}

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
