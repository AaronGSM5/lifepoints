import React, { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";

const AppCheckbox = memo(({ checked, onPress, borderColor, size = 24, style }) => {
  const MyTheme = useAppTheme();
  borderColor = borderColor || MyTheme.muted;
  const styles = useMemo(() => getStyles(MyTheme, size), [MyTheme, size]);
  const resolvedBorderColor = borderColor || MyTheme.muted;

  const content = (
    <View
      style={[
        styles.checkbox,
        checked ? styles.checked : [styles.unchecked, { borderColor: resolvedBorderColor }],
        style
      ]}
    >
      {checked && <Icon name="checkmark" size={size * 0.65} color={MyTheme.completionText} />}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View accessibilityRole="checkbox" accessibilityState={{ checked }}>
      {content}
    </View>
  );
});

AppCheckbox.displayName = "AppCheckbox";

const getStyles = (theme, size) => {
  return StyleSheet.create({
    checkbox: {
      width: size,
      height: size,
      borderRadius: Math.max(theme.radius.sm - 1, 3),
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center"
    },
    unchecked: {
      backgroundColor: "transparent"
    },
    checked: {
      borderColor: theme.completion,
      backgroundColor: addOpacity(theme.completion, 0.12)
    }
  });
};

export default AppCheckbox;
