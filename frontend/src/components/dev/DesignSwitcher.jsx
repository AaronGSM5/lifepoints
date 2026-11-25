import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Clipboard from "expo-clipboard";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import {
  AccentOptions,
  BackgroundOptions,
  DEFAULT_DESIGN_SELECTION,
  getAccentOption,
  getBackgroundOption,
  getShapeOption,
  ShapeOptions
} from "@/constants/DesignOptions";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { buildDesignSelectionSummary } from "@/utils/designHelpers";
import { triggerHaptic } from "@/utils/haptics";

const FAB_SIZE = 40;
// Floating-Navbar sitzt bei bottom 25 + 65px Höhe → Button knapp darüber platzieren
const FAB_BOTTOM_OFFSET = 100;
const CHIP_WIDTH = 132;

// --- Mini-Vorschauen pro Section -------------------------------------------

const BackgroundPreview = ({ tokens }) => (
  <View style={[previewStyles.bgFrame, { backgroundColor: tokens.background, borderColor: tokens.borderStrong }]}>
    <View style={[previewStyles.bgCard, { backgroundColor: tokens.primary }]}>
      <View style={[previewStyles.bgLine, { backgroundColor: tokens.text }]} />
      <View style={[previewStyles.bgLineShort, { backgroundColor: tokens.muted }]} />
    </View>
  </View>
);

const ShapePreview = ({ tokens, bg, ac }) => (
  <View style={previewStyles.shapeFrame}>
    <View
      style={[
        previewStyles.shapeCard,
        {
          borderRadius: tokens.radius.lg / 2,
          borderWidth: tokens.cardBorderWidth,
          borderBottomWidth: tokens.cardBorderBottomWidth,
          borderColor:
            tokens.cardBorderTone === "none"
              ? "transparent"
              : tokens.cardBorderTone === "strong"
                ? bg.borderStrong
                : bg.border,
          backgroundColor: tokens.cardFill === "raised" ? bg.raised : bg.primary
        }
      ]}
    />
    <View
      style={[
        previewStyles.shapeButton,
        {
          borderRadius: Math.min(tokens.buttonRadius, 7),
          backgroundColor: ac.primaryAccent,
          borderBottomWidth: tokens.buttonDepth > 0 ? 3 : 0,
          borderBottomColor: ac.buttonDepthColor
        }
      ]}
    />
  </View>
);

const AccentPreview = ({ tokens }) => (
  <View style={previewStyles.accentRow}>
    <View style={[previewStyles.accentDotLarge, { backgroundColor: tokens.primaryAccent }]} />
    <View style={[previewStyles.accentDot, { backgroundColor: tokens.secondaryAccent }]} />
    <View style={[previewStyles.accentDot, { backgroundColor: tokens.gold }]} />
    <View style={[previewStyles.xpBar, { backgroundColor: tokens.xpGradient[0] }]}>
      <View style={[previewStyles.xpBarEnd, { backgroundColor: tokens.xpGradient[1] }]} />
    </View>
  </View>
);

// --- Section ------------------------------------------------------------------

const OptionChip = memo(({ option, isActive, onSelect, styles, children }) => {
  const handlePress = useCallback(() => onSelect(option.id), [onSelect, option.id]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ checked: isActive }}
      accessibilityLabel={option.name}
      style={({ pressed }) => [styles.chip, isActive && styles.chipActive, pressed && styles.pressed]}
    >
      {children}
      <AppText bold numberOfLines={1} style={styles.chipTitle}>
        {option.name}
      </AppText>
      <AppText type="caption" numberOfLines={1} style={styles.chipDescription}>
        {option.description}
      </AppText>
    </Pressable>
  );
});
OptionChip.displayName = "OptionChip";

const DesignSection = memo(({ title, options, activeId, onSelect, renderPreview, styles }) => (
  <View style={styles.section}>
    <AppText type="caption" bold style={styles.sectionTitle}>
      {title}
    </AppText>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipRow}
      accessibilityRole="radiogroup"
    >
      {options.map((option) => (
        <OptionChip
          key={option.id}
          option={option}
          isActive={option.id === activeId}
          onSelect={onSelect}
          styles={styles}
        >
          {renderPreview(option)}
        </OptionChip>
      ))}
    </ScrollView>
  </View>
));
DesignSection.displayName = "DesignSection";

/**
 * Design-Playground: Floating-Button + kompaktes Bottom-Sheet, in dem Background, Haptik/Form und Akzente
 * unabhängig voneinander live kombiniert werden.
 */
const DesignSwitcher = memo(() => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("design");
  const insets = useSafeAreaInsets();

  const backgroundId = useStore((state) => state.backgroundId);
  const shapeId = useStore((state) => state.shapeId);
  const accentId = useStore((state) => state.accentId);
  const setDesignSection = useStore((state) => state.setDesignSection);
  const resetDesignSelection = useStore((state) => state.resetDesignSelection);
  const disableDesignPlayground = useStore((state) => state.disableDesignPlayground);

  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState("left");
  const [copied, setCopied] = useState(false);

  const background = getBackgroundOption(backgroundId);
  const shape = getShapeOption(shapeId);
  const accent = getAccentOption(accentId);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const translateOptions = useCallback(
    (options) => options.map((option) => ({ ...option, description: t(option.description) })),
    [t]
  );
  const backgroundOptions = useMemo(() => translateOptions(BackgroundOptions), [translateOptions]);
  const shapeOptions = useMemo(() => translateOptions(ShapeOptions), [translateOptions]);
  const accentOptions = useMemo(() => translateOptions(AccentOptions), [translateOptions]);

  const open = useCallback(() => {
    triggerHaptic();
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggleSide = useCallback(() => {
    triggerHaptic("medium");
    setSide((prev) => (prev === "left" ? "right" : "left"));
  }, []);

  const selectBackground = useCallback(
    (id) => {
      triggerHaptic();
      setDesignSection("backgroundId", id);
    },
    [setDesignSection]
  );
  const selectShape = useCallback(
    (id) => {
      triggerHaptic();
      setDesignSection("shapeId", id);
    },
    [setDesignSection]
  );
  const selectAccent = useCallback(
    (id) => {
      triggerHaptic();
      setDesignSection("accentId", id);
    },
    [setDesignSection]
  );

  const handleReset = useCallback(() => {
    triggerHaptic("medium");
    resetDesignSelection();
  }, [resetDesignSelection]);

  const handleDisable = useCallback(() => {
    triggerHaptic("medium");
    disableDesignPlayground();
  }, [disableDesignPlayground]);

  const handleCopy = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(buildDesignSelectionSummary({ background, shape, accent }));
      triggerHaptic("success");
      setCopied(true);
    } catch (error) {
      console.warn("Design-Kombi konnte nicht kopiert werden", error);
    }
  }, [background, shape, accent]);

  const renderBackgroundPreview = useCallback((option) => <BackgroundPreview tokens={option.tokens} />, []);
  const renderShapePreview = useCallback(
    (option) => <ShapePreview tokens={option.tokens} bg={background.tokens} ac={accent.tokens} />,
    [background, accent]
  );
  const renderAccentPreview = useCallback((option) => <AccentPreview tokens={option.tokens} />, []);

  const isCurrentCombo =
    MyTheme.isDesignPlayground &&
    background.id === DEFAULT_DESIGN_SELECTION.backgroundId &&
    shape.id === DEFAULT_DESIGN_SELECTION.shapeId &&
    accent.id === DEFAULT_DESIGN_SELECTION.accentId;

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
              <View style={styles.headerText}>
                <AppText type="title">{t("Design Playground")}</AppText>
                <AppText type="caption" numberOfLines={1}>
                  {MyTheme.isDesignPlayground
                    ? `${background.name} · ${shape.name} · ${accent.name}`
                    : t("Standard theme description")}
                </AppText>
              </View>
              {MyTheme.isDesignPlayground && (
                <Pressable
                  onPress={handleDisable}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={t("Turn off playground")}
                  style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}
                >
                  <AppText type="caption" bold>
                    {t("Off")}
                  </AppText>
                </Pressable>
              )}
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

            <ScrollView style={styles.sections} showsVerticalScrollIndicator={false}>
              <DesignSection
                title={t("Background & Surfaces")}
                options={backgroundOptions}
                activeId={MyTheme.isDesignPlayground ? background.id : null}
                onSelect={selectBackground}
                renderPreview={renderBackgroundPreview}
                styles={styles}
              />
              <DesignSection
                title={t("Haptics & Shape")}
                options={shapeOptions}
                activeId={MyTheme.isDesignPlayground ? shape.id : null}
                onSelect={selectShape}
                renderPreview={renderShapePreview}
                styles={styles}
              />
              <DesignSection
                title={t("Accents")}
                options={accentOptions}
                activeId={MyTheme.isDesignPlayground ? accent.id : null}
                onSelect={selectAccent}
                renderPreview={renderAccentPreview}
                styles={styles}
              />
            </ScrollView>

            <View style={styles.actions}>
              <AppButton
                title={copied ? t("Copied") : t("Copy current combo")}
                variant="secondary"
                size="sm"
                onPress={handleCopy}
                disabled={!MyTheme.isDesignPlayground}
                icon={<Icon name={copied ? "checkmark" : "forwardShare"} size={16} color={MyTheme.text} />}
                style={styles.actionButton}
              />
              <AppButton
                title={t("Reset to Current")}
                variant="outline"
                size="sm"
                onPress={handleReset}
                disabled={isCurrentCombo}
                icon={<Icon name="reset" size={16} color={MyTheme.primaryAccentText} />}
                textStyle={{ color: MyTheme.primaryAccentText }}
                style={styles.actionButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
});
DesignSwitcher.displayName = "DesignSwitcher";

const previewStyles = StyleSheet.create({
  bgFrame: {
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    padding: 4,
    justifyContent: "flex-end"
  },
  bgCard: {
    height: 16,
    borderRadius: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    gap: 3
  },
  bgLine: {
    height: 3,
    width: "70%",
    borderRadius: 2
  },
  bgLineShort: {
    height: 3,
    width: "40%",
    borderRadius: 2
  },
  shapeFrame: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  shapeCard: {
    flex: 1,
    height: 26
  },
  shapeButton: {
    width: 30,
    height: 16
  },
  accentRow: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  accentDotLarge: {
    width: 22,
    height: 22,
    borderRadius: 11
  },
  accentDot: {
    width: 14,
    height: 14,
    borderRadius: 7
  },
  xpBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
    overflow: "hidden",
    alignItems: "flex-end"
  },
  xpBarEnd: {
    width: "45%",
    height: "100%"
  }
});

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
      maxHeight: "58%",
      backgroundColor: theme.background,
      borderTopLeftRadius: theme.radius.lg,
      borderTopRightRadius: theme.radius.lg,
      borderTopWidth: 1,
      borderColor: theme.cardBorderColor === "transparent" ? theme.separator : theme.cardBorderColor,
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
      gap: Spacing.sm,
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.sm
    },
    headerText: {
      flex: 1
    },
    textButton: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs
    },
    iconButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.glas
    },
    sections: {
      flexGrow: 0
    },
    section: {
      marginBottom: Spacing.sm + 4
    },
    sectionTitle: {
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.xs + 2,
      textTransform: "uppercase",
      letterSpacing: 0.6
    },
    chipRow: {
      gap: Spacing.sm,
      paddingHorizontal: Spacing.md
    },
    chip: {
      width: CHIP_WIDTH,
      padding: Spacing.sm,
      gap: 2,
      borderRadius: theme.radius.md,
      backgroundColor: theme.cardBackground,
      borderWidth: 1,
      borderColor: theme.cardBorderColor === "transparent" ? theme.separator : theme.cardBorderColor
    },
    chipActive: {
      borderWidth: 2,
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.12)
    },
    chipTitle: {
      fontSize: 13,
      lineHeight: 17,
      marginTop: 2
    },
    chipDescription: {
      fontSize: 11,
      lineHeight: 14
    },
    pressed: {
      opacity: 0.8
    },
    actions: {
      flexDirection: "row",
      gap: Spacing.sm,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.separator
    },
    actionButton: {
      flex: 1
    }
  });

export default DesignSwitcher;
