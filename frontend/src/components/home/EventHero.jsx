import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Skeleton } from "moti/skeleton";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

const EventHero = ({ imageSource, isLoading, onPress }) => {
  const { isDarkMode } = useStore();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.heroSection}>
        <Image source={imageSource} style={styles.heroImage} resizeMode="cover" />
        {isLoading && (
          <View style={StyleSheet.absoluteFillObject}>
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
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
