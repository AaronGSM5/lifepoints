import React, { useRef } from "react";
import { Animated } from "react-native";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";

export default function AnimatedScreenList({ scrollY, contentContainerStyle, onScroll, ...props }) {
  const topPadding = useToolbarPadding();
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
