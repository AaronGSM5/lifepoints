import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppImage from "./AppImage";
import AppText from "./AppText";

const SIZE_TO_VARIANT = {
  small: "avatarSmall",
  medium: "avatarMedium",
  big: "avatarBig"
};

const DIMENSIONS = {
  small: { width: 36, height: 36, fontSize: 14 },
  medium: { width: 40, height: 40, fontSize: 16 },
  big: { width: 120, height: 120, fontSize: 40 }
};

const getInitial = (name) => {
  if (!name) return "";
  return name.trim().charAt(0).toUpperCase();
};

const Avatar = memo(
  ({
    source,
    name = "",
    size = "medium", // "small", "medium", "big"
    style
  }) => {
    const MyTheme = useAppTheme();

    const variant = SIZE_TO_VARIANT[size] || SIZE_TO_VARIANT.medium;
    const currentDimensions = DIMENSIONS[size] || DIMENSIONS.medium;

    if (!source) {
      return (
        <View
          style={[
            styles.fallbackContainer,
            {
              width: currentDimensions.width,
              height: currentDimensions.height,
              backgroundColor: MyTheme.primary
            },
            style
          ]}
        >
          <AppText type={"title"} style={{ fontSize: currentDimensions.fontSize, color: MyTheme.primaryAccent }}>
            {getInitial(name)}
          </AppText>
        </View>
      );
    }

    return <AppImage source={source} variant={variant} style={style} showSkeleton={true} />;
  }
);
Avatar.displayName = "Avatar";

const styles = StyleSheet.create({
  fallbackContainer: {
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }
});

export default Avatar;
