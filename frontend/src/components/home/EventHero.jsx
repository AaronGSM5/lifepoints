import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const EventHero = ({ imageSource, isLoading, onPress }) => {
  const MyTheme = useAppTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.heroSection}>
        <Image source={imageSource} style={styles.heroImage} resizeMode="cover" />
        {isLoading && (
          <View style={StyleSheet.absoluteFillObject}>
            <Skeleton
              colorMode={MyTheme.isDark ? "dark" : "light"}
              width="100%"
              height="100%"
              radius={Spacing.borderRadius.lg}
              transition={{ type: "timing", duration: 1500 }}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: Spacing.lg,
    position: "relative"
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: Spacing.borderRadius.lg
  }
});

export default EventHero;
