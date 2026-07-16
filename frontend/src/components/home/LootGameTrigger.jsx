import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import AppImage from "../ui/AppImage";

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
        <AppImage
          source={require("@/../public/assets/CapybaraFace.png")}
          variant={"lootGameTrigger"}
          contentFit="contain"
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
  }
});
