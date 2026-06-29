import { View, StyleSheet, Animated } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import React, { memo, useRef } from "react";
import Toolbar from "./Toolbar";

export const useFloatingNavbarPadding = () => {
  const insets = useSafeAreaInsets();
  const navbarBottomSpace = insets.bottom > 0 ? insets.bottom + 10 : 25;
  const navbarHeight = 65;
  const extraClearance = Spacing.md || 16;
  return navbarBottomSpace + navbarHeight + extraClearance;
};

export default memo(function ScreenWrapper({
  children,
  scrollY: externalScrollY,
  scrollable = true,
  withOffset = false,
  withPaddingBottom = true,
  withPaddingSides = true,
  useGradient = true,
  withPaddingTop = true,
  withToolbar = true,
  style
}) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const insets = useSafeAreaInsets();
  const totalBottomPadding = useFloatingNavbarPadding();
  const toolbarTopPadding = useToolbarPadding();
  const internalScrollY = useRef(new Animated.Value(0)).current;
  const scrollY = externalScrollY || internalScrollY;
  const contentStyles = [
    {
      paddingHorizontal: withPaddingSides ? Spacing.md : 0,
      paddingTop: withPaddingTop
        ? (withToolbar ? toolbarTopPadding : insets.top) + (withOffset ? Spacing.md : 0)
        : insets.top,
      paddingBottom: scrollable && withPaddingBottom ? totalBottomPadding : 0
    },
    style
  ];

  return (
    <View style={styles.wrapper}>
      {useGradient && (
        <LinearGradient colors={[MyTheme.background, MyTheme.backgroundBottom]} style={StyleSheet.absoluteFillObject} />
      )}
      {withToolbar && <Toolbar scrollY={scrollY} />}
      {scrollable ? (
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[contentStyles, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
        >
          {children}
        </Animated.ScrollView>
      ) : (
        <View style={[{ flex: 1 }, contentStyles]}>{children}</View>
      )}
    </View>
  );
});

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.background
    }
  });
