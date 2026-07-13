import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

export default function TrophyScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("trophies");
  const { id } = useLocalSearchParams();
  const trophy = useMemo(() => trophiesCatalog.find((t) => String(t.id) === String(id)), [id]);
  const eventStats = useStore((state) => state.profile.eventStats);
  const currentProgress = useMemo(
    () => (trophy?.triggerEvent ? eventStats[trophy.triggerEvent] || 0 : 0),
    [eventStats, trophy.triggerEvent]
  );
  const cappedProgress = useMemo(() => Math.min(currentProgress, trophy?.goal || 1), [currentProgress, trophy.goal]);
  const progressPercentage = useMemo(() => (cappedProgress / trophy?.goal) * 100, [cappedProgress, trophy.goal]);

  if (!trophy) return null;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconShowcase}>
          <Animated.Image
            source={trophy.icon}
            resizeMode="contain"
            sharedTransitionTag={`trophy-image-${id}`}
            style={styles.largeTrophyImage}
          />
        </View>

        <AppText type="h1" bold style={styles.title}>
          {t(trophy.title)}
        </AppText>

        <View style={styles.infoBox}>
          <AppText style={styles.description}>{t(trophy.description)}</AppText>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
          <View style={styles.progressTextRow}>
            <AppText type="caption">{t(trophy.requirement)}</AppText>
            <AppText type="caption" bold>
              {cappedProgress} / {trophy.goal}
            </AppText>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.xl * 2,
      alignItems: "center"
    },
    iconShowcase: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: Spacing.xl,
      marginBottom: Spacing.xl
    },
    largeTrophyImage: {
      width: 300,
      height: 300
    },
    infoBox: {
      backgroundColor: theme.primary,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.lg,
      marginTop: Spacing.xl,
      width: "100%"
    },
    progressSection: {
      width: "100%",
      marginTop: Spacing.xl
    },
    progressBarBg: {
      height: 12,
      backgroundColor: "#e5e7eb",
      borderRadius: Spacing.borderRadius.full,
      overflow: "hidden",
      marginBottom: Spacing.sm
    },
    progressBarFill: {
      height: "100%",
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent
    },
    progressTextRow: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    description: {
      textAlign: "center",
      lineHeight: 24,
      color: theme.text
    },
    title: {
      textAlign: "center",
      marginBottom: Spacing.sm
    }
  });
