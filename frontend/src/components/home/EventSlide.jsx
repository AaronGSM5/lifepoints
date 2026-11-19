import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppImage from "../ui/AppImage";

const EventSlide = memo(({ imageSource, onPress, style, accessibilityLabel }) => {
  const content = (
    <View style={styles.heroSection}>
      <AppImage source={imageSource} variant={"fill"} contentFit={"contain"} />
    </View>
  );

  // Ohne Ziel kein Pressable: sonst wirkt der Slide klickbar, ohne etwas zu tun
  if (!onPress) {
    return (
      <View style={[styles.container, style]} accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {content}
    </Pressable>
  );
});
EventSlide.displayName = "EventSlide";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heroSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing.borderRadius.lg,
    overflow: "hidden",
    position: "relative"
  }
});

export default EventSlide;
