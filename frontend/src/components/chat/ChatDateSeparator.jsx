import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function ChatDateSeparator({ label }) {
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  if (!label) return null;

  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <AppText bold type="caption" style={styles.text}>
          {label}
        </AppText>
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      marginVertical: Spacing.md
    },
    pill: {
      backgroundColor: theme.glas,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs - 2,
      borderRadius: Spacing.borderRadius.md
    },
    text: {
      color: theme.text
    }
  });
