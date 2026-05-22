import React, { useRef } from "react";
import { Pressable, StyleSheet, Animated, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "./AppText";

export default function AppButton({
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
}) {
  const styles = getStyles();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      speed: 500,
      bounciness: 10,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 10,
      useNativeDriver: true
    }).start();
  };

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }], width: fullWidth ? "100%" : undefined }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading }}
        style={({ pressed }) => [
          styles.base,
          styles[size],
          isSecondary && styles.secondary,
          isOutline && styles.outline,
          isGhost && styles.ghost,
          isPrimary && { backgroundColor: MyTheme.primary },
          bgColor && { backgroundColor: bgColor },
          borderStyle && borderStyle,
          (disabled || loading) && styles.disabled
        ]}
      >
        {isPrimary && !disabled && !loading && !bgColor && (
          <LinearGradient
            colors={[MyTheme.secondary, MyTheme.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        {loading ? (
          <ActivityIndicator color={isPrimary ? "#fff" : MyTheme.primaryAccent} />
        ) : (
          <View style={[styles.content, iconPosition === "right" && { flexDirection: "row-reverse" }]}>
            {icon && (
              <View
                style={
                  iconPosition === "center"
                    ? {}
                    : iconPosition === "left"
                      ? { marginRight: Spacing.sm }
                      : { marginLeft: Spacing.sm }
                }
              >
                {icon}
              </View>
            )}

            <AppText
              bold
              style={[
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

const getStyles = () =>
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
    md: { paddingVertical: Spacing.sm + 4, paddingHorizontal: Spacing.lg },
    lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },

    secondary: {
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",
      backgroundColor: "rgba(255,255,255,0.08)"
    },
    outline: {
      borderWidth: 1,
      borderColor: MyTheme.primaryAccent
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
