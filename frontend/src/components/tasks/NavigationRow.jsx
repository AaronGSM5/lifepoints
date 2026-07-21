import React, { memo, useEffect, useMemo, useState } from "react";
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";

const NavigationRow = memo(({ tabs, activeIndex, onTabChange }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [panX] = useState(() => new Animated.Value(0));

  const PADDING = 2;
  const BORDER_WIDTH = 1;
  const usableWidth = containerWidth - PADDING * 2 - BORDER_WIDTH * 2;
  const tabWidth = usableWidth > 0 ? usableWidth / tabs.length : 0;

  useEffect(() => {
    if (tabWidth > 0) {
      Animated.spring(panX, {
        toValue: activeIndex * tabWidth,
        useNativeDriver: true,
        bounciness: 4,
        speed: 12
      }).start();
    }
  }, [activeIndex, tabWidth, panX]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          panX.setOffset(panX._value);
          panX.setValue(0);
        },
        onPanResponderMove: Animated.event([null, { dx: panX }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
          panX.flattenOffset();
          let newIndex = Math.round(panX._value / tabWidth);
          if (newIndex < 0) newIndex = 0;
          if (newIndex >= tabs.length) newIndex = tabs.length - 1;

          if (onTabChange) onTabChange(newIndex);
        }
      }),
    [tabWidth, panX, onTabChange, tabs.length]
  );

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

        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => onTabChange && onTabChange(index)}
              activeOpacity={0.9}
            >
              {/* <Icon name={tab.icon} color={isActive ? MyTheme.primaryAccent : MyTheme.text} /> */}
              <AppText style={{ color: isActive ? MyTheme.primaryAccent : undefined }} bold={isActive}>
                {tab}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* <TouchableOpacity
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
        <LayeredIcon bottomIcon={"recycle"} topIcon={"add"} color1={MyTheme.text} color2={MyTheme.text} />
      </TouchableOpacity> */}
    </View>
  );
});
NavigationRow.displayName = "NavigationRow";

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
