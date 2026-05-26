import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";
import { Spacing } from "@/constants/Spacing";
import SectionHeader from "../ui/SectionHeader";
import { ErrorFallback } from "../ErrorFallback";

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
      console.log("Web: Icon-Wechsel nicht möglich");
      setActiveIcon(id);
      return;
    }

    try {
      const { setAppIcon } = getIconModule();
      await setAppIcon(id);
      setActiveIcon(id);
    } catch (e) {
      <ErrorFallback error={e} resetError={router.push("/")} />;
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader title={"App Icon"} />
      <View style={styles.grid}>
        {ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            onPress={() => handleIconChange(icon.id)}
            style={[styles.iconWrapper, activeIcon === icon.id && { borderColor: MyTheme.primaryAccent }]}
          >
            <Image source={icon.source} style={styles.iconPreview} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.xl
    },
    grid: {
      flexDirection: "row",
      gap: Spacing.md,
      paddingLeft: Spacing.sm
    },
    iconWrapper: {
      padding: 4,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "transparent",
      backgroundColor: theme.primary
    },
    iconPreview: {
      width: 60,
      height: 60,
      borderRadius: 12
    }
  });
