import React from "react";
// import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";

export default function PrivacyScreen() {
  // const { t } = useTranslation("settings");
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.emoji}>🚧</Text>
        <AppText type="title">Privacy Work in Progress</AppText>
        <AppText type="caption" style={{ textAlign: "center" }}>
          Diese Seite ist im Bau. Sobald das Backend steht, werden hier die Daten angebunden.
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16
  }
});
