import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

import AppImage from "../ui/AppImage";

const EventSlide = memo(({ imageSource, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.heroSection}>
        <AppImage source={imageSource} variant={"fill"} contentFit={"contain"} />
      </View>
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
