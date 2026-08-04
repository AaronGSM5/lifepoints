import React, { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import AppText from "./AppText";
import EventSlide from "../home/EventSlide";

export default function HeroCarousel({ data, isLoading, onPressItem }) {
  const { width } = useWindowDimensions();
  const itemDimensions = useMemo(
    () => ({
      width: width * 0.85,
      height: width * 0.85 * (9 / 16)
    }),
    [width]
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
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
        touchAction: "pan-y"
      }}
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
      renderItem={({ item }) => {
        return <EventSlide imageSource={item.image} isLoading={isLoading} onPress={() => onPressItem(item)} />;
      }}
    />
  );
}
