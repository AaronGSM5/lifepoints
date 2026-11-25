import React, { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";

import AppText from "./AppText";

const AppBadge = memo(
  ({
    label,
    emoji,
    iconNode,
    variant = "glas", // primary, secondary, outline, glas
    onPress,
    style,
    textStyle,
    accessibilityLabel
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

    let leftElement = null;

    if (iconNode) {
      leftElement = <View style={[styles.iconContainer, label && { marginRight: Spacing.xs }]}>{iconNode}</View>;
    } else if (emoji) {
      leftElement = <AppText style={[styles.emoji, label && { marginRight: Spacing.xs }]}>{emoji}</AppText>;
    }

    const content = (
      <>
        {leftElement}
        {label && (
          <AppText type="caption" bold style={[styles.text, styles[`${variant}Text`], textStyle]}>
            {label}
          </AppText>
        )}
      </>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={[styles.badge, styles[variant], style]}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel || label}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.badge, styles[variant], style]} accessible accessibilityLabel={accessibilityLabel || label}>
        {content}
      </View>
    );
  }
);
AppBadge.displayName = "AppBadge";

const getStyles = (theme) =>
  StyleSheet.create({
    badge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: Spacing.borderRadius?.full || 99,
      borderWidth: 1,
      borderColor: "transparent"
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    emoji: {
      fontSize: 14
    },
    text: {
      fontSize: 13,
      letterSpacing: 0.5,
      textTransform: "uppercase"
    },

    primary: {
      backgroundColor: theme.primaryAccent
    },
    primaryText: {
      color: theme.onAccent
    },

    secondary: {
      backgroundColor: addOpacity(theme.completion, 0.2),
      paddingVertical: 2,
      borderRadius: theme.radius.sm,
      marginBottom: Spacing.xs,
      borderColor: addOpacity(theme.completion, 0.8)
    },
    secondaryText: {
      color: theme.completion
    },

    outline: {
      backgroundColor: "transparent",
      borderColor: theme.separator
    },
    outlineText: {
      color: theme.muted
    },

    glas: {
      backgroundColor: theme.background,
      borderColor: theme.separator
    },
    glasText: {
      color: theme.primaryAccentText
    }
  });

export default AppBadge;
