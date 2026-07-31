import React from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";

export default function ScreenFooter({ children, style, breakOut = false }) {
  return <View style={[styles.footer, breakOut && styles.breakOut, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    justifyContent: "flex-end"
  },
  breakOut: {
    marginHorizontal: -Spacing.md
  }
});
