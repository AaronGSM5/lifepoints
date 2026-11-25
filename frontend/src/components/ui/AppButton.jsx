import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { addOpacity } from "@/utils/colorHelpers";

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
    bgColor,
    accessibilityLabel
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const [scaleAnim] = useState(() => new Animated.Value(1));
    const reduceMotion = useReducedMotion();

    const handlePressIn = useCallback(() => {
      if (reduceMotion) return;
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        speed: 500,
        bounciness: 10,
        useNativeDriver: Platform.OS !== "web"
      }).start();
    }, [scaleAnim, reduceMotion]);

    const handlePressOut = useCallback(() => {
      if (reduceMotion) return;
      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: 20,
        bounciness: 10,
        useNativeDriver: Platform.OS !== "web"
      }).start();
    }, [scaleAnim, reduceMotion]);

    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";
    const isOutline = variant === "outline";
    const isGhost = variant === "ghost";
    const isDisabled = disabled || loading;
    const isIconOnly = Boolean(icon) && !title;

    // Haptik-Token: optionale 3D-Unterkante (z. B. "Duolingo Tactile" für alle, "Hybrid Tactile" nur Primary)
    const depthScope = MyTheme.buttonDepthScope;
    const hasDepth =
      MyTheme.buttonDepth > 0 &&
      !isDisabled &&
      !isGhost &&
      (depthScope === "all" || (depthScope === "primary" && isPrimary));

    useEffect(() => {
      if (__DEV__ && isIconOnly && !accessibilityLabel) {
        const iconName = icon?.props?.name ? ` (Icon: "${icon.props.name}")` : "";
        console.warn(
          `[AppButton] Icon-Only-Button${iconName} hat kein "accessibilityLabel". Bitte ergänze eine Beschreibung für Screenreader.`
        );
      }
    }, [isIconOnly, accessibilityLabel, icon]);

    const getTextColor = () => {
      if (disabled) return MyTheme.muted;
      if (isPrimary) return MyTheme.onAccent;
      if (isSecondary) return MyTheme.text;
      if (isOutline) return MyTheme.primaryAccent;
      if (isGhost) return MyTheme.muted;
      return MyTheme.text;
    };

    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }], width: fullWidth ? "100%" : undefined }, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          hitSlop={isIconOnly && size === "sm" ? 8 : undefined}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel || title}
          accessibilityState={{ disabled: isDisabled, busy: loading }}
          style={({ pressed }) => [
            styles.base,
            styles[size],
            isIconOnly && styles[`${size}IconOnly`],
            isPrimary && !bgColor && styles.primary,
            isSecondary && styles.secondary,
            isOutline && styles.outline,
            isGhost && styles.ghost,
            hasDepth && (isPrimary ? styles.depthPrimary : styles.depthNeutral),
            // Taktiles Eindrücken: Unterkante schrumpft, Button rutscht nach unten (Höhe bleibt stabil)
            hasDepth && pressed && styles.depthPressed,
            bgColor && { backgroundColor: bgColor },
            borderStyle && borderStyle,
            isDisabled && styles.disabled
          ]}
        >
          {isPrimary && !isDisabled && !bgColor && MyTheme.buttonGradient && (
            <LinearGradient
              colors={[addOpacity(MyTheme.primaryAccent, 1), addOpacity(MyTheme.primaryAccent, 0.75)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          )}

          {loading ? (
            <AppLoadingSpinner size={"small"} color={isPrimary ? MyTheme.onAccent : undefined} />
          ) : (
            <View style={[styles.content, iconPosition === "right" && styles.contentReverse]}>
              {icon && icon}

              {Boolean(title) && (
                <AppText
                  bold
                  style={[
                    { color: getTextColor() },
                    size === "sm" && { fontSize: 12 },
                    size === "lg" && { fontSize: 16 },
                    textStyle
                  ]}
                >
                  {title}
                </AppText>
              )}
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
      borderRadius: theme.buttonRadius,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      position: "relative"
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.sm,
      zIndex: 1,
      elevation: 1
    },
    contentReverse: {
      flexDirection: "row-reverse"
    },
    sm: { paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.sm + 4 },
    md: { paddingVertical: Spacing.sm + 2, paddingHorizontal: Spacing.md },
    lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
    smIconOnly: { width: 32, height: 32, paddingHorizontal: 0, paddingVertical: 0 },
    mdIconOnly: { width: 42, height: 42, paddingHorizontal: 0, paddingVertical: 0 },
    lgIconOnly: { width: 52, height: 52, paddingHorizontal: 0, paddingVertical: 0 },
    primary: {
      backgroundColor: theme.primaryAccent
    },
    depthPrimary: {
      borderBottomWidth: theme.buttonDepth,
      borderBottomColor: theme.buttonDepthColor
    },
    depthNeutral: {
      borderBottomWidth: theme.buttonDepth,
      borderBottomColor: theme.borderStrong ?? theme.separator
    },
    depthPressed: {
      borderBottomWidth: 1,
      marginTop: Math.max(theme.buttonDepth - 1, 0)
    },
    secondary: {
      backgroundColor: theme.glas,
      borderWidth: theme.cardBorderWidth,
      borderColor: theme.cardBorderColor
    },
    outline: {
      borderWidth: 1,
      borderColor: theme.primaryAccent
    },
    ghost: {
      backgroundColor: "transparent"
    },
    disabled: {
      backgroundColor: theme.separator,
      opacity: 0.7
    }
  });

export default AppButton;
