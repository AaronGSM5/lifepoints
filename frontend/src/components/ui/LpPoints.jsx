import React, { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "./AppText";
import LpLogo from "./LpLogo";

const formatPoints = (points) => {
  return Number(points).toLocaleString("de-DE");
};

const SIZE_CONFIG = {
  xs: { iconSize: 24, fontSize: 13 },
  small: { iconSize: 34, fontSize: 16 },
  large: { iconSize: 48, fontSize: 22, lineHeight: 28 },
  medium: { iconSize: 40, fontSize: 16 }
};

const LpPoints = memo(
  ({
    points = 0,
    onPress,
    size = "medium", // 'xs', 'small', 'medium', 'large'
    style
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

    const { iconSize, fontSize, lineHeight } = SIZE_CONFIG[size] || SIZE_CONFIG.medium;

    const content = (
      <View style={styles.badge}>
        <AppText type="caption" bold style={[{ fontSize, lineHeight }, styles.textStyle]}>
          {formatPoints(points)}
        </AppText>
        <LpLogo width={iconSize} height={iconSize} />
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={style}
          accessibilityRole="button"
          accessibilityState={{ disabled: false }}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return <View style={style}>{content}</View>;
  }
);
LpPoints.displayName = "LpPoints";

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

export default LpPoints;
