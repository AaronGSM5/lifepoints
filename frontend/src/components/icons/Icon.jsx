import React from "react";
import { View } from "react-native";
import { IconMap } from "./iconMap";
import { Ionicons } from "@expo/vector-icons";

export const Icon = ({ name, size = 24, color = "white", outline = true, style, ...rest }) => {
  const IconComponent = IconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" existiert nicht in der IconMap!`);
    return <Ionicons name={"help-circle-outline"} size={size} color={color} />;
  }

  return (
    <View style={style}>
      <IconComponent size={size} color={color} outline={outline} {...rest} />
    </View>
  );
};
