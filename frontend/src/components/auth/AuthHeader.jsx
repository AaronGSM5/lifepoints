import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";

export default function AuthHeader({ title, subtitle, showImageLogo = false }) {
  const screenWidth = Dimensions.get("window").width;
  const maxLogoWidth = 330;
  const logoWidth = Math.min(screenWidth * 0.75, maxLogoWidth);
  const logoHeight = logoWidth / 3.75;

  return (
    <View style={styles.header}>
      <View style={styles.appIcon}>
        <Image
          source={require("@/../public/assets/appIcons/adaptive-icon.png")}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />
      </View>

      {showImageLogo ? (
        <Image source={require("@/../public/assets/lifepointsLogo.png")} style={{ width: 200 }} resizeMode="contain" />
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
    marginVertical: Spacing.xl,
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
  }
});
