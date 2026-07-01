import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import { useRouter } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import OnboardingItem from "@/components/onboarding/OnboardingItem";
import SlidePaginator from "@/components/onboarding/SlidePaginator";
import AppButton from "@/components/ui/AppButton";
import { onboardingSlides } from "@/constants/OnboardingContent";
import { Spacing } from "@/constants/Spacing";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewConfig = useMemo(() => ({ viewAreaCoveragePercentThreshold: 50 }), []);

  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index
  });

  const scrollToNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextOffset = (currentIndex + 1) * width;

      slidesRef.current?.scrollToOffset({
        offset: nextOffset,
        animated: true
      });
    } else {
      router.push("/survey");
    }
  };

  const renderItem = useCallback(({ item }) => <OnboardingItem item={item} />, []);

  return (
    <ScreenWrapper withPaddingSides={false}>
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <FlatList
            data={onboardingSlides}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            bounces={false}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
            getItemLayout={getItemLayout}
          />
        </View>

        <View style={styles.footer}>
          <SlidePaginator data={onboardingSlides} currentIndex={currentIndex} />

          <AppButton
            title={currentIndex === onboardingSlides.length - 1 ? "Los geht's" : "Weiter"}
            onPress={scrollToNext}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  sliderContainer: {
    flex: 3
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl
  }
});
