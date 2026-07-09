import React, { memo } from "react";
import { Pressable, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@/hooks/useAppTheme";

import { IconMap } from "./iconMap";

export const Icon = memo(({ name, size = 24, color, outline = true, style, onPress, ...rest }) => {
  const MyTheme = useAppTheme();
  const iconColor = color ?? (MyTheme.isDark ? "white" : "black");
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
    return (
      <Pressable onPress={onPress} hitSlop={15} style={style}>
        {renderIcon()}
      </Pressable>
    );
  }

  return <View style={style}>{renderIcon()}</View>;
});

Icon.displayName = "Icon";
