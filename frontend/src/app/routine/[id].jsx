import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import RoutineAuthorLink from "@/components/tasks/RoutineAuthorLink";
import RoutineScreenHeader from "@/components/tasks/RoutineScreenHeader";
import RoutineTaskList from "@/components/tasks/RoutineTaskList";
import StreakCalendar from "@/components/tasks/StreakCalendar";
import AppButton from "@/components/ui/AppButton";
import AppIconButton from "@/components/ui/AppIconButton";
import AppText from "@/components/ui/AppText";
import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import {
  calculateStreak,
  formatFrequency,
  getRoutineDayProgress,
  getTotalRuns,
  isRoutineDueOn
} from "@/utils/routineHelpers";

export default function RoutineDetailScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks", "common"]);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const routine = useStore((state) => state.routines.find((r) => r.id === id));

  const handleEdit = useCallback(() => router.push(`/routine/edit/${id}`), [router, id]);

  if (!routine) {
    return (
      <ScreenWrapper scrollable={false} withToolbar={false}>
        <View style={styles.notFound}>
          <AppText type="h2">{t("Routine not found")}</AppText>
          <AppButton title={t("common:back")} onPress={() => router.back()} />
        </View>
      </ScreenWrapper>
    );
  }

  const currentStreak = calculateStreak(routine);
  const { doneCount, totalCount } = getRoutineDayProgress(routine);
  const isDue = isRoutineDueOn(routine);

  return (
    <ScreenWrapper
      scrollable={false}
      withPaddingSides={false}
      withPaddingBottom={false}
      withPaddingTop={false}
      withToolbar={false}
    >
      <RoutineScreenHeader
        title={routine.title}
        rightAction={
          <AppIconButton icon="pencil" onPress={handleEdit} accessibilityLabel={t("Edit routine")} testID="routine-edit" />
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.xl }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name={routine.icon} size={32} color={MyTheme.primaryAccent} />
          </View>
          <AppText type="h2" bold style={styles.centered}>
            {routine.title}
          </AppText>
          <AppText type="caption">{formatFrequency(routine.frequency, t, new Date(), routine)}</AppText>
          {routine.source?.authorUsername && <RoutineAuthorLink username={routine.source.authorUsername} />}
        </View>

        <View style={styles.statsRow}>
          <StatCard
            style={styles.stat}
            label={t("Current streak")}
            value={currentStreak}
            icon="fire"
            color={MyTheme.secondaryAccent}
          />
          <StatCard
            style={styles.stat}
            label={t("Best streak")}
            value={Math.max(routine.streak?.best || 0, currentStreak)}
            icon="trophy"
            color={MyTheme.gold}
          />
          <StatCard
            style={styles.stat}
            label={t("Total runs")}
            value={getTotalRuns(routine)}
            icon="checkmarkCircle"
            color={MyTheme.primaryAccent}
          />
        </View>

        <View>
          <SectionHeader title={t("Streak calendar")} />
          <StreakCalendar routine={routine} />
        </View>

        <View>
          <SectionHeader
            title={
              isDue ? t("Today {{done}}/{{total}} tasks", { done: doneCount, total: totalCount }) : t("Not due today")
            }
          />
          <RoutineTaskList routine={routine} initialExpandedFirst />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    notFound: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.md
    },
    scrollContent: {
      padding: Spacing.md,
      gap: Spacing.lg
    },
    hero: {
      alignItems: "center",
      gap: Spacing.sm
    },
    heroIcon: {
      width: 72,
      height: 72,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: addOpacity(theme.primaryAccent, 0.12),
      borderWidth: 1,
      borderColor: addOpacity(theme.primaryAccent, 0.4),
      alignItems: "center",
      justifyContent: "center"
    },
    centered: {
      textAlign: "center"
    },
    statsRow: {
      flexDirection: "row",
      gap: Spacing.sm
    },
    stat: {
      flex: 1
    }
  });
