import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MyTheme } from "@/constants/Colors";
import ScreenTitle from "@/components/ui/ScreenTitle";
import AppText from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

export default function LanguageScreen() {
  const styles = getStyles();
  const { t, i18n } = useTranslation("settings");

  const selectedLang = i18n.language;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={[styles.container, { backgroundColor: MyTheme.background }]}>
      <ScreenTitle
        title={t("Language & Region")}
        subtitle={t("Select the language in which you want LifePoints to be displayed.")}
      />

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            selectedLang === "de" && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => changeLanguage("de")}
          activeOpacity={0.8}
        >
          <Text style={styles.flagEmoji}>🇩🇪</Text>
          <Text style={[styles.cardText, { color: selectedLang === "de" ? MyTheme.text : MyTheme.muted }]}>
            {t("German")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            selectedLang === "en" && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => changeLanguage("en")}
          activeOpacity={0.8}
        >
          <Text style={styles.flagEmoji}>🇬🇧</Text>
          <Text style={[styles.cardText, { color: selectedLang === "en" ? MyTheme.text : MyTheme.muted }]}>
            {t("English")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16
    },
    card: {
      flex: 1,
      paddingVertical: 32,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2
    },
    flagEmoji: {
      fontSize: 36
    },
    cardText: {
      marginTop: 12,
      fontSize: 16,
      fontFamily: "Inter-SemiBold"
    }
  });
