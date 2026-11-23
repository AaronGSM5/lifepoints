import React, { memo, useCallback, useMemo } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { Spacing } from "@/constants/Spacing";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import AppText from "./AppText";
import EventSlide from "../home/EventSlide";

const HeroCarousel = memo(({ data, isLoading, onPressItem }) => {
  const { width } = useWindowDimensions();
  const reduceMotion = useReducedMotion();

  const itemDimensions = useMemo(
    () => ({
      width: width * 0.85,
      height: width * 0.85 * (9 / 16)
    }),
    [width]
  );

  const handlePressItem = useCallback(
    (item) => {
      if (onPressItem) onPressItem(item);
    },
    [onPressItem]
  );

  const renderCarouselItem = useCallback(
    ({ item }) => {
      return (
        <EventSlide
          imageSource={item.image}
          title={item.title}
          isLoading={isLoading}
          onPress={() => handlePressItem(item)}
        />
      );
    },
    [isLoading, handlePressItem]
  );

  if (!data?.length) {
    return (
      <View>
        <AppText>No data found</AppText>
      </View>
    );
  }

  return (
    <Carousel
      loop
      width={itemDimensions.width}
      height={itemDimensions.height}
      style={[
        {
          width: width,
          marginBottom: Spacing.md,
          justifyContent: "center",
          alignItems: "center"
        },
        Platform.select({
          web: { touchAction: "pan-y" },
          default: {}
        })
      ]}
      data={data}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.85,
        parallaxScrollingOffset: 40
      }}
      autoPlay={!reduceMotion}
      autoPlayInterval={10000}
      pagingEnabled={false}
      snapEnabled={true}
      scrollAnimationDuration={500}
      renderItem={renderCarouselItem}
    />
  );
});
HeroCarousel.displayName = "HeroCarousel";

export default HeroCarousel;
