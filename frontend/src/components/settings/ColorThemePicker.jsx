import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { useTranslation } from "react-i18next";
import useStore from "@/store/useStore";
import SectionHeader from "../ui/SectionHeader";

const THEME_OPTIONS = [
  { id: "default_green", bg: "#121212", accent: "#4ADE80", isLocked: false },
  { id: "blue_dark", bg: "#121212", accent: "#3B82F6", isLocked: false },
  { id: "purple_dark", bg: "#121212", accent: "#A855F7", isLocked: false },
  { id: "orange_light", bg: "#121212", accent: "#F97316", isLocked: false },
  { id: "pink_dark", bg: "#121212", accent: "#EC4899", isLocked: false }
];

export default function ColorThemePicker() {
  const currentColorThemeId = useStore((state) => state.activeColorThemeId) || "default_green";
  const setColorTheme = useStore((state) => state.setColorTheme);
  const { t } = useTranslation("settings");
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

  return (
    <View style={styles.container}>
      <SectionHeader title={t("Color Theme")} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {THEME_OPTIONS.map((theme) => {
          const isSelected = currentColorThemeId === theme.id;

          return (
            <TouchableOpacity
              key={theme.id}
              activeOpacity={0.8}
              onPress={() => !theme.isLocked && setColorTheme && setColorTheme(theme.id)}
              style={[styles.squareContainer, isSelected && styles.selectedSquare]}
            >
              <View style={styles.colorBox}>
                <LinearGradient
                  colors={[theme.bg, theme.bg, theme.accent, theme.accent]}
                  locations={[0, 0.5, 0.5, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
              </View>

              {theme.isLocked && (
                <View style={styles.overlay}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
                  </View>
                </View>
              )}

              {isSelected && !theme.isLocked && (
                <View style={styles.overlay}>
                  <View style={[styles.iconCircle, { backgroundColor: MyTheme.primaryAccent }]}>
                    <Ionicons name="checkmark-sharp" size={20} color="#FFFFFF" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.xl
    },
    scrollContainer: {
      gap: Spacing.md,
      paddingVertical: Spacing.xs
    },
    squareContainer: {
      width: 72,
      height: 72,
      borderRadius: 16,
      borderWidth: 3,
      borderColor: "transparent"
    },
    selectedSquare: {
      borderColor: theme.primaryAccent,
      transform: [{ scale: 1.05 }]
    },
    colorBox: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center"
    },
    iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center"
    }
  });
