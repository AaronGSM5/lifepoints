import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const AuthFooter = memo(({ text, linkText, href }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const handlePress = useCallback(() => {
    router.push(href);
  }, [href]);

  return (
    <View style={styles.footer}>
      <AppText type="caption">
        {text + " "}
        <AppText type="caption" bold onPress={handlePress} style={styles.linkText}>
          {linkText}
        </AppText>
      </AppText>
    </View>
  );
});
AuthFooter.displayName = "AuthFooter";

const getStyles = (theme) =>
  StyleSheet.create({
    footer: {
      marginTop: "auto",
      alignItems: "center",
      marginBottom: Spacing.lg
    },
    linkText: {
      color: theme.primaryAccent
    }
  });

export default AuthFooter;
