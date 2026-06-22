import React, { useRef } from "react";
import { Animated } from "react-native";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import { getScrollState } from "@/utils/scrollState";
import { usePathname } from "expo-router";

export default function AnimatedScreenList({ contentContainerStyle, onScroll, ...props }) {
  const topPadding = useToolbarPadding();
  const bottomPadding = useFloatingNavbarPadding();
  const pathname = usePathname();
  const { scrollY, getClampedValue } = getScrollState(pathname, topPadding);

  const flatListRef = useRef(null);

  const handleSnap = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const clamped = getClampedValue();

    if (clamped > 0 && clamped < topPadding) {
      const isMoreThanHalf = clamped > topPadding / 2;
      let snapOffset = currentOffset;

      if (isMoreThanHalf) {
        snapOffset = currentOffset + (topPadding - clamped);
      } else {
        snapOffset = currentOffset - clamped;
      }

      if (snapOffset >= 0 && flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: snapOffset,
          animated: true
        });
      }
    }
  };

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
