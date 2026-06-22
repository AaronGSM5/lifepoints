import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { addOpacity } from "@/utils/addOpacity";

export default function TermsScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const router = useRouter();

  const legalItems = [
    {
      id: "impressum",
      title: "Impressum",
      icon: "infoCircle",
      description: "Gesetzliche Anbieterkennung"
    },
    {
      id: "privacy",
      title: "Datenschutzerklärung",
      icon: "shield",
      description: "Wie wir deine Daten schützen"
    },
    {
      id: "terms",
      title: "Nutzungsbedingungen",
      icon: "fileText",
      description: "AGB und Spielregeln"
    },
    {
      id: "licenses",
      title: "Open Source Lizenzen",
      icon: "code",
      description: "Verwendete Bibliotheken"
    }
  ];

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <AppText type="h1">Rechtliches</AppText>
        <AppText type="caption" style={styles.subtitle}>
          Hier findest du alle wichtigen Informationen zu LifePoints und dem Schutz deiner Privatsphäre.
        </AppText>
      </View>

      <View style={styles.listContainer}>
        {legalItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => router.push(`/setting/legal-detail?type=${item.id}`)}
          >
            <View style={[styles.iconBackground, { backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1) }]}>
              <Icon name={item.icon} size={22} color={MyTheme.primaryAccent} />
            </View>

            <View style={styles.textContainer}>
              <AppText bold>{item.title}</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                {item.description}
              </AppText>
            </View>

            <Icon name="right" size={18} color={MyTheme.muted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <AppText type="caption" style={styles.footerText}>
          LifePoints App Version 1.0.0 (Build 42)
        </AppText>
        <AppText type="caption" style={styles.footerText}>
          © 2026 LifePoints GmbH. Alle Rechte vorbehalten.
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingVertical: Spacing.lg
    },
    subtitle: {
      marginTop: Spacing.sm
    },
    listContainer: {
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.secondary
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.secondary
    },
    iconBackground: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md
    },
    textContainer: {
      flex: 1
    },
    footer: {
      marginTop: Spacing.xl,
      alignItems: "center",
      gap: 4
    },
    footerText: {
      color: theme.muted
    }
  });
