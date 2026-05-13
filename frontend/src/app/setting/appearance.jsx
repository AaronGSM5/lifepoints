import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/store/useStore";
import { MyTheme } from "@/constants/Colors";
import ScreenTitle from "@/components/ui/ScreenTitle";
import AppText from "@/components/ui/AppText";
import { useTranslation } from "react-i18next";

export default function AppearanceScreen() {
  const styles = getStyles();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const { t } = useTranslation("settings");

  return (
    <View style={[styles.container, { backgroundColor: MyTheme.background }]}>
      <View style={styles.headerContainer}>
        <ScreenTitle title={t("Appearance")} />
        <AppText type="caption" style={{ fontSize: 15 }}>
          {t("Customize the app's design to suit your preferences.")}
        </AppText>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            !isDarkMode && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => {
            if (isDarkMode) toggleDarkMode();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="sunny" size={36} color={isDarkMode ? MyTheme.muted : MyTheme.primaryAccent} />
          <Text style={[styles.cardText, { color: isDarkMode ? MyTheme.muted : MyTheme.text }]}>{t("Bright")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: MyTheme.primary },
            isDarkMode && { borderColor: MyTheme.primaryAccent, borderWidth: 2 }
          ]}
          onPress={() => {
            if (!isDarkMode) toggleDarkMode();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="moon" size={36} color={isDarkMode ? MyTheme.primaryAccent : MyTheme.muted} />
          <Text style={[styles.cardText, { color: isDarkMode ? MyTheme.text : MyTheme.muted }]}>{t("Dark")}</Text>
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
    cardText: {
      marginTop: 16,
      fontSize: 16,
      fontFamily: "Inter-SemiBold"
    }
  });
