import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Platform, StyleSheet, TouchableOpacity } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { announce } from "@/utils/a11yHelpers";

import { Icon } from "../icons/Icon";

const ConfirmableIcon = memo(({ icon, actionIconName, onAction, accessibilityLabel, confirmLabel }) => {
  const MyTheme = useAppTheme();
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 300;

  const [isConfirming, setIsConfirming] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetFlip = useCallback(() => {
    setIsConfirming(false);
    Animated.timing(flipAnim, {
      toValue: 0,
      duration,
      useNativeDriver: Platform.OS !== "web"
    }).start();
  }, [flipAnim, duration]);

  const handlePress = useCallback(async () => {
    if (isConfirming) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onAction();
      resetFlip();
    } else {
      setIsConfirming(true);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration,
        useNativeDriver: Platform.OS !== "web"
      }).start();

      // Screenreader-Nutzer brauchen mehr Zeit für den zweiten Tipp (WCAG 2.2.1).
      const screenReaderOn = await AccessibilityInfo.isScreenReaderEnabled?.().catch(() => false);
      if (screenReaderOn && confirmLabel) announce(confirmLabel);
      timeoutRef.current = setTimeout(
        () => {
          resetFlip();
        },
        screenReaderOn ? 10000 : 2500
      );
    }
  }, [flipAnim, isConfirming, onAction, resetFlip, duration, confirmLabel]);

  const { frontRotateY, backRotateY, frontOpacity, backOpacity } = useMemo(
    () => ({
      frontRotateY: flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }),
      backRotateY: flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] }),
      frontOpacity: flipAnim.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [1, 1, 0, 0] }),
      backOpacity: flipAnim.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [0, 0, 1, 1] })
    }),
    [flipAnim]
  );

  if (!icon) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.iconWrapper}
      accessibilityRole="button"
      accessibilityLabel={isConfirming && confirmLabel ? confirmLabel : accessibilityLabel}
    >
      <Animated.View
        style={[
          styles.iconFace,
          {
            opacity: frontOpacity,
            transform: [{ perspective: 1000 }, { rotateY: frontRotateY }],
            backgroundColor: icon.bg
          }
        ]}
      >
        <Icon name={icon.name} color={icon.color} />
      </Animated.View>

      <Animated.View
        style={[
          styles.iconFace,
          {
            opacity: backOpacity,
            transform: [{ perspective: 1000 }, { rotateY: backRotateY }],
            backgroundColor: MyTheme.primaryAccent
          }
        ]}
      >
        <Icon name={actionIconName} color={MyTheme.background} />
      </Animated.View>
    </TouchableOpacity>
  );
});
ConfirmableIcon.displayName = "ConfirmableIcon";

const styles = StyleSheet.create({
  iconWrapper: {
    marginRight: Spacing.md,
    width: 44,
    height: 44
  },
  iconFace: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing.borderRadius.full
  }
});

export default ConfirmableIcon;
