import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";
import { triggerHaptic } from "@/utils/haptics";

import ScreenWrapper from "./layout/ScreenWrapper";

export const ErrorFallback = memo(({ error, resetError }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");

  useEffect(() => {
    triggerHaptic("error");
    if (!__DEV__) {
      console.error("Production Error Captured:", error);
    }
  }, [error]);

  const handleReload = useCallback(() => {
    triggerHaptic();
    if (resetError) resetError();
    router.replace("/home");
  }, [resetError]);

  const handleSupport = useCallback(() => {
    triggerHaptic();
    console.log("Support kontaktieren");
  }, []);

  return (
    <ScreenWrapper withToolbar={false}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.iconWrapper}>
          <Icon name="infoCircle" size={72} color={MyTheme.warning} />
        </View>

        <AppText type="h2" style={styles.title} bold>
          {t("Hoppla, das lief nicht nach Plan.")}
        </AppText>

        <AppText type="caption" style={styles.description}>
          {t(
            "Ein unerwarteter Fehler ist aufgetreten.\nKeine Sorge, dein Fortschritt in LifePoints ist sicher gespeichert."
          )}
        </AppText>

        {__DEV__ && error && (
          <View style={styles.errorBox}>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
              <AppText bold type="caption" style={styles.errorText}>
                {error.message || error.toString() || "Unknown error"}
              </AppText>
            </ScrollView>
          </View>
        )}

        <View style={styles.buttonGroup}>
          <AppButton title={t("App neu laden")} onPress={handleReload} />
          <AppButton title={t("Support kontaktieren")} onPress={handleSupport} variant="outline" />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
});

ErrorFallback.displayName = "ErrorFallback";

const getStyles = (theme) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xl
    },
    iconWrapper: {
      marginBottom: Spacing.lg,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.separator
    },
    title: {
      textAlign: "center",
      marginBottom: Spacing.sm
    },
    description: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: Spacing.xl,
      lineHeight: 22
    },
    errorBox: {
      backgroundColor: theme.separator,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.md,
      maxHeight: 200,
      width: "100%",
      marginBottom: Spacing.xl,
      borderWidth: 1,
      borderColor: addOpacity(theme.warning, 0.5)
    },
    errorText: {
      color: theme.warning
    },
    buttonGroup: {
      width: "100%",
      gap: Spacing.md
    }
  });
