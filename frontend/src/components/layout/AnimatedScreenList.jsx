import React, { useRef } from "react";
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
  const flatListRef = useRef(null);

  const handleSnap = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset > 0 && currentOffset < topPadding) {
      const isMoreThanHalf = currentOffset > topPadding / 2;
      let snapOffset = isMoreThanHalf ? topPadding : 0;

      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: snapOffset,
          animated: true
        });
      }
    }
  };

  return (
    <Animated.FlatList
      ref={flatListRef}
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
      onMomentumScrollEnd={(e) => handleSnap(e)}
      onScrollEndDrag={(e) => {
        const velocity = e.nativeEvent.velocity?.y || 0;
        if (Math.abs(velocity) < 0.2) {
          handleSnap(e);
        }
      }}
    />
  );
}
