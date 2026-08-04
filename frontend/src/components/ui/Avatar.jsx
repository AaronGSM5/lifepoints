import React from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppImage from "./AppImage";
import AppText from "./AppText";

const Avatar = ({
  source,
  name = "",
  size = "medium", // "small", "medium", "big"
  style
}) => {
  const MyTheme = useAppTheme();

  const sizeToVariant = {
    small: "avatarSmall",
    medium: "avatarMedium",
    big: "avatarBig"
  };

  const variant = sizeToVariant[size] || "avatarMedium";

  const getInitial = (name) => {
    if (!name) return "";
    return name.trim().charAt(0).toUpperCase();
  };

  const dimensions = {
    small: { width: 36, height: 36, fontSize: 14 },
    medium: { width: 40, height: 40, fontSize: 16 },
    big: { width: 120, height: 120, fontSize: 40 }
  }[size];

  if (!source) {
    return (
      <View
        style={[
          styles.fallbackContainer,
          {
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: MyTheme.primary
          },
          style
        ]}
      >
        <AppText type={"title"} style={{ fontSize: dimensions.fontSize, color: MyTheme.background }}>
          {getInitial(name)}
        </AppText>
      </View>
    );
  }

  return <AppImage source={source} variant={variant} style={style} showSkeleton={true} />;
};

const styles = StyleSheet.create({
  fallbackContainer: {
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }
});

export default Avatar;
