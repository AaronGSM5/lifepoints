import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";

import ScreenFooter from "@/components/layout/ScreenFooter";
import AppSkeleton from "@/components/ui/AppSkeleton";
import BackButton from "@/components/ui/BackButton";
import EmptyView from "@/components/ui/EmptyView";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const DEFAULT_HERO_HEIGHT = 350;

/**
 * Vorlage für Detail-Screens (Task, Reward, ...):
 * Hero-Bild mit Zurück-Button und Verlauf → Inhalt → fester CTA-Bereich unten.
 * Übernimmt außerdem Lade- (Skeleton) und Nicht-gefunden-Zustand.
 */
export default function DetailScreen({
  hero,
  heroHeight = DEFAULT_HERO_HEIGHT,
  footer,
  footerStyle,
  isLoading = false,
  isNotFound = false,
  notFoundTitle,
  notFoundDescription,
  children
}) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation("common");

  const renderBody = () => {
    if (isLoading) {
      return (
        <ScrollView scrollEnabled={false} testID="detail-screen-skeleton">
          <AppSkeleton height={heroHeight} radius={0} />
          <View style={styles.content}>
            <AppSkeleton width={90} height={24} radius={Spacing.borderRadius.full} />
            <AppSkeleton width="75%" height={32} />
            <AppSkeleton width={80} height={24} />
            <View style={styles.skeletonParagraph}>
              <AppSkeleton width="40%" height={20} />
              <AppSkeleton height={14} />
              <AppSkeleton height={14} />
              <AppSkeleton width="60%" height={14} />
            </View>
          </View>
        </ScrollView>
      );
    }

    if (isNotFound) {
      return (
        <View style={styles.notFound}>
          <EmptyView
            icon="search"
            title={notFoundTitle}
            description={notFoundDescription}
            actionTitle={t("back")}
            onAction={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          />
        </View>
      );
    }

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.hero, { height: heroHeight }]}>
            {hero}
            <LinearGradient
              colors={["transparent", "rgba(18,18,18,0.6)", MyTheme.background]}
              style={styles.gradientOverlay}
              pointerEvents="none"
            />
          </View>
          <View style={styles.content}>{children}</View>
        </ScrollView>
        {footer && <ScreenFooter style={footerStyle}>{footer}</ScreenFooter>}
      </>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {renderBody()}
        <BackButton withBackground style={[styles.backButton, { top: insets.top + Spacing.md }]} />
      </View>
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    scrollContent: {
      paddingBottom: Spacing.xl
    },
    hero: {
      width: "100%",
      backgroundColor: theme.glas
    },
    gradientOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 130
    },
    backButton: {
      position: "absolute",
      left: Spacing.md,
      zIndex: 10
    },
    content: {
      paddingHorizontal: Spacing.md,
      marginTop: -Spacing.lg,
      gap: Spacing.md
    },
    skeletonParagraph: {
      gap: Spacing.sm,
      marginTop: Spacing.sm
    },
    notFound: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: Spacing.md
    }
  });
