import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const ConfirmableIcon = memo(({ icon, actionIconName, onAction }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

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
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [flipAnim]);

  const handlePress = useCallback(() => {
    if (isConfirming) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onAction();
      resetFlip();
    } else {
      setIsConfirming(true);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();

      timeoutRef.current = setTimeout(() => {
        resetFlip();
      }, 2500);
    }
  }, [flipAnim, isConfirming, onAction, resetFlip]);

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
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={styles.iconWrapper}>
      <Animated.View
        style={[
          styles.iconFace,
          {
            opacity: frontOpacity,
            transform: [{ rotateY: frontRotateY }, { perspective: 1000 }],
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
            transform: [{ rotateY: backRotateY }, { perspective: 1000 }],
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

const getStyles = () =>
  StyleSheet.create({
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
