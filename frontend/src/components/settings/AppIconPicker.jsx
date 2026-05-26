import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";
import { Spacing } from "@/constants/Spacing";
import SectionHeader from "../ui/SectionHeader";

const ICONS = [
  { id: "default", name: "Standard", source: require("@/../public/assets/appIcons/icon.png") },
  { id: "dark", name: "Dark", source: require("@/../public/assets/appIcons/icon-dark.png") }
];

export default function AppIconPicker() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const [activeIcon, setActiveIcon] = useState("default");

  const getIconModule = () => {
    if (Platform.OS === "web") return null;
    return require("expo-dynamic-app-icon");
  };

  useEffect(() => {
    const fetchCurrentIcon = async () => {
      if (Platform.OS === "web") return;
      try {
        const { getAppIcon } = getIconModule();
        const icon = await getAppIcon();
        if (icon) setActiveIcon(icon);
      } catch (e) {
        console.warn("Konnte aktuelles Icon nicht abrufen:", e);
      }
    };
    fetchCurrentIcon();
  }, []);

  const handleIconChange = async (id) => {
    triggerHaptic("selection");
    if (Platform.OS === "web") {
      setActiveIcon(id);
      return;
    }
    try {
      const { setAppIcon } = getIconModule();
      await setAppIcon(id);
      setActiveIcon(id);
    } catch (e) {
      console.error("Fehler beim Icon-Wechsel:", e);
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader title={"App Icon"} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {ICONS.map((icon) => {
          const isSelected = activeIcon === icon.id;
          return (
            <TouchableOpacity
              key={icon.id}
              activeOpacity={0.8}
              onPress={() => handleIconChange(icon.id)}
              style={[styles.squareContainer, isSelected && styles.selectedSquare]}
            >
              <View style={styles.iconBox}>
                <Image source={icon.source} style={styles.iconPreview} />
              </View>

              {isSelected && (
                <View style={styles.overlay}>
                  <View style={[styles.iconCircle, { backgroundColor: MyTheme.primaryAccent }]}>
                    <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" />
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
      paddingVertical: Spacing.xs,
      paddingLeft: Spacing.sm
    },
    squareContainer: {
      width: 72,
      height: 72,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "transparent"
    },
    selectedSquare: {
      borderColor: theme.primaryAccent,
      transform: [{ scale: 1.05 }]
    },
    iconBox: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden"
    },
    iconPreview: {
      width: "100%",
      height: "100%"
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center"
    },
    iconCircle: {
      width: 24,
      height: 24,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center"
    }
  });
