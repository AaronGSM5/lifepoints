import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mockCustomizables } from "@/mocks/Customizables";

export default function StatusBadge({ id, size = 16 }) {
  const badgeData = mockCustomizables.badges.find((badge) => badge.id === id);

  if (!badgeData) return null;

  const { icon, color } = badgeData;
  const iconSize = Math.round(size * 0.7);

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: color || "#bdc3c7",
          width: size,
          height: size,
          borderRadius: size / 2
        }
      ]}
    >
      <MaterialCommunityIcons name={icon} size={iconSize} color="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 1px 0.2 #000"
  }
});
