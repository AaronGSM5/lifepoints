import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

import AppIconItem from "./AppIconItem";
import SectionHeader from "../ui/SectionHeader";

const ICONS = [
  { id: "default_icon", name: "Standard", source: require("@/../public/assets/appIcons/icon.png") },
  { id: "dark", name: "Dark", source: require("@/../public/assets/appIcons/icon-dark.png") }
];

export default function AppIconPicker() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [activeIcon, setActiveIcon] = useState("default_icon");

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

  const handleIconChange = useCallback(async (id) => {
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
  }, []);

  return (
    <View style={styles.container}>
      <SectionHeader title={"App Icon"} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {ICONS.map((icon) => (
          <AppIconItem
            key={icon.id}
            icon={icon}
            isSelected={activeIcon === icon.id}
            onPress={() => handleIconChange(icon.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.xl
    },
    scrollContainer: {
      gap: Spacing.md,
      paddingVertical: Spacing.xs,
      paddingLeft: Spacing.sm
    }
  });
