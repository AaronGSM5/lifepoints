// components/layout/AnimatedScreenList.js
import React from "react";
import { Animated } from "react-native";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { getScrollState } from "@/utils/scrollState";
import { usePathname } from "expo-router";

export default function AnimatedScreenList({ contentContainerStyle, onScroll, ...props }) {
  const topPadding = useToolbarPadding();
  const bottomPadding = useFloatingNavbarPadding();
  const pathname = usePathname();
  const { scrollY } = getScrollState(pathname, topPadding);

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      {...props}
      contentContainerStyle={[
        {
          paddingTop: topPadding,
          paddingBottom: bottomPadding
        },
        contentContainerStyle
      ]}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
        listener: onScroll
      })}
    />
  );
}
