import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function AuthFooter({ text, linkText, href }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const handlePress = useCallback(() => {
    router.push(href);
  }, [href]);

  return (
    <View style={styles.footer}>
      <AppText type="caption">
        {text + " "}
        <AppText type="caption" bold onPress={handlePress} style={{ color: MyTheme.primaryAccent }}>
          {linkText}
        </AppText>
      </AppText>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    footer: {
      marginTop: "auto",
      alignItems: "center",
      marginBottom: Spacing.lg
    }
  });
