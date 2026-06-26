import React from "react";
import { View } from "react-native";
import { Icon } from "@/components/icons/Icon";

const LayeredIcon = ({ bottomIcon, topIcon, size = 32, color1, color2 }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
      {/* 2. Das untere Icon */}
      <View style={{ position: "absolute" }}>
        <Icon name={bottomIcon} size={size} color={color1} />
      </View>

      <View style={{ position: "absolute", transform: "translateY(1px)" }}>
        <Icon name={topIcon} size={size * 0.4} color={color2} />
      </View>
    </View>
  );
};

export default LayeredIcon;
