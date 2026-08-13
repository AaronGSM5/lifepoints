import React, { memo, useCallback, useMemo } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import AppText from "./AppText";
import EventSlide from "../home/EventSlide";

const HeroCarousel = memo(({ data, isLoading, onPressItem }) => {
  const { width } = useWindowDimensions();

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
      return <EventSlide imageSource={item.image} isLoading={isLoading} onPress={() => handlePressItem(item)} />;
    },
    [isLoading, handlePressItem]
  );

  if (!data || data.length === 0) {
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
      autoPlay={true}
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
