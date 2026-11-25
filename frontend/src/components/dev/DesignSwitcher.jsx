import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { DesignPresets, getDesignPreset } from "@/constants/DesignPresets";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";

const FAB_SIZE = 40;
// Floating-Navbar sitzt bei bottom 25 + 65px Höhe → Button knapp darüber platzieren
const FAB_BOTTOM_OFFSET = 100;

const getSwatches = (theme) => [
  theme.background,
  theme.cardBackground ?? theme.primary,
  theme.primaryAccent,
  theme.secondaryAccent,
  theme.gold
];

const PresetRow = memo(({ preset, isActive, onSelect, styles, MyTheme }) => {
  const handlePress = useCallback(() => onSelect(preset.id), [onSelect, preset.id]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ checked: isActive }}
      accessibilityLabel={preset.name}
      style={({ pressed }) => [styles.row, isActive && styles.rowActive, pressed && styles.rowPressed]}
    >
      <View style={styles.swatches}>
        {preset.swatches.map((color, index) => (
          <View key={`${preset.id}-${index}`} style={[styles.swatch, { backgroundColor: color }]} />
        ))}
      </View>
      <View style={styles.rowText}>
        <AppText bold numberOfLines={1} style={styles.rowTitle}>
          {preset.name}
        </AppText>
        <AppText type="caption" numberOfLines={1}>
          {preset.description}
        </AppText>
      </View>
      {isActive && <Icon name="checkmark" size={18} color={MyTheme.primaryAccentText} />}
    </Pressable>
  );
});
PresetRow.displayName = "PresetRow";

/**
 * Design-Playground: Floating-Button + kompaktes Bottom-Sheet zum Live-Wechsel der 10 Design-Presets.
 * Das Sheet bedeckt nur den unteren Bereich, damit der Screen darüber direkt sichtbar bleibt (A/B-Vergleich).
 */
const DesignSwitcher = memo(() => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("design");
  const insets = useSafeAreaInsets();

  const designPresetId = useStore((state) => state.designPresetId);
  const setDesignPreset = useStore((state) => state.setDesignPreset);
  const cycleDesignPreset = useStore((state) => state.cycleDesignPreset);

  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState("left");

  const presetList = useMemo(
    () => [
      {
        id: null,
        name: t("Standard theme"),
        description: t("Standard theme description"),
        swatches: getSwatches(MyTheme.designPresetId ? getDesignPreset("current").theme : MyTheme)
      },
      ...DesignPresets.map((preset) => ({
        id: preset.id,
        name: preset.name,
        description: t(preset.description),
        swatches: getSwatches(preset.theme)
      }))
    ],
    [t, MyTheme]
  );

  const activePreset = getDesignPreset(designPresetId);
  const activeIndex = activePreset ? DesignPresets.indexOf(activePreset) + 1 : 0;

  const open = useCallback(() => {
    triggerHaptic();
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggleSide = useCallback(() => {
    triggerHaptic("medium");
    setSide((prev) => (prev === "left" ? "right" : "left"));
  }, []);

  const select = useCallback(
    (id) => {
      triggerHaptic();
      setDesignPreset(id);
    },
    [setDesignPreset]
  );
  const previous = useCallback(() => {
    triggerHaptic();
    cycleDesignPreset(-1);
  }, [cycleDesignPreset]);
  const next = useCallback(() => {
    triggerHaptic();
    cycleDesignPreset(1);
  }, [cycleDesignPreset]);

  return (
    <>
      <Pressable
        onPress={open}
        onLongPress={toggleSide}
        accessibilityRole="button"
        accessibilityLabel={t("Open design switcher")}
        accessibilityHint={t("Long press to move")}
        hitSlop={8}
        style={({ pressed }) => [
          styles.fab,
          side === "left" ? { left: Spacing.sm + 4 } : { right: Spacing.sm + 4 },
          { bottom: insets.bottom + FAB_BOTTOM_OFFSET },
          pressed && styles.fabPressed
        ]}
      >
        <Icon name="palette" size={18} color={MyTheme.primaryAccentText} />
      </Pressable>

      <Modal visible={isOpen} transparent animationType="slide" onRequestClose={close} statusBarTranslucent>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityLabel={t("Close")} />

          <View style={[styles.sheet, { paddingBottom: insets.bottom + Spacing.md }]}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <AppText type="title">{t("Design Playground")}</AppText>
              <Pressable
                onPress={close}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={t("Close")}
                style={styles.iconButton}
              >
                <Icon name="close" size={18} color={MyTheme.text} />
              </Pressable>
            </View>

            {/* Schneller A/B-Switch */}
            <View style={styles.switchRow}>
              <Pressable
                onPress={previous}
                accessibilityRole="button"
                accessibilityLabel={t("Previous design")}
                style={({ pressed }) => [styles.stepButton, pressed && styles.rowPressed]}
              >
                <Icon name="back" size={22} color={MyTheme.text} />
              </Pressable>

              <View style={styles.switchLabel}>
                <AppText bold numberOfLines={1} style={styles.centerText}>
                  {activePreset ? activePreset.name : t("Standard theme")}
                </AppText>
                <AppText type="caption" style={styles.centerText}>
                  {activeIndex} / {DesignPresets.length}
                </AppText>
              </View>

              <Pressable
                onPress={next}
                accessibilityRole="button"
                accessibilityLabel={t("Next design")}
                style={({ pressed }) => [styles.stepButton, pressed && styles.rowPressed]}
              >
                <Icon name="right" size={22} color={MyTheme.text} />
              </Pressable>
            </View>

            <ScrollView style={styles.list} contentContainerStyle={styles.listContent} accessibilityRole="radiogroup">
              {presetList.map((preset) => (
                <PresetRow
                  key={preset.id ?? "standard"}
                  preset={preset}
                  isActive={preset.id === (activePreset?.id ?? null)}
                  onSelect={select}
                  styles={styles}
                  MyTheme={MyTheme}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
});
DesignSwitcher.displayName = "DesignSwitcher";

const getStyles = (theme) =>
  StyleSheet.create({
    fab: {
      position: "absolute",
      width: FAB_SIZE,
      height: FAB_SIZE,
      borderRadius: FAB_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: addOpacity(theme.surface, 0.85),
      borderWidth: 1,
      borderColor: theme.cardBorderColor === "transparent" ? theme.separator : theme.cardBorderColor,
      opacity: 0.75,
      zIndex: 10000,
      elevation: 10,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)"
    },
    fabPressed: {
      opacity: 1,
      transform: [{ scale: 0.94 }]
    },
    overlay: {
      flex: 1,
      justifyContent: "flex-end"
    },
    sheet: {
      maxHeight: "55%",
      backgroundColor: theme.background,
      borderTopLeftRadius: theme.radius.lg,
      borderTopRightRadius: theme.radius.lg,
      borderTopWidth: theme.cardBorderWidth,
      borderColor: theme.cardBorderColor,
      paddingHorizontal: Spacing.md,
      boxShadow: theme.sheetShadow
    },
    handle: {
      alignSelf: "center",
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.separator,
      marginVertical: Spacing.sm
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: Spacing.sm
    },
    iconButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.glas
    },
    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.md
    },
    stepButton: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.cardBackground,
      borderWidth: theme.cardBorderWidth,
      borderColor: theme.cardBorderColor
    },
    switchLabel: {
      flex: 1,
      alignItems: "center"
    },
    centerText: {
      textAlign: "center"
    },
    list: {
      flexGrow: 0
    },
    listContent: {
      gap: Spacing.sm,
      paddingBottom: Spacing.sm
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md,
      padding: Spacing.sm + 4,
      borderRadius: theme.radius.md,
      backgroundColor: theme.cardBackground,
      borderWidth: 1,
      borderColor: theme.cardBorderColor === "transparent" ? theme.separator : theme.cardBorderColor
    },
    rowActive: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.1)
    },
    rowPressed: {
      opacity: 0.8
    },
    rowText: {
      flex: 1
    },
    rowTitle: {
      fontSize: 15
    },
    swatches: {
      flexDirection: "row"
    },
    swatch: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginLeft: -4,
      borderWidth: 1,
      borderColor: "rgba(128, 128, 128, 0.35)"
    }
  });

export default DesignSwitcher;
