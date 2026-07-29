import React, { memo, useCallback, useMemo, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { LightTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

import AppLoadingSpinner from "./AppLoadingSpinner";
import AppText from "./AppText";

const AppButton = memo(
  ({
    title,
    onPress,
    variant = "primary", // 'primary' | 'secondary' | 'outline' | 'ghost'
    size = "md", // 'sm' | 'md' | 'lg'
    icon, // z.B. <Ionicons ... />
    iconPosition = "left",
    loading = false,
    disabled = false,
    style,
    fullWidth = false,
    textStyle,
    borderStyle,
    bgColor
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const [scaleAnim] = useState(() => new Animated.Value(1));

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        speed: 500,
        bounciness: 10,
        useNativeDriver: true
      }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: 20,
        bounciness: 10,
        useNativeDriver: true
      }).start();
    }, [scaleAnim]);

    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";
    const isOutline = variant === "outline";
    const isGhost = variant === "ghost";

    const iconMarginStyle =
      iconPosition === "left"
        ? { marginRight: Spacing.sm }
        : iconPosition === "right"
          ? { marginLeft: Spacing.sm }
          : {};

    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }], width: fullWidth ? "100%" : undefined }, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          accessibilityRole="button"
          accessibilityState={{ disabled: disabled || loading }}
          style={() => [
            styles.base,
            styles[size],
            isSecondary && styles.secondary,
            isOutline && styles.outline,
            isGhost && styles.ghost,
            bgColor && { backgroundColor: bgColor },
            borderStyle && borderStyle,
            (disabled || loading) && styles.disabled
          ]}
        >
          {isPrimary && !disabled && !loading && !bgColor && (
            <LinearGradient
              colors={[addOpacity(MyTheme.primaryAccent, 1), addOpacity(MyTheme.primaryAccent, 0.75)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          )}

          {loading ? (
            <AppLoadingSpinner size={"small"} color={isPrimary && "#fff"} />
          ) : (
            <View style={[styles.content, iconPosition === "right" && { flexDirection: "row-reverse" }]}>
              {icon && <View style={iconMarginStyle}>{icon}</View>}

              <AppText
                bold
                style={[
                  isPrimary && { color: LightTheme.text },
                  isSecondary && { color: MyTheme.text },
                  isOutline && { color: MyTheme.primaryAccent },
                  isGhost && { color: MyTheme.muted },
                  size === "sm" && { fontSize: 12 },
                  size === "lg" && { fontSize: 16 },
                  textStyle
                ]}
              >
                {title}
              </AppText>
            </View>
          )}
        </Pressable>
      </Animated.View>
    );
  }
);
AppButton.displayName = "AppButton";

const getStyles = (theme) =>
  StyleSheet.create({
    base: {
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "relative"
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
      elevation: 1
    },
    sm: { paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.sm + 4 },
    md: { paddingVertical: Spacing.sm + 2, paddingHorizontal: Spacing.md },
    lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },

    secondary: {
      backgroundColor: theme.glas
    },
    outline: {
      borderWidth: 1,
      borderColor: theme.primaryAccent
    },
    ghost: {
      backgroundColor: "transparent"
    },
    disabled: {
      backgroundColor: "#2A2A2A",
      opacity: 0.5
    },
    iconWrapper: {
      marginRight: Spacing.sm
    }
  });

export default AppButton;
