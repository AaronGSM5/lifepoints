import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

const Separator = memo(
  ({ orientation = "horizontal", margin = 0, color, thickness = StyleSheet.hairlineWidth, style }) => {
    const theme = useAppTheme();
    const isHorizontal = orientation === "horizontal";

    const dynamicStyles = useMemo(
      () => ({
        backgroundColor: color || theme.separator,
        ...(isHorizontal
          ? {
              height: thickness,
              width: "100%",
              marginVertical: margin
            }
          : {
              width: thickness,
              height: "100%",
              marginHorizontal: margin
            })
      }),
      [color, isHorizontal, margin, theme.separator, thickness]
    );

    return <View style={[dynamicStyles, style]} />;
  }
);

Separator.displayName = "Separator";

export default Separator;
