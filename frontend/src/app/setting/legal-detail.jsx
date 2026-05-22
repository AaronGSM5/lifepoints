import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { useTranslation } from "react-i18next";

export default function LegalDetailScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { type } = useLocalSearchParams();
  const { t } = useTranslation("settings");

  const LEGAL_CONTENT = {
    impressum: {
      title: "Impressum",
      lastUpdated: "03. März 2026",
      sections: [
        { heading: "Angaben gemäß § 5 TMG", body: "LifePoints GmbH\nMusterstraße 1\n12345 Berlin" },
        { heading: "Vertreten durch", body: "Aaron Gaßmann (Gründer)\nTom Hützen (Gründer)" },
        { heading: "Kontakt", body: "Telefon: +49 (0) 30 1234567\nE-Mail: support@lifepoints-app.com" },
        {
          heading: "Registereintrag",
          body: "Eintragung im Handelsregister.\nRegistergericht: Amtsgericht Charlottenburg\nRegisternummer: HRB 123456 B"
        }
      ]
    },
    privacy: {
      title: "Datenschutz",
      lastUpdated: "15. Februar 2026",
      sections: [
        {
          heading: "1. Datenschutz auf einen Blick",
          body: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese App nutzen."
        },
        {
          heading: "2. Datenerfassung",
          body: "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. bei der Registrierung). Andere Daten werden automatisch durch unsere IT-Systeme erfasst (z.B. Nutzungsdaten)."
        },
        {
          heading: "3. Ihre Rechte",
          body: "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten."
        }
      ]
    },
    terms: {
      title: "Nutzungsbedingungen",
      lastUpdated: "10. Januar 2026",
      sections: [
        {
          heading: "§ 1 Geltungsbereich",
          body: "Diese Bedingungen gelten für die Nutzung der LifePoints App und alle damit verbundenen Dienstleistungen."
        },
        {
          heading: "§ 2 Registrierung",
          body: "Für die Nutzung der vollen Funktionalität ist eine Registrierung unter Angabe korrekter Daten erforderlich."
        },
        {
          heading: "§ 3 LifePoints System",
          body: "LifePoints sind virtuelle Belohnungen ohne direkten Geldwert, die gegen Prämien im Shop eingelöst werden können."
        }
      ]
    },
    licenses: {
      title: "Open Source Lizenzen",
      lastUpdated: "10. Januar 2026",
      sections: [
        {
          heading: "§ 1 Geltungsbereich",
          body: "Diese Bedingungen gelten für die Nutzung der LifePoints App und alle damit verbundenen Dienstleistungen."
        },
        {
          heading: "§ 2 Registrierung",
          body: "Für die Nutzung der vollen Funktionalität ist eine Registrierung unter Angabe korrekter Daten erforderlich."
        },
        {
          heading: "§ 3 LifePoints System",
          body: "LifePoints sind virtuelle Belohnungen ohne direkten Geldwert, die gegen Prämien im Shop eingelöst werden können."
        }
      ]
    }
  };

  const content = useMemo(() => LEGAL_CONTENT[type] || LEGAL_CONTENT.terms, [type]);

  return (
    <ScreenWrapper scrollable withPaddingTop={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText type="h1">{content.title}</AppText>
          <AppText type="caption" style={styles.dateText}>
            Zuletzt aktualisiert: {content.lastUpdated}
          </AppText>
        </View>

        {content.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <AppText type="title" style={styles.heading}>
              {section.heading}
            </AppText>
            <AppText style={styles.bodyText}>{section.body}</AppText>
          </View>
        ))}

        <View style={styles.spacer} />
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: Spacing.xl
    },
    header: {
      marginBottom: Spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: theme.text,
      paddingBottom: Spacing.md
    },
    dateText: {
      marginTop: Spacing.xs
    },
    section: {
      marginBottom: Spacing.lg
    },
    heading: {
      marginBottom: Spacing.sm
    },
    bodyText: {
      fontSize: 14
    },
    spacer: {
      height: Spacing.xl * 2
    }
  });
