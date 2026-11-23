import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import RoutineAuthorLink from "@/components/tasks/RoutineAuthorLink";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import LpPoints from "@/components/ui/LpPoints";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { formatAdopters, formatFrequency, getRoutineTotalLp } from "@/utils/routineHelpers";

// Tap auf Titel/Icon öffnet die Detailseite, der Name öffnet das Profil des Publishers
const PublicRoutineCard = memo(({ routine, isAdopted, onAdopt, showAuthor = true, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const totalLp = useMemo(() => getRoutineTotalLp(routine), [routine]);
  const adoptersLabel = t("{{count}} adopted", { count: formatAdopters(routine.adopters) });

  const handleOpen = useCallback(() => router.push(`/routine/public/${routine.id}`), [routine.id]);

  return (
    // Autor-Link, Öffnen-Fläche und Button sind Geschwister, damit im Web kein <button> in <button> entsteht
    <BaseCard style={[styles.card, style]}>
      {showAuthor ? (
        <RoutineAuthorLink plain username={routine.authorUsername} subtitle={adoptersLabel} />
      ) : (
        <AppText type="caption">{adoptersLabel}</AppText>
      )}

      <Pressable
        onPress={handleOpen}
        accessibilityRole="button"
        accessibilityLabel={routine.title}
        testID={`public-routine-${routine.id}`}
        style={({ pressed }) => [styles.body, pressed && styles.pressed]}
      >
        <View style={styles.titleColumn}>
          <AppText bold type="title" numberOfLines={1}>
            {routine.title}
          </AppText>
          <AppText type="caption" numberOfLines={1}>
            {formatFrequency(routine.frequency, t)} • {t("{{count}} tasks", { count: routine.tasks.length })}
          </AppText>
        </View>
        <Icon name={routine.icon} size={22} color={MyTheme.primaryAccentText} />
      </Pressable>

      <View style={styles.footer}>
        <LpPoints points={totalLp} size="xs" />
        <AppButton
          size="sm"
          title={isAdopted ? t("Added") : t("Take over")}
          variant={isAdopted ? "secondary" : "primary"}
          disabled={isAdopted}
          onPress={onAdopt}
        />
      </View>
    </BaseCard>
  );
});
PublicRoutineCard.displayName = "PublicRoutineCard";

const getStyles = () =>
  StyleSheet.create({
    card: {
      gap: Spacing.md
    },
    body: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    titleColumn: {
      flex: 1,
      gap: Spacing.xs
    },
    pressed: {
      opacity: 0.8
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
  });

export default PublicRoutineCard;
