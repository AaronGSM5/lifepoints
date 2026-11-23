// src/components/LevelUpModal.js
import React, { memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { announce } from "@/utils/a11yHelpers";

import { Icon } from "./icons/Icon";

const LevelUpModal = memo(({ visible, level, unlockedItems = [], onTransitionEnd }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (visible) announce(t("Level reached", { level }));
  }, [visible, level, t]);

  const resolvedItems = useMemo(
    () =>
      unlockedItems.length > 0
        ? unlockedItems
        : [
            { id: 1, icon: "sun", color: MyTheme.glas },
            { id: 2, icon: "sun", color: MyTheme.gold },
            { id: 3, icon: "sun", color: MyTheme.primaryAccent }
          ],
    [unlockedItems, MyTheme]
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onTransitionEnd}>
      <View style={styles.overlay}>
        {!reduceMotion && (
          <LottieView
            source={{ uri: "https://assets9.lottiefiles.com/packages/lf20_u4yrau.json" }}
            autoPlay
            loop={false}
            pointerEvents="none"
            style={styles.lottie}
            accessible={false}
            importantForAccessibility="no-hide-descendants"
          />
        )}

        <View style={styles.card} accessibilityViewIsModal>
          <AppText type="h1" bold style={styles.title}>
            LEVEL UP!
          </AppText>
          <View style={styles.badge}>
            <AppText bold style={styles.badgeText}>
              {level}
            </AppText>
          </View>
          <AppText type="title" style={styles.subtitle}>
            You unlocked:
          </AppText>

          <View style={styles.itemsRow}>
            {resolvedItems.map((item) => (
              <View key={item.id} style={[styles.itemBox, { backgroundColor: item.color }]}>
                <Icon name={item.icon} />
              </View>
            ))}
          </View>
          <AppButton title={"Collect"} variant="outline" onPress={onTransitionEnd} fullWidth />
        </View>
      </View>
    </Modal>
  );
});
LevelUpModal.displayName = "LevelUpModal";

const getStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.8)",
      justifyContent: "center",
      alignItems: "center"
    },
    lottie: {
      ...StyleSheet.absoluteFillObject
    },
    card: {
      width: "80%",
      maxWidth: 400,
      backgroundColor: theme.primary || "#1e293b",
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.lg,
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.secondary
    },
    title: {
      fontSize: 40,
      color: theme.primaryAccentText,
      marginBottom: Spacing.lg
    },
    badge: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.primaryAccent,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.lg
    },
    badgeText: {
      fontSize: 48,
      color: theme.background
    },
    subtitle: {
      marginBottom: Spacing.lg
    },
    itemsRow: {
      flexDirection: "row",
      gap: Spacing.lg,
      marginBottom: 60
    },
    itemBox: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default LevelUpModal;
