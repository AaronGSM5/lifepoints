import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const ScreenTitle = memo(({ title, subtitle, align = "left", style, ...props }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const alignmentStyle = align === "center" ? styles.center : styles.left;
  const textAlignmentStyle = { textAlign: align };
  return (
    <View style={[styles.container, alignmentStyle, style]} {...props}>
      <AppText type="h1" style={[styles.title, textAlignmentStyle]}>
        {title}
      </AppText>
      {subtitle && <AppText style={[styles.subtitle, textAlignmentStyle]}>{subtitle}</AppText>}
    </View>
  );
});
ScreenTitle.displayName = "ScreenTitle";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.lg
    },
    left: {
      alignItems: "flex-start"
    },
    center: {
      alignItems: "center"
    },
    title: {
      marginBottom: Spacing.sm
    },
    subtitle: {
      color: theme.muted
    }
  });

export default ScreenTitle;
