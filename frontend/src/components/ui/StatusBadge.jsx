import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { Icon } from "../icons/Icon";
import { mockCustomizables } from "@/mocks/Customizables";

const StatusBadge = ({ size = 16, id, iconColor, style }) => {
  const points = "50,0 100,25 100,75 50,100 0,75 0,25";
  const badgeData = mockCustomizables.badges.find((badge) => badge.id === id);
  if (!badgeData) return null;
  const { icon, color } = badgeData;
  const iconSize = Math.round(size * 0.6);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Polygon points={points} fill={color} />
      </Svg>

      <View style={styles.iconContainer}>
        <Icon name={icon} size={iconSize} color={iconColor || "#fff"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StatusBadge;
