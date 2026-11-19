import React, { memo, useCallback, useMemo, useState } from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import EventSlide from "../home/EventSlide";

// Ruhiges Karussell: kein Autoplay, Pagination-Punkte, Tap nur wenn ein Ziel übergeben wird
const HeroCarousel = memo(({ data, isLoading, onPressItem }) => {
  const { width } = useWindowDimensions();
  const MyTheme = useAppTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const itemDimensions = useMemo(
    () => ({
      width: width * 0.85,
      height: width * 0.85 * (9 / 16)
    }),
    [width]
  );

  const renderCarouselItem = useCallback(
    ({ item }) => (
      <EventSlide
        imageSource={item.image}
        isLoading={isLoading}
        accessibilityLabel={item.title}
        onPress={onPressItem ? () => onPressItem(item) : undefined}
      />
    ),
    [isLoading, onPressItem]
  );

  if (!data?.length) return null;

  return (
    <View style={styles.container}>
      <Carousel
        loop={data.length > 1}
        width={itemDimensions.width}
        height={itemDimensions.height}
        style={[
          { width, justifyContent: "center", alignItems: "center" },
          Platform.select({ web: { touchAction: "pan-y" }, default: {} })
        ]}
        data={data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 40
        }}
        autoPlay={false}
        pagingEnabled={false}
        snapEnabled
        scrollAnimationDuration={500}
        onSnapToItem={setActiveIndex}
        renderItem={renderCarouselItem}
      />
      {data.length > 1 && (
        <View
          style={styles.dots}
          accessibilityRole="adjustable"
          accessibilityValue={{ now: activeIndex + 1, min: 1, max: data.length }}
        >
          {data.map((item, index) => (
            <View
              key={item.id ?? index}
              style={[
                styles.dot,
                { backgroundColor: index === activeIndex ? MyTheme.primaryAccent : MyTheme.separator },
                index === activeIndex && styles.dotActive
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
});
HeroCarousel.displayName = "HeroCarousel";

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.xs,
    marginTop: -Spacing.sm
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Spacing.borderRadius.full
  },
  dotActive: {
    width: 16
  }
});

export default HeroCarousel;
