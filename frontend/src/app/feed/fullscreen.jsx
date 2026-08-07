import { useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import FullscreenVideoItem from "@/components/home/FullscreenVideoItem";
import useStore from "@/store/useStore";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 80
};

export default function FullscreenFeedScreen() {
  const params = useLocalSearchParams();
  const targetPostId = params.postId;

  const feedItems = useStore((state) => state.feedItems || []);
  const videoPosts = feedItems.filter((item) => item.type === "video");

  const initialIndex = videoPosts.findIndex((item) => String(item.id) === String(targetPostId));
  const startIndex = initialIndex !== -1 ? initialIndex : 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => <FullscreenVideoItem item={item} isVisible={index === currentIndex} />,
    [currentIndex]
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index
    }),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videoPosts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        initialScrollIndex={startIndex}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});
