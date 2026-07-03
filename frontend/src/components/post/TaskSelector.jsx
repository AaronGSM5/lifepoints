import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, Platform, ScrollView, StyleSheet, TouchableOpacity, UIManager, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseCard from "../ui/BaseCard";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TaskSelector({ taskIds, selectedTaskId, onSelectTask }) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("tasks");
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleSelect = (taskId) => {
    onSelectTask(taskId);
    toggleExpand();
  };

  const selectedTask = tasksCatalog.find((entry) => entry.id === selectedTaskId);
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

        <Icon name={expanded ? "up" : "down"} color={MyTheme.text} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.scrollArea} nestedScrollEnabled={true}>
            {taskIds.map((id) => {
              const task = tasksCatalog.find((entry) => entry.id === id);
              if (!task) return null;
              const isSelected = task.id === selectedTaskId;
              return (
                <TouchableOpacity
                  key={task.id}
                  style={[styles.taskItem, isSelected && styles.taskItemSelected]}
                  onPress={() => handleSelect(task.id)}
                >
                  <View style={styles.taskItemLeft}>
                    <Icon name={task.icon} size={20} color={isSelected ? MyTheme.primaryAccent : MyTheme.text} />
                    <AppText bold style={[styles.taskTitle, isSelected && { color: MyTheme.primaryAccent }]}>
                      {t(task.title)}
                    </AppText>
                  </View>
                  {isSelected && <Icon name="checkmark" size={20} color={MyTheme.primaryAccent} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
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
    dropdown: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.separator
    },
    scrollArea: {
      maxHeight: 200
    },
    taskItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.separator
    },
    taskItemSelected: {
      backgroundColor: "rgba(0,0,0,0.02)"
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
