import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, Platform, ScrollView, StyleSheet, TouchableOpacity, UIManager, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseCard from "../ui/BaseCard";
import Separator from "../ui/Separator";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TaskSelector({ taskIds, selectedTaskId, onSelectTask }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const [expanded, setExpanded] = useState(false);

  const availableTasks = useMemo(() => {
    return taskIds.map((id) => tasksCatalog.find((entry) => entry.id === id)).filter(Boolean);
  }, [taskIds]);

  const selectedTask = useMemo(() => {
    return tasksCatalog.find((entry) => entry.id === selectedTaskId);
  }, [selectedTaskId]);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (taskId) => {
      onSelectTask(taskId);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(false);
    },
    [onSelectTask]
  );

  return (
    <BaseCard padding={0}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <View
            style={[styles.iconBox, selectedTask && { backgroundColor: MyTheme.primaryAccent || selectedTask.color }]}
          >
            <Icon
              name={selectedTask ? selectedTask.icon : "target"}
              size={20}
              color={selectedTask ? "#FFF" : MyTheme.muted}
            />
          </View>
          <View>
            <AppText type="caption">{t("Related task")}</AppText>
            <AppText bold style={{ fontSize: 16, marginTop: 2 }}>
              {selectedTask ? t(selectedTask.title) : t("Select task")}
            </AppText>
          </View>
        </View>

        <Icon name={expanded ? "up" : "down"} />
      </TouchableOpacity>
      {expanded && (
        <>
          <Separator />
          <ScrollView style={styles.scrollArea} nestedScrollEnabled={true}>
            {availableTasks.map((task) => {
              const isSelected = task.id === selectedTaskId;
              return (
                <>
                  <TouchableOpacity key={task.id} style={styles.taskItem} onPress={() => handleSelect(task.id)}>
                    <View style={styles.taskItemLeft}>
                      <Icon name={task.icon} size={20} color={isSelected ? MyTheme.primaryAccent : MyTheme.text} />
                      <AppText bold style={[styles.taskTitle, isSelected && { color: MyTheme.primaryAccent }]}>
                        {t(task.title)}
                      </AppText>
                    </View>
                    {isSelected && <Icon name="checkmark" size={20} color={MyTheme.primaryAccent} />}
                  </TouchableOpacity>
                  <Separator />
                </>
              );
            })}
          </ScrollView>
        </>
      )}
    </BaseCard>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: Spacing.md
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: theme.separator,
      justifyContent: "center",
      alignItems: "center"
    },
    scrollArea: {
      maxHeight: 200
    },
    taskItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md
    },
    taskItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    taskTitle: {
      fontSize: 15
    }
  });
