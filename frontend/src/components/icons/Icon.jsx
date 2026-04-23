import React from "react";
import { View } from "react-native";
import { IconMap } from "./iconMap";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/store/useStore";

export const Icon = ({ name, size = 24, color, outline = true, style, ...rest }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const iconColor = color ? color : isDarkMode ? "white" : "black";
  const IconComponent = IconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" existiert nicht in der IconMap!`);
    return <Ionicons name={"help-circle-outline"} size={size} color={iconColor} />;
  }

  return (
    <View style={style}>
      <IconComponent size={size} color={iconColor} outline={outline} {...rest} />
    </View>
  );
};
