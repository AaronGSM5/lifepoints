import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";
import { getStreakCalendar, WEEKDAY_ORDER } from "@/utils/routineHelpers";

const DOT_SIZE = 28;

const StreakCalendar = memo(({ routine, weeks = 5, style }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const calendar = useMemo(() => getStreakCalendar(routine, new Date(), weeks), [routine, weeks]);

  const legend = [
    { status: "done", label: t("Done") },
    { status: "missed", label: t("Missed") },
    { status: "notDue", label: t("Not due") }
  ];

  return (
    <BaseCard style={[styles.card, style]}>
      <View style={styles.row}>
        {WEEKDAY_ORDER.map((day) => (
          <AppText key={day} type="caption" bold style={styles.dayLabel}>
            {t(`weekdays.${day}`)}
          </AppText>
        ))}
      </View>

      {calendar.map((week) => (
        <View key={week[0].dateKey} style={styles.row}>
          {week.map((day) => (
            <View key={day.dateKey} style={styles.cell}>
              <View style={[styles.dot, styles[day.status]]} testID={`calendar-${day.dateKey}-${day.status}`} />
            </View>
          ))}
        </View>
      ))}

      <View style={styles.legend}>
        {legend.map((item) => (
          <View key={item.status} style={styles.legendItem}>
            <View style={[styles.legendDot, styles[item.status]]} />
            <AppText type="caption">{item.label}</AppText>
          </View>
        ))}
      </View>
    </BaseCard>
  );
});
StreakCalendar.displayName = "StreakCalendar";

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      gap: Spacing.sm
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    dayLabel: {
      flex: 1,
      textAlign: "center"
    },
    cell: {
      flex: 1,
      alignItems: "center"
    },
    dot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: "transparent"
    },
    done: {
      backgroundColor: theme.primaryAccent
    },
    missed: {
      borderColor: addOpacity(theme.secondaryAccent, 0.6),
      backgroundColor: addOpacity(theme.secondaryAccent, 0.08)
    },
    open: {
      borderColor: theme.muted,
      borderStyle: "dashed"
    },
    notDue: {
      backgroundColor: theme.glas
    },
    future: {
      backgroundColor: "transparent"
    },
    beforeStart: {
      backgroundColor: "transparent",
      borderColor: theme.separator
    },
    legend: {
      flexDirection: "row",
      justifyContent: "center",
      gap: Spacing.md,
      marginTop: Spacing.xs
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: "transparent"
    }
  });

export default StreakCalendar;
