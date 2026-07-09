import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

const BaseCard = memo(({ children, onPress, style, padding = Spacing.md, disabled = false }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const containerStyle = useMemo(() => [styles.card, { padding }, style], [styles.card, padding, style]);

  if (onPress) {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{children}</View>;
});
BaseCard.displayName = "BaseCard";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: addOpacity(theme.primary, 0.6),
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 1,
      borderColor: addOpacity(theme.secondary, 0.7),
      overflow: "hidden"
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }]
    }
  });

export default BaseCard;
