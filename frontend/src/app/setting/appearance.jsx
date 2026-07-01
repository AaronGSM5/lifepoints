import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { Ionicons } from "@expo/vector-icons";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppIconPicker from "@/components/settings/AppIconPicker";
import ColorThemePicker from "@/components/settings/ColorThemePicker";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

export default function AppearanceScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const { t } = useTranslation("settings");

  return (
    <ScreenWrapper scrollable>
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
    cardText: {
      marginTop: 16,
      fontSize: 16,
      fontFamily: "Inter-SemiBold"
    }
  });
