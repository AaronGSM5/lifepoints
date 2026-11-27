import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Platform, StyleSheet } from "react-native";

import * as Haptics from "expo-haptics";

import AppButton from "@/components/ui/AppButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const POP_SCALE = 1.12;
const POP_DURATION = 250;
// AppButton "sm" ist ca. 34-36px hoch, 6px hitSlop oben/unten ergibt mind. 44px Tippfläche
const HIT_SLOP = { top: 6, bottom: 6, left: 6, right: 6 };

/**
 * Text-Pille "Props", ersetzt das Like-Herz. Intern weiterhin Like-Logik (isLiked / onToggle).
 * Gestaltung nach DESIGN.md wie andere Toggle-Buttons (z.B. CategoryButtons):
 * aktiv = Primary (Akzentfläche, dunkler Text), inaktiv = Secondary (glass + border-standard).
 * Pop + Haptik nur beim Aktivieren, nicht beim Zurücknehmen.
 */
const PropsButton = memo(({ isActive, onToggle }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  const reduceMotion = useReducedMotion();
  const [popAnim] = useState(() => new Animated.Value(1));

  const handlePress = useCallback(() => {
    const activating = !isActive;
    onToggle?.();
    if (!activating) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    if (reduceMotion) return;

    popAnim.setValue(1);
    Animated.sequence([
      Animated.timing(popAnim, {
        toValue: POP_SCALE,
        duration: POP_DURATION / 2,
        useNativeDriver: Platform.OS !== "web"
      }),
      Animated.timing(popAnim, {
        toValue: 1,
        duration: POP_DURATION / 2,
        useNativeDriver: Platform.OS !== "web"
      })
    ]).start();
  }, [isActive, onToggle, reduceMotion, popAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: popAnim }] }}>
      <AppButton
        title={t("Props")}
        variant={isActive ? "primary" : "secondary"}
        size="sm"
        onPress={handlePress}
        selected={isActive}
        hitSlop={HIT_SLOP}
        accessibilityLabel={isActive ? t("Take back props") : t("Give props")}
        borderStyle={isActive ? styles.pillActive : styles.pillInactive}
      />
    </Animated.View>
  );
});
PropsButton.displayName = "PropsButton";

const getStyles = (theme) =>
  StyleSheet.create({
    // Gleiche Rahmenbreite in beiden Zuständen, damit die Pille beim Umschalten nicht springt
    pillInactive: {
      minWidth: 44,
      paddingHorizontal: Spacing.md,
      borderWidth: 1,
      borderColor: theme.separator
    },
    pillActive: {
      minWidth: 44,
      paddingHorizontal: Spacing.md,
      borderWidth: 1,
      borderColor: theme.primaryAccent
    }
  });

export default PropsButton;
