import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { useTranslation } from "react-i18next";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

export default function LanguageScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t, i18n } = useTranslation("settings");

  const selectedLang = i18n.language;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ScreenWrapper>
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
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
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
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)"
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
