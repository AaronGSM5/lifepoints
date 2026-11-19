import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, PanResponder, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "./AppText";

// Höhe der Zeile inkl. oberem Abstand; Listen unter dem Segmented Control nutzen SEGMENT_OFFSET
export const SEGMENT_ROW_HEIGHT = 56;
export const SEGMENT_OFFSET = SEGMENT_ROW_HEIGHT + Spacing.sm + Spacing.sm;
const PADDING = 2;
const BORDER_WIDTH = 1;

const NavigationRow = memo(({ tabs, activeIndex, onTabChange }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [panX] = useState(() => new Animated.Value(0));
  const { t } = useTranslation();

  const currentVal = useRef(0);
  useEffect(() => {
    const id = panX.addListener(({ value }) => {
      currentVal.current = value;
    });
    return () => panX.removeListener(id);
  }, [panX]);

  const usableWidth = containerWidth - PADDING * 2 - BORDER_WIDTH * 2;
  const tabWidth = usableWidth > 0 ? usableWidth / tabs.length : 0;

  useEffect(() => {
    if (tabWidth > 0) {
      Animated.spring(panX, {
        toValue: activeIndex * tabWidth,
        useNativeDriver: Platform.OS !== "web",
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
          panX.setOffset(currentVal.current);
          panX.setValue(0);
        },
        onPanResponderMove: Animated.event([null, { dx: panX }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
          panX.flattenOffset();
          let newIndex = Math.round(currentVal.current / tabWidth);
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
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <AppText type="label" style={{ color: isActive ? MyTheme.primaryAccent : MyTheme.muted }}>
                {t(tab)}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});
NavigationRow.displayName = "NavigationRow";

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      height: SEGMENT_ROW_HEIGHT,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
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
      padding: PADDING,
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
