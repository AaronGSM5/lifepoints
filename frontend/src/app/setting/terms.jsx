import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

export default function TermsScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const router = useRouter();

  const legalItems = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <ScreenWrapper scrollable>
      <ScreenTitle
        title={"Rechtliches"}
        subtitle={"Hier findest du alle wichtigen Informationen zu LifePoints und dem Schutz deiner Privatsphäre."}
      />

      <View style={styles.listContainer}>
        {legalItems.map((item) => (
          <BaseCard
            key={item.id}
            style={styles.listItem}
            onPress={() => router.push(`/setting/legal-detail?type=${item.id}`)}
          >
            <View style={[styles.iconBackground, { backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1) }]}>
              <Icon name={item.icon} color={MyTheme.primaryAccent} />
            </View>

            <View style={styles.textContainer}>
              <AppText bold>{item.title}</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                {item.description}
              </AppText>
            </View>

            <Icon name="right" size={18} color={MyTheme.muted} />
          </BaseCard>
        ))}
      </View>

      <View style={styles.footer}>
        <AppText type="caption">LifePoints App Version 1.0.0 (Build 42)</AppText>
        <AppText type="caption">© 2026 LifePoints GmbH. All rights reserved.</AppText>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    contentContainer: {
      justifyContent: "space-between"
    },
    listContainer: {
      gap: Spacing.md
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center"
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
      gap: Spacing.xs
    }
  });
