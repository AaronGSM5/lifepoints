import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet } from "react-native";

export const LootGameTrigger = memo(({ isReady, onPress }) => {
  const [translateX] = useState(() => new Animated.Value(120));
  const hasAppeared = useRef(false);

  useEffect(() => {
    if (isReady && !hasAppeared.current) {
      hasAppeared.current = true;

      Animated.sequence([
        Animated.delay(100),
        Animated.spring(translateX, {
          toValue: 0,
          friction: 12,
          tension: 40,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [isReady, translateX]);

  return (
    <Animated.View style={[styles.mascotContainer, { transform: [{ translateX }] }]}>
      <Pressable onPress={onPress}>
        <Image
          source={require("@/../public/assets/CapybaraFace.png")}
          style={styles.mascotImage}
          resizeMode="contain"
        />
      </Pressable>
    </Animated.View>
  );
});
LootGameTrigger.displayName = "LootGameTrigger";

const styles = StyleSheet.create({
  mascotContainer: {
    position: "absolute",
    right: -18,
    bottom: 0,
    zIndex: 100,
    overflow: "visible"
  },
  mascotImage: {
    width: 90,
    height: 90
  }
});
