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
// Sichtbare Pille 36px + 4px hitSlop oben/unten = 44px Tippfläche
const PILL_HEIGHT = 36;
const HIT_SLOP = { top: 4, bottom: 4, left: 4, right: 4 };
const WHITE = "#FFFFFF";

/**
 * Text-Pille "Props", ersetzt das Like-Herz. Intern weiterhin Like-Logik (isLiked / onToggle).
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
        variant="ghost"
        size="sm"
        onPress={handlePress}
        selected={isActive}
        hitSlop={HIT_SLOP}
        accessibilityLabel={isActive ? t("Take back props") : t("Give props")}
        bgColor={isActive ? MyTheme.propsGreen : undefined}
        borderStyle={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
        textStyle={[styles.label, { color: isActive ? WHITE : MyTheme.text }]}
      />
    </Animated.View>
  );
});
PropsButton.displayName = "PropsButton";

const getStyles = (theme) =>
  StyleSheet.create({
    pill: {
      minHeight: PILL_HEIGHT,
      minWidth: 44,
      paddingHorizontal: Spacing.md,
      paddingVertical: 0,
      borderWidth: 1
    },
    pillInactive: {
      borderColor: theme.muted
    },
    pillActive: {
      borderColor: theme.propsGreen
    },
    label: {
      fontSize: 14
    }
  });

export default PropsButton;
