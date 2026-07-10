import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import SelectableOptionCard from "@/components/ui/SelectableOptionCard";

export default function LanguageScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t, i18n } = useTranslation("settings");

  const selectedLang = i18n.language;

  const changeLanguage = useCallback((lang) => {
    i18n.changeLanguage(lang);
  }, [])

  return (
    <ScreenWrapper>
      <ScreenTitle
        title={t("Language & Region")}
        subtitle={t("Select the language in which you want LifePoints to be displayed.")}
      />
      <View style={styles.container}>
        
        <SelectableOptionCard label={t("German")} isSelected={selectedLang === "de"} onPress={() => changeLanguage("de")}>
          <Text style={styles.flagEmoji}>🇩🇪</Text>
        </SelectableOptionCard>
        
        <SelectableOptionCard label={t("English")} isSelected={selectedLang === "en"} onPress={() => changeLanguage("en")}>
          <Text style={styles.flagEmoji}>🇬🇧</Text>
        </SelectableOptionCard>
      
      </View>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Spacing.md
    },
    flagEmoji: {
      fontSize: 36
    },
  });
