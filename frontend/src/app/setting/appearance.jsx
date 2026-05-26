import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/store/useStore";
import { useAppTheme } from "@/hooks/useAppTheme";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { useTranslation } from "react-i18next";
import ColorThemePicker from "@/components/settings/ColorThemePicker";
import AppIconPicker from "@/components/settings/AppIconPicker";

export default function AppearanceScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const { t } = useTranslation("settings");

  return (
    <View style={[styles.container, { backgroundColor: MyTheme.background }]}>
      <ScreenTitle title={t("Appearance")} subtitle={t("Customize the app's design to suit your preferences.")} />

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

      <ColorThemePicker />
      <AppIconPicker />
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
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)"
    },
    cardText: {
      marginTop: 16,
      fontSize: 16,
      fontFamily: "Inter-SemiBold"
    }
  });
