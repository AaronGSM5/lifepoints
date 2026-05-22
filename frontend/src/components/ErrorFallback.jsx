import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper from "./layout/ScreenWrapper";
import AppText from "./ui/AppText";
import { router } from "expo-router";

export const ErrorFallback = ({ error, resetError }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const handleReload = () => {
    resetError();

    router.replace("/home");
  };
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
              {error?.message?.toString()}
            </AppText>
          </View>
        )}

        <AppButton title="App neu laden" onPress={handleReload} variant="primary" style={{ marginTop: Spacing.xl }} />
      </View>
    </ScreenWrapper>
  );
};

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
    }
  });
