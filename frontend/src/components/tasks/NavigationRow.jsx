import React, { useState, useRef, useEffect } from "react";
import { View, Animated, PanResponder, TouchableOpacity, StyleSheet } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/hooks/useAppTheme";

const TABS = [
  { id: "catalog", icon: "book" },
  { id: "routines", icon: "recycle" },
  { id: "favorites", icon: "heart" },
  { id: "recent", icon: "history" }
];

const NavigationRow = () => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const panX = useRef(new Animated.Value(0)).current;
  const panXValue = useRef(0);

  useEffect(() => {
    const listener = panX.addListener(({ value }) => {
      panXValue.current = value;
    });
    return () => panX.removeListener(listener);
  }, []);

  const PADDING = 2;
  const BORDER_WIDTH = 1;
  const usableWidth = containerWidth - PADDING * 2 - BORDER_WIDTH * 2;
  const tabWidth = usableWidth > 0 ? usableWidth / TABS.length : 0;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panX.setOffset(panXValue.current);
        panX.setValue(0);
      },
      onPanResponderMove: Animated.event([null, { dx: panX }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        panX.flattenOffset();

        let newIndex = Math.round(panXValue.current / tabWidth);

        if (newIndex < 0) newIndex = 0;
        if (newIndex >= TABS.length) newIndex = TABS.length - 1;

        setActiveIndex(newIndex);

        Animated.spring(panX, {
          toValue: newIndex * tabWidth,
          useNativeDriver: false,
          bounciness: 4,
          speed: 12
        }).start();
      }
    })
  ).current;

  const handleTabPress = (index) => {
    setActiveIndex(index);
    Animated.spring(panX, {
      toValue: index * tabWidth,
      useNativeDriver: false,
      bounciness: 4,
      speed: 12
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.segmentedControl} onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
        {containerWidth > 0 && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.slider,
              {
                width: tabWidth,
                transform: [{ translateX: panX }]
              }
            ]}
          />
        )}

        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.9}
            >
              <Icon name={tab.icon} color={isActive ? MyTheme.primaryAccent : MyTheme.text} />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={{
          width: 44,
          height: 44,
          backgroundColor: MyTheme.background,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: Spacing.borderRadius.full,
          borderWidth: 1,
          borderColor: MyTheme.primary
        }}
        activeOpacity={0.9}
      >
        <Icon name={"recycle"} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      height: 56,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
      marginTop: Spacing.sm,
      gap: Spacing.sm
    },
    segmentedControl: {
      flex: 1,
      height: 44,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: Spacing.borderRadius.full,
      padding: 2,
      backgroundColor: theme.background
    },
    slider: {
      position: "absolute",
      top: 2,
      bottom: 2,
      left: 2,
      backgroundColor: theme.glas,
      borderRadius: Spacing.borderRadius.full,
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.15)"
    },
    tabButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1
    }
  });

export default NavigationRow;
