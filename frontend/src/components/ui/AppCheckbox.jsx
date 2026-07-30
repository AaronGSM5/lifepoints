import React, { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

const AppCheckbox = memo(({ checked, onPress, borderColor, size = 24, style }) => {
  const MyTheme = useAppTheme();
  borderColor = borderColor || MyTheme.muted;
  const styles = useMemo(() => getStyles(MyTheme, size, borderColor), [MyTheme, size, borderColor]);

  const content = (
    <View style={[styles.checkbox, checked ? styles.checked : styles.unchecked, style]}>
      {checked && <Icon name="checkmark" size={size * 0.65} color={MyTheme.primaryAccent} />}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
});

AppCheckbox.displayName = "AppCheckbox";

const getStyles = (theme, size, borderColor) => {
  return StyleSheet.create({
    checkbox: {
      width: size,
      height: size,
      borderRadius: 7,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center"
    },
    unchecked: {
      borderColor: borderColor,
      backgroundColor: "transparent"
    },
    checked: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.1)
    }
  });
};

export default AppCheckbox;
