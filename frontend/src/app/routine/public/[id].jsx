import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import PublicRoutineTaskItem from "@/components/tasks/PublicRoutineTaskItem";
import RoutineAuthorLink from "@/components/tasks/RoutineAuthorLink";
import RoutineScreenHeader from "@/components/tasks/RoutineScreenHeader";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import LpPoints from "@/components/ui/LpPoints";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getPublicRoutineById } from "@/mocks/PublicRoutines";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { formatAdopters, formatFrequency, getRoutineTotalLp } from "@/utils/routineHelpers";

export default function PublicRoutineDetailScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation(["tasks", "common"]);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const routine = useMemo(() => getPublicRoutineById(id), [id]);
  const adoptPublicRoutine = useStore((state) => state.adoptPublicRoutine);
  const adoptedRoutine = useStore((state) => state.routines.find((r) => r.source?.publicRoutineId === id));

  const tasks = useMemo(
    () =>
      (routine?.tasks || [])
        .map((routineTask) => ({
          task: tasksCatalog.find((entry) => String(entry.id) === String(routineTask.taskId)),
          substeps: routineTask.substeps || []
        }))
        .filter((entry) => entry.task),
    [routine]
  );

  const handleAdopt = useCallback(() => {
    if (adoptedRoutine) {
      router.push(`/routine/${adoptedRoutine.id}`);
      return;
    }
    const newId = adoptPublicRoutine(routine);
    triggerHaptic("success");
    router.replace(`/routine/${newId}`);
  }, [adoptedRoutine, adoptPublicRoutine, routine, router]);

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

  return (
    <ScreenWrapper
      scrollable={false}
      withPaddingSides={false}
      withPaddingBottom={false}
      withPaddingTop={false}
      withToolbar={false}
    >
      <RoutineScreenHeader title={routine.title} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name={routine.icon} size={32} color={MyTheme.primaryAccentText} />
          </View>
          <AppText type="h2" bold style={styles.centered}>
            {routine.title}
          </AppText>
          <RoutineAuthorLink username={routine.authorUsername} />
          {Boolean(routine.description) && (
            <AppText style={[styles.centered, styles.description]}>{routine.description}</AppText>
          )}
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Icon name="calendar" size={14} color={MyTheme.muted} />
              <AppText type="caption">{formatFrequency(routine.frequency, t)}</AppText>
            </View>
            <View style={styles.metaChip}>
              <Icon name="user" size={14} color={MyTheme.muted} />
              <AppText type="caption">{t("{{count}} adopted", { count: formatAdopters(routine.adopters) })}</AppText>
            </View>
            <LpPoints points={getRoutineTotalLp(routine)} size="xs" />
          </View>
        </View>

        <View>
          <SectionHeader title={t("Included tasks ({{count}})", { count: tasks.length })} />
          <View style={styles.taskList}>
            {tasks.map(({ task, substeps }) => (
              <PublicRoutineTaskItem key={task.id} task={task} substeps={substeps} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        <AppButton
          fullWidth
          title={adoptedRoutine ? t("Open my routine") : t("Take over")}
          variant={adoptedRoutine ? "secondary" : "primary"}
          onPress={handleAdopt}
        />
      </View>
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
    description: {
      color: theme.muted,
      paddingHorizontal: Spacing.md
    },
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.sm,
      marginTop: Spacing.xs
    },
    metaChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: Spacing.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.separator,
      backgroundColor: theme.glas
    },
    taskList: {
      gap: Spacing.sm
    },
    footer: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.separator
    }
  });
