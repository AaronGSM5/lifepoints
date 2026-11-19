import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const HEIGHTS = {
  strip: 4,
  bar: 8
};

/**
 * Einheitlicher Fortschrittsbalken.
 *  - variant "strip": 4px, ohne Rundung, für den unteren Rand von Karten (wie RoutineCard)
 *  - variant "bar":   8px, abgerundet, freistehend (Guide, Quests)
 * `progress` ist ein Prozentwert von 0 bis 100.
 */
const ProgressBar = memo(({ progress = 0, variant = "bar", color, style, accessibilityLabel }) => {
  const MyTheme = useAppTheme();
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);
  const height = HEIGHTS[variant] ?? HEIGHTS.bar;
  const isBar = variant === "bar";

  const trackStyle = useMemo(
    () => ({
      height,
      backgroundColor: MyTheme.separator,
      borderRadius: isBar ? Spacing.borderRadius.full : 0
    }),
    [height, isBar, MyTheme.separator]
  );

  return (
    <View
      style={[styles.track, trackStyle, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(safeProgress) }}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${safeProgress}%`,
            backgroundColor: color || MyTheme.primaryAccent,
            borderRadius: isBar ? Spacing.borderRadius.full : 0,
            borderTopRightRadius: isBar ? Spacing.borderRadius.full : height / 2,
            borderBottomRightRadius: isBar ? Spacing.borderRadius.full : height / 2
          }
        ]}
      />
    </View>
  );
});
ProgressBar.displayName = "ProgressBar";

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden"
  },
  fill: {
    height: "100%"
  }
});

export default ProgressBar;
