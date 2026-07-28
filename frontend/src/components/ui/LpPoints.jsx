import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "./AppText";
import LpLogo from "./LpLogo";

const formatPoints = (points) => {
  return Number(points).toLocaleString("de-DE");
};

export default function LpPoints({
  points = 0,
  onPress,
  size = "medium", // Erlaubt: 'small', 'medium', 'large'
  style
}) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const isClickable = !!onPress;

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { iconSize: 34, fontSize: 16 };
      case "large":
        return { iconSize: 48, fontSize: 22, lineHeight: 28 };
      case "medium":
      default:
        return { iconSize: 40, fontSize: 16 };
    }
  };

  const { iconSize, fontSize, lineHeight } = getSizeStyles();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!isClickable} style={style}>
      <View style={[styles.badge]}>
        <AppText type="caption" bold style={[{ fontSize: fontSize, lineHeight: lineHeight }, styles.textStyle]}>
          {formatPoints(points)}
        </AppText>
        <LpLogo width={iconSize} height={iconSize} />
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    badge: {
      flexDirection: "row",
      alignItems: "center"
    },
    textStyle: {
      letterSpacing: 0.5,
      color: theme.primaryAccent
    }
  });
