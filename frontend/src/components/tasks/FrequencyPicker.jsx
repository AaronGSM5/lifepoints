import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import CategoryButtons from "@/components/ui/CategoryButtons";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { FREQUENCY_TYPES, WEEKDAY_ORDER } from "@/utils/routineHelpers";

const MIN_TIMES_PER_WEEK = 1;
const MAX_TIMES_PER_WEEK = 6;

const FrequencyPicker = memo(({ value, onChange }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  const typeOptions = useMemo(
    () => [
      { id: FREQUENCY_TYPES.DAILY, label: t("Daily") },
      { id: FREQUENCY_TYPES.WEEKDAYS, label: t("Weekdays") },
      { id: FREQUENCY_TYPES.WEEKLY, label: t("X per week") }
    ],
    [t]
  );

  const handleTypeChange = useCallback((type) => onChange({ ...value, type }), [onChange, value]);

  const toggleDay = useCallback(
    (day) => {
      triggerHaptic();
      const days = value.days.includes(day) ? value.days.filter((d) => d !== day) : [...value.days, day];
      onChange({ ...value, days });
    },
    [onChange, value]
  );

  const changeTimes = useCallback(
    (delta) => {
      const timesPerWeek = Math.min(Math.max(value.timesPerWeek + delta, MIN_TIMES_PER_WEEK), MAX_TIMES_PER_WEEK);
      onChange({ ...value, timesPerWeek });
    },
    [onChange, value]
  );

  return (
    <View>
      <View style={styles.breakOut}>
        <CategoryButtons categories={typeOptions} activeCat={value.type} setActiveCat={handleTypeChange} />
      </View>

      {value.type === FREQUENCY_TYPES.WEEKDAYS && (
        <View style={styles.dayRow}>
          {WEEKDAY_ORDER.map((day) => {
            const isActive = value.days.includes(day);
            return (
              <Pressable
                key={day}
                onPress={() => toggleDay(day)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                style={[styles.dayPill, isActive && styles.dayPillActive]}
              >
                <AppText bold type="caption" style={isActive ? styles.dayTextActive : undefined}>
                  {t(`weekdays.${day}`)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      )}

      {value.type === FREQUENCY_TYPES.WEEKLY && (
        <View style={styles.stepperRow}>
          <AppButton
            title="−"
            variant="secondary"
            size="sm"
            disabled={value.timesPerWeek <= MIN_TIMES_PER_WEEK}
            onPress={() => changeTimes(-1)}
          />
          <AppText bold type="title" style={styles.stepperValue}>
            {t("{{target}}x per week", { target: value.timesPerWeek })}
          </AppText>
          <AppButton
            title="+"
            variant="secondary"
            size="sm"
            disabled={value.timesPerWeek >= MAX_TIMES_PER_WEEK}
            onPress={() => changeTimes(1)}
          />
        </View>
      )}
    </View>
  );
});
FrequencyPicker.displayName = "FrequencyPicker";

const getStyles = (theme) =>
  StyleSheet.create({
    breakOut: {
      marginHorizontal: -Spacing.md
    },
    dayRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Spacing.xs
    },
    dayPill: {
      flex: 1,
      height: 40,
      borderRadius: theme.radius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.separator,
      backgroundColor: theme.glas
    },
    dayPillActive: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.16)
    },
    dayTextActive: {
      color: theme.primaryAccentText
    },
    stepperRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.lg
    },
    stepperValue: {
      minWidth: 120,
      textAlign: "center"
    }
  });

export default FrequencyPicker;
