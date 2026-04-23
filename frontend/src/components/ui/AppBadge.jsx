import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function AppBadge({
  label,
  emoji,
  iconNode,
  variant = "glas", // primary, secondary, outline, glas
  onPress,
  style,
  textStyle
}) {
  const styles = getStyles();
  const Container = onPress ? TouchableOpacity : View;

  let leftElement = null;

  if (iconNode) {
    leftElement = <View style={[styles.iconContainer, label ? { marginRight: Spacing.xs } : {}]}>{iconNode}</View>;
  } else if (emoji) {
    leftElement = <AppText style={[styles.emoji, label ? { marginRight: 4 } : {}]}>{emoji}</AppText>;
  }

  return (
    <Container onPress={onPress} activeOpacity={0.7} style={[styles.badge, styles[variant], style]}>
      {leftElement}

      {label && (
        <AppText type="caption" bold style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {label.toUpperCase()}
        </AppText>
      )}
    </Container>
  );
}

const getStyles = () =>
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
      letterSpacing: 0.5
    },

    primary: {
      backgroundColor: MyTheme.primaryAccent
    },
    primaryText: {
      color: "#000"
    },

    secondary: {
      backgroundColor: "rgba(0, 255, 127, 0.2)",
      paddingVertical: 2,
      borderRadius: Spacing.borderRadius.sm,
      marginBottom: Spacing.xs,
      borderColor: "rgba(0, 255, 127, 0.8)"
    },
    secondaryText: {
      color: "#00FF7F"
    },

    outline: {
      backgroundColor: "transparent",
      borderColor: "rgba(255,255,255,0.2)"
    },
    outlineText: {
      color: MyTheme.muted
    },

    glas: {
      backgroundColor: MyTheme.glas,
      borderColor: "rgba(255,255,255,0.1)"
    },
    glasText: {
      color: MyTheme.primaryAccent
    }
  });
