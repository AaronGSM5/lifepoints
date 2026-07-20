import React, { memo } from "react";

// eslint-disable-next-line import/no-unresolved
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@/hooks/useAppTheme";

import { IconMap } from "./iconMap";

export const Icon = memo(({ name, size = 24, color, outline = true, style, ...rest }) => {
  const MyTheme = useAppTheme();
  const iconColor = color ?? (MyTheme.isDark ? "white" : "black");
  const IconComponent = IconMap[name];

  if (!IconComponent) {
    if (__DEV__) {
      console.warn(`Icon "${name}" existiert nicht in der IconMap!`);
    }
    return <Ionicons name={"help-circle-outline"} size={size} color={iconColor} style={style} />;
  }

  return <IconComponent size={size} color={iconColor} outline={outline} style={style} {...rest} />;
});

Icon.displayName = "Icon";
