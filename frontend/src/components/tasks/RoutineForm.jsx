import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import FrequencyPicker from "@/components/tasks/FrequencyPicker";
import RoutineScreenHeader from "@/components/tasks/RoutineScreenHeader";
import AppButton from "@/components/ui/AppButton";
import AppCheckbox from "@/components/ui/AppCheckbox";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import LpPoints from "@/components/ui/LpPoints";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";
import { triggerHaptic } from "@/utils/haptics";
import { FREQUENCY_TYPES } from "@/utils/routineHelpers";

const ROUTINE_ICONS = ["sun", "moon", "fire", "dumbbell", "book", "water", "leaf", "heart", "coffeeCat", "bed", "flower", "target"];

const DEFAULT_FREQUENCY = { type: FREQUENCY_TYPES.DAILY, days: [1, 2, 3, 4, 5], timesPerWeek: 3 };

const RoutineForm = ({ title, initialRoutine, submitLabel, onSubmit, onDelete }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(initialRoutine?.title || "");
  const [icon, setIcon] = useState(initialRoutine?.icon || ROUTINE_ICONS[0]);
  const [frequency, setFrequency] = useState(() => ({ ...DEFAULT_FREQUENCY, ...(initialRoutine?.frequency || {}) }));
  const [selectedTaskIds, setSelectedTaskIds] = useState(
    () => initialRoutine?.tasks.map((task) => task.taskId) || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tasksCatalog;
    return tasksCatalog.filter(
      (task) => t(task.title).toLowerCase().includes(query) || task.title.toLowerCase().includes(query)
    );
  }, [searchQuery, t]);

  const isValid =
    name.trim().length > 0 &&
    selectedTaskIds.length > 0 &&
    (frequency.type !== FREQUENCY_TYPES.WEEKDAYS || frequency.days.length > 0);

  const toggleTask = useCallback((taskId) => {
    triggerHaptic();
    setSelectedTaskIds((prev) =>
      prev.some((id) => String(id) === String(taskId))
        ? prev.filter((id) => String(id) !== String(taskId))
        : [...prev, taskId]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    triggerHaptic("success");
    onSubmit({ title: name, icon, frequency, taskIds: selectedTaskIds });
  }, [isValid, onSubmit, name, icon, frequency, selectedTaskIds]);

  const handleDelete = useCallback(() => {
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      triggerHaptic("warning");
      return;
    }
    onDelete();
  }, [isConfirmingDelete, onDelete]);

  return (
    <ScreenWrapper
      scrollable={false}
      withPaddingSides={false}
      withPaddingBottom={false}
      withPaddingTop={false}
      withToolbar={false}
    >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <RoutineScreenHeader title={title} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <SectionHeader title={t("Name")} />
            <AppInput
              placeholder={t("e.g. Morning routine")}
              value={name}
              onChangeText={setName}
              maxLength={40}
              testID="routine-name-input"
            />
          </View>

          <View>
            <SectionHeader title={t("Icon")} />
            <View style={styles.iconGrid}>
              {ROUTINE_ICONS.map((iconName) => {
                const isActive = iconName === icon;
                return (
                  <Pressable
                    key={iconName}
                    onPress={() => setIcon(iconName)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    style={[styles.iconOption, isActive && styles.iconOptionActive]}
                  >
                    <Icon name={iconName} size={22} color={isActive ? MyTheme.primaryAccentText : MyTheme.text} />
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View>
            <SectionHeader title={t("Frequency")} />
            <FrequencyPicker value={frequency} onChange={setFrequency} />
          </View>

          <View>
            <SectionHeader title={t("Select tasks ({{count}})", { count: selectedTaskIds.length })} />
            <AppInput icon="search" placeholder={t("Search...")} value={searchQuery} onChangeText={setSearchQuery} />
            <View style={styles.taskList}>
              {filteredTasks.map((task) => {
                const isSelected = selectedTaskIds.some((id) => String(id) === String(task.id));
                return (
                  <BaseCard key={task.id} isSelected={isSelected} onPress={() => toggleTask(task.id)}>
                    <View style={styles.taskRow}>
                      <AppCheckbox checked={isSelected} />
                      <Icon name={task.icon} size={20} />
                      <AppText bold numberOfLines={1} style={styles.taskTitle}>
                        {t(task.title)}
                      </AppText>
                      <LpPoints points={task.lp} size="xs" />
                    </View>
                  </BaseCard>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
          {onDelete && (
            <AppButton
              variant="ghost"
              title={isConfirmingDelete ? t("Tap again to delete") : t("Delete routine")}
              textStyle={{ color: MyTheme.warning }}
              onPress={handleDelete}
            />
          )}
          <AppButton title={submitLabel} fullWidth disabled={!isValid} onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    scrollContent: {
      padding: Spacing.md,
      gap: Spacing.lg
    },
    iconGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.sm
    },
    iconOption: {
      width: 48,
      height: 48,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.separator,
      backgroundColor: theme.glas
    },
    iconOptionActive: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.16)
    },
    taskList: {
      gap: Spacing.sm
    },
    taskRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    taskTitle: {
      flex: 1
    },
    footer: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      gap: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.separator
    }
  });

export default RoutineForm;
