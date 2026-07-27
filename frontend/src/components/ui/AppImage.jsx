import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppSkeleton from "./AppSkeleton";
import { Icon } from "../icons/Icon";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const AppImage = memo(
  ({
    source,
    style,
    contentFit = "cover",
    variant = "custom", // "avatarSmall", "feed", "hero", "custom"
    showSkeleton = true, // if false it shows blurhash
    fallbackSource,
    ...props
  }) => {
    const theme = useAppTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const formattedSource = typeof source === "string" ? { uri: source } : source;
    const finalSource = hasError && fallbackSource ? fallbackSource : formattedSource;

    const variantStyles =
      {
        avatarSmall: { width: 36, height: 36, borderRadius: Spacing.borderRadius.full },
        avatarMedium: { width: 40, height: 40, borderRadius: Spacing.borderRadius.full },
        avatarBig: { width: 120, height: 120, borderRadius: Spacing.borderRadius.full },
        communityBanner: { width: "100%", height: 180 },
        fill: { flex: 1, width: "100%", height: "100%" },
        lootGameTrigger: { width: 90, height: 90 },
        custom: {}
      }[variant] || {};

    const combinedStyle = StyleSheet.flatten([styles.base, variantStyles, style]);

    const skeletonRadius = combinedStyle.borderRadius || 0;

    return (
      <View style={combinedStyle}>
        <Image
          style={StyleSheet.absoluteFillObject}
          source={finalSource}
          contentFit={contentFit}
          placeholder={blurhash}
          transition={300}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          {...props}
        />

        {isLoading && !hasError && showSkeleton && (
          <View style={StyleSheet.absoluteFillObject}>
            <AppSkeleton height="100%" radius={skeletonRadius} />
          </View>
        )}

        {hasError && !fallbackSource && (
          <View style={[StyleSheet.absoluteFillObject, styles.errorContainer, { backgroundColor: theme.separator }]}>
            <Icon name={"fileDamage"} />
          </View>
        )}
      </View>
    );
  }
);

AppImage.displayName = "AppImage";

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "transparent"
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AppImage;
