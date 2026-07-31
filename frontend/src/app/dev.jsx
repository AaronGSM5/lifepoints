import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const navLinks = [
  { title: "Main App", href: "/home" },
  { title: "Onboarding", href: "/(onboarding)" },
  { title: "Mini-Umfrage", href: "/survey" },
  { title: "Register / Login", href: "/auth/register" }
];

export default function DevEntryScreen() {
  const router = useRouter();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const handlePress = useCallback(
    (href) => {
      router.push(href);
    },
    [router]
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText type="h1">LifePoints Dev-Menu</AppText>
          <AppText type="caption">Wähle eine Seite zum Testen:</AppText>
        </View>

        <View style={styles.buttonList}>
          {navLinks.map((link) => (
            <View key={link.href}>
              <AppButton variant={"outline"} title={link.title} onPress={() => handlePress(link.href)} />
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <AppText type="caption" style={styles.footerText}>
            Hinweis: Im fertigen Release wird dieser Screen durch einen automatischen Redirect ersetzt.
          </AppText>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.lg,
      justifyContent: "center"
    },
    header: {
      marginBottom: Spacing.xl,
      alignItems: "center"
    },
    buttonList: {
      gap: Spacing.md
    },
    button: {
      backgroundColor: theme.primary,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.secondary,
      alignItems: "center"
    },
    buttonPressed: {
      backgroundColor: theme.secondary,
      opacity: 0.9
    },
    footer: {
      marginTop: Spacing.xl
    },
    footerText: {
      textAlign: "center"
    }
  });
