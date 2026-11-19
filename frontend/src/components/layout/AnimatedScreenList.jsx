import React from "react";
import { Animated, Platform } from "react-native";

import { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

export default function AnimatedScreenList({
  scrollY,
  contentContainerStyle,
  onScroll,
  withTopPadding = true,
  ...props
}) {
  const toolbarPadding = useToolbarPadding();
  const topPadding = withTopPadding ? toolbarPadding : 0;
  const bottomPadding = useFloatingNavbarPadding();
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
        useNativeDriver: Platform.OS !== "web",
        listener: onScroll
      })}
    />
  );
}
