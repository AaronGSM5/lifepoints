import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MyTheme } from "@/constants/Colors";
import ScreenTitle from "@/components/ui/ScreenTitle";
import AppText from "@/components/ui/AppText";

export default function LanguageScreen() {
  const styles = getStyles();

  const [selectedLang, setSelectedLang] = useState("de");

  return (
    <View style={[styles.container, { backgroundColor: MyTheme.background }]}>
      <View style={styles.headerContainer}>
        <ScreenTitle title={"Sprache"} />
        <AppText type="caption" style={{ fontSize: 15 }}>
          Wähle die Sprache aus, in der LifePoints angezeigt werden soll.
        </AppText>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            selectedLang === "de" && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => setSelectedLang("de")}
          activeOpacity={0.8}
        >
          <Text style={styles.flagEmoji}>🇩🇪</Text>
          <Text style={[styles.cardText, { color: selectedLang === "de" ? MyTheme.text : MyTheme.muted }]}>
            Deutsch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            selectedLang === "en" && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => setSelectedLang("en")}
          activeOpacity={0.8}
        >
          <Text style={styles.flagEmoji}>🇬🇧</Text>
          <Text style={[styles.cardText, { color: selectedLang === "en" ? MyTheme.text : MyTheme.muted }]}>
            English
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
    headerContainer: {
      marginBottom: 32,
      marginTop: 16
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
      fontSize: 36,
      marginBottom: 4
    },
    cardText: {
      marginTop: 12,
      fontSize: 16,
      fontFamily: "Inter-SemiBold"
    }
  });
