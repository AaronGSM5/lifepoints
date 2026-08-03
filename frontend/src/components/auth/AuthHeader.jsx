import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

import { router } from "expo-router";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";

import AppImage from "../ui/AppImage";

export default function AuthHeader({ title, subtitle, showImageLogo = false }) {
  const { width } = useWindowDimensions();

  const logoDimensions = useMemo(() => {
    const maxLogoWidth = 330;
    const logoWidth = Math.min(width * 0.75, maxLogoWidth);
    const logoHeight = logoWidth / 3.75;
    return { width: logoWidth, height: logoHeight };
  }, [width]);

  const handleNavToDev = useCallback(() => router.push("/dev"), []);

  return (
    <View style={styles.header}>
      <View style={styles.appIcon}>
        <AppImage
          source={require("@/../public/assets/appIcons/adaptive-icon.png")}
          style={logoDimensions}
          contentFit={"contain"}
        />
      </View>

      {showImageLogo ? (
        <Pressable onPress={handleNavToDev}>
          <AppImage
            source={require("@/../public/assets/lifepointsLogo.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
        </Pressable>
      ) : (
        <AppText type="h1" style={styles.headerText}>
          {title}
        </AppText>
      )}

      <AppText type="caption" style={styles.subtitle}>
        {subtitle}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    alignItems: "center"
  },
  appIcon: {
    marginTop: Spacing.lg
  },
  headerText: {
    marginTop: Spacing.xs
  },
  subtitle: {
    marginTop: Spacing.sm,
    opacity: 0.7
  },
  logoImage: {
    width: 200,
    height: 60
  }
});
