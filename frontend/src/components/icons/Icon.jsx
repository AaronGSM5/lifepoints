import React, { memo } from "react";
import { Pressable, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@/hooks/useAppTheme";

import { IconMap } from "./iconMap";

export const Icon = memo(
  ({ name, size = 24, color, outline = true, style, onPress, accessibilityLabel, accessibilityHint, ...rest }) => {
    const MyTheme = useAppTheme();
    const iconColor = color ?? MyTheme.text;
    const IconComponent = IconMap[name];

    const renderIcon = () => {
      if (!IconComponent) {
        if (__DEV__) {
          console.warn(`Icon "${name}" existiert nicht in der IconMap!`);
        }
        return <Ionicons name={"help-circle-outline"} size={size} color={iconColor} />;
      }
      return <IconComponent size={size} color={iconColor} outline={outline} {...rest} />;
    };

    if (onPress) {
      if (__DEV__ && !accessibilityLabel) {
        console.warn(`Klickbares Icon "${name}" hat kein accessibilityLabel.`);
      }
      return (
        <Pressable
          onPress={onPress}
          hitSlop={15}
          style={style}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        >
          {renderIcon()}
        </Pressable>
      );
    }

    // Rein dekorative Icons werden vor Screenreadern verborgen.
    return (
      <View
        style={style}
        accessible={Boolean(accessibilityLabel)}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityLabel ? "image" : undefined}
        importantForAccessibility={accessibilityLabel ? "auto" : "no-hide-descendants"}
      >
        {renderIcon()}
      </View>
    );
  }
);

Icon.displayName = "Icon";
