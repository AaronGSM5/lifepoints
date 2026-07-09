import { memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

const AppLoadingSpinner = memo(({ size = "large", color, centered = false, style }) => {
  const MyTheme = useAppTheme();
  const spinnerColor = color ?? MyTheme.primaryAccent;

  const spinner = <ActivityIndicator size={size} color={spinnerColor} style={style} />;

  if (centered) {
    return <View style={styles.centeredContainer}>{spinner}</View>;
  }

  return spinner;
});
AppLoadingSpinner.displayName = "AppLoadingSpinner";

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AppLoadingSpinner;
