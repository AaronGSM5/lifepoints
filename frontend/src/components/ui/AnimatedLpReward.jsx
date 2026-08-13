import React, { useEffect, useMemo, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import LpLogo from "./LpLogo";

export default function AnimatedLpReward({ points }) {
  const MyTheme = useAppTheme();

  const [flyAnim] = useState(() => new Animated.Value(0));
  const [stackAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.sequence([
        Animated.timing(flyAnim, {
          toValue: 1,
          duration: 350,
          easing: Easing.in(Easing.back(1)),
          useNativeDriver: Platform.OS !== "web"
        }),
        Animated.spring(stackAnim, {
          toValue: 1,
          friction: 4,
          tension: 50,
          useNativeDriver: Platform.OS !== "web"
        })
      ]).start();
    }, 800);

    return () => clearTimeout(timeout);
  }, [flyAnim, stackAnim]);

  const { numberTranslateX, numberScale, numberOpacity, iconScale, scatter1X, scatter1Y, stackOpacity } = useMemo(
    () => ({
      numberTranslateX: flyAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 35]
      }),
      numberScale: flyAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      }),
      numberOpacity: flyAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [1, 0, 0]
      }),
      iconScale: stackAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.4, 1]
      }),
      scatter1X: stackAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 3]
      }),
      scatter1Y: stackAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2]
      }),
      stackOpacity: stackAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 1]
      })
    }),
    [flyAnim, stackAnim]
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.numberContainer,
          {
            transform: [{ translateX: numberTranslateX }, { scale: numberScale }],
            opacity: numberOpacity
          }
        ]}
      >
        <AppText type={"caption"} bold style={[styles.pointsText, { color: MyTheme.primaryAccent }]}>
          {points}
        </AppText>
      </Animated.View>

      <View style={styles.iconWrapper}>
        <Animated.View
          style={[
            styles.stackedIcon,
            {
              opacity: stackOpacity,
              transform: [{ translateX: scatter1X }, { translateY: scatter1Y }, { scale: 0.9 }]
            }
          ]}
        >
          <LpLogo />
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          <LpLogo />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  numberContainer: {
    marginRight: Spacing.sm
  },
  iconWrapper: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  stackedIcon: {
    position: "absolute",
    zIndex: -1
  },
  pointsText: {
    letterSpacing: 0.5,
    fontSize: 22,
    lineHeight: 28
  }
});
