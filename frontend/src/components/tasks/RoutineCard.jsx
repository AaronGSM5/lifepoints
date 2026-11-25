import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import RoutineTaskList from "@/components/tasks/RoutineTaskList";
import AppIconButton from "@/components/ui/AppIconButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";
import { calculateStreak, formatFrequency, getRoutineDayProgress, isRoutineCompletedOn } from "@/utils/routineHelpers";

// Tap auf die Karte öffnet die Detailseite, der Chevron klappt die Tasks inline auf
const RoutineCard = memo(({ routine, initialExpanded = false }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const streak = calculateStreak(routine);
  const isDoneToday = isRoutineCompletedOn(routine);
  const { doneCount, totalCount } = getRoutineDayProgress(routine);
  const progressPercent = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  const handleOpen = useCallback(() => router.push(`/routine/${routine.id}`), [routine.id]);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Öffnen-Fläche und Chevron sind Geschwister, damit im Web kein <button> in <button> entsteht */}
      <BaseCard padding={0}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={handleOpen}
            accessibilityRole="button"
            accessibilityLabel={routine.title}
            testID={`routine-card-${routine.id}`}
            style={({ pressed }) => [styles.openArea, pressed && styles.pressed]}
          >
            <View style={[styles.iconCircle, isDoneToday && styles.iconCircleDone]}>
              <Icon
                name={isDoneToday ? "checkmark" : routine.icon}
                size={20}
                color={isDoneToday ? MyTheme.primaryAccentText : MyTheme.text}
              />
            </View>

            <View style={styles.titleColumn}>
              <AppText bold type="title" numberOfLines={1}>
                {routine.title}
              </AppText>
              <AppText type="caption" numberOfLines={1}>
                {formatFrequency(routine.frequency, t, new Date(), routine)} •{" "}
                {t("{{done}}/{{total}} tasks", { done: doneCount, total: totalCount })}
              </AppText>
            </View>

            <View style={[styles.streakBadge, streak > 0 && styles.streakBadgeActive]} testID="routine-streak">
              <Icon name="fire" size={14} color={streak > 0 ? MyTheme.secondaryAccent : MyTheme.muted} />
              <AppText bold type="caption" style={streak > 0 ? styles.streakTextActive : undefined}>
                {streak}
              </AppText>
            </View>
          </Pressable>

          <AppIconButton
            icon={isExpanded ? "down" : "right"}
            iconSize={20}
            color={MyTheme.muted}
            onPress={toggleExpand}
            accessibilityLabel={isExpanded ? t("Hide tasks") : t("Show tasks")}
            testID={`routine-expand-${routine.id}`}
          />
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </BaseCard>

      {isExpanded && <RoutineTaskList routine={routine} initialExpandedFirst style={styles.taskList} />}
    </View>
  );
});
RoutineCard.displayName = "RoutineCard";

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      gap: Spacing.sm
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      paddingRight: Spacing.md
    },
    openArea: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      paddingVertical: Spacing.md,
      paddingLeft: Spacing.md
    },
    pressed: {
      opacity: 0.8
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.full,
      backgroundColor: theme.glas,
      alignItems: "center",
      justifyContent: "center"
    },
    iconCircleDone: {
      backgroundColor: addOpacity(theme.primaryAccent, 0.16)
    },
    titleColumn: {
      flex: 1,
      gap: 2
    },
    streakBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: theme.separator
    },
    streakBadgeActive: {
      backgroundColor: addOpacity(theme.secondaryAccent, 0.12),
      borderColor: addOpacity(theme.secondaryAccent, 0.4)
    },
    streakTextActive: {
      color: theme.text
    },
    progressTrack: {
      height: 4,
      backgroundColor: theme.separator
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.primaryAccent,
      borderTopRightRadius: 2,
      borderBottomRightRadius: 2
    },
    taskList: {
      paddingLeft: Spacing.md
    }
  });

export default RoutineCard;
