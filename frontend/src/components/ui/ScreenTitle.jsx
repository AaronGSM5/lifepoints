import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";

const ScreenTitle = memo(({ title, subtitle, align = "left", style, ...props }) => {
  const alignmentStyle = align === "center" ? styles.center : styles.left;
  return (
    <View style={[styles.container, alignmentStyle, style]} {...props}>
      <AppText type="h1" style={styles.title}>
        {title}
      </AppText>
      {subtitle && (
        <AppText type="caption" style={styles.subtitle}>
          {subtitle}
        </AppText>
      )}
    </View>
  );
});
ScreenTitle.displayName = "ScreenTitle";

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl
  },
  left: {
    alignItems: "flex-start"
  },
  center: {
    alignItems: "center"
  },
  title: {
    marginBottom: Spacing.md
  },
  subtitle: {
    fontSize: 15
  }
});

export default ScreenTitle;
