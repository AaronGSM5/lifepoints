import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import ScreenWrapper from "./layout/ScreenWrapper";

export const ErrorFallback = memo(({ error, resetError }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const handleReload = useCallback(() => {
    if (resetError) resetError();
    router.replace("/home");
  }, [resetError]);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Icon name="infoCircle" size={80} color={MyTheme.warning} />

        <AppText type="title" style={styles.title}>
          Da ist was schiefgelaufen.
        </AppText>

        <AppText type="caption" style={styles.description}>
          Ein unerwarteter Fehler ist aufgetreten.
        </AppText>

        {__DEV__ && (
          <View style={styles.errorBox}>
            <AppText type="caption" style={styles.errorText}>
              {error?.message || error?.toString() || "Unbekannter Fehler"}
            </AppText>
          </View>
        )}

        <AppButton title="App neu laden" onPress={handleReload} style={styles.reloadButton} />
      </View>
    </ScreenWrapper>
  );
});
ErrorFallback.displayName = "ErrorFallback";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      fontSize: 22,
      color: theme.text,
      marginTop: Spacing.md,
      marginBottom: Spacing.sm,
      textAlign: "center"
    },
    description: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: Spacing.lg
    },
    errorBox: {
      backgroundColor: "#ffdddd",
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.md,
      width: "100%"
    },
    errorText: {
      color: theme.warning,
      fontFamily: "monospace"
    },
    reloadButton: {
      marginTop: Spacing.xl
    }
  });
