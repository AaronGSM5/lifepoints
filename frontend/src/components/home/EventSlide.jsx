import React, { memo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const EventSlide = memo(({ imageSource, isLoading, onPress, style }) => {
  const MyTheme = useAppTheme();

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.heroSection}>
        <Image source={typeof imageSource === "string" ? { uri: imageSource } : imageSource} style={styles.heroImage} />
        {isLoading && (
          <View style={StyleSheet.absoluteFillObject}>
            <Skeleton
              colorMode={MyTheme.isDark ? "dark" : "light"}
              width="100%"
              height="100%"
              radius={Spacing.borderRadius.lg}
            />
          </View>
        )}
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
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  heroImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default EventSlide;
