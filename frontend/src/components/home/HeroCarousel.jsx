import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import EventSlide from "./EventSlide";
import AppText from "../ui/AppText";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.85;
const ITEM_HEIGHT = ITEM_WIDTH * (9 / 16);

export default function HeroCarousel({ data, isLoading, onPressItem }) {
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
      width={ITEM_WIDTH}
      height={ITEM_HEIGHT}
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
