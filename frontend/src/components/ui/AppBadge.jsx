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
    variant = "glas", // primary (Status), hot (Live/Streak/Neu), premium (Plus/Level), outline, glas
    onPress,
    style,
    textStyle
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

    const variantKey = styles[variant] ? variant : "glas";
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
          <AppText type="labelSm" style={[styles[`${variantKey}Text`], textStyle]}>
            {label}
          </AppText>
        )}
      </>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.badge, styles[variantKey], style]}>
          {content}
        </TouchableOpacity>
      );
    }

    return <View style={[styles.badge, styles[variantKey], style]}>{content}</View>;
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
    primary: {
      backgroundColor: theme.primaryAccent
    },
    primaryText: {
      color: theme.onPrimaryAccent
    },

    hot: {
      backgroundColor: addOpacity(theme.secondaryAccent, 0.12),
      borderColor: addOpacity(theme.secondaryAccent, 0.4)
    },
    hotText: {
      color: theme.secondaryAccent
    },

    premium: {
      backgroundColor: addOpacity(theme.gold, 0.12),
      borderColor: addOpacity(theme.gold, 0.5)
    },
    premiumText: {
      color: theme.gold
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
      color: theme.primaryAccent
    }
  });

export default AppBadge;
