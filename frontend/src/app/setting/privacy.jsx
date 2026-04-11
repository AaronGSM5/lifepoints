import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";

export default function PrivacyScreen() {
  return (
    <ScreenWrapper withPaddingTop={false}>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 10 }}>
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
  emoji: {
    fontSize: 48,
    marginBottom: 16
  }
});
