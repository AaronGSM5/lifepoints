import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useRouter } from "expo-router";
import { onboardingSlides } from "@/constants/MockData";
import AppButton from "@/components/ui/AppButton";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

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

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
        <AppText type="h1" style={{ fontSize: 80 }}>
          {item.id === "1" ? "🌍" : item.id === "2" ? "✨" : "🌱"}
        </AppText>
      </View>

      <View style={styles.textContainer}>
        <AppText type="h1" style={styles.title}>
          {item.title}
        </AppText>
        <AppText type="body" style={styles.description}>
          {item.description}
        </AppText>
      </View>
    </View>
  );

  return (
    <ScreenWrapper withPaddingSides={false}>
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <FlatList
            data={onboardingSlides}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            // snapToInterval={width}
            // snapToAlignment="start"
            // decelerationRate="fast"
            // disableIntervalMomentum={true}
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
          <View style={styles.dotContainer}>
            {onboardingSlides.map((_, index) => (
              <View key={index.toString()} style={[styles.dot, currentIndex === index ? styles.activeDot : null]} />
            ))}
          </View>

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
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: "center"
  },
  textContainer: {
    flex: 0.4,
    alignItems: "center",
    marginTop: Spacing.md
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.md
  },
  description: {
    textAlign: "center",
    color: "gray",
    lineHeight: 24
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.xl
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: MyTheme.muted,
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: MyTheme.primary,
    width: 20
  }
});
