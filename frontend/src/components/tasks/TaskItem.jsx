import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import TaskItemSkeleton from "./TaskItemSkeleton";
import LpPoints from "../ui/LpPoints";

const TaskItem = memo(({ title, description, lp, icon, onNavigate, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  if (isLoading) return <TaskItemSkeleton styles={styles} />;

  return (
    <BaseCard style={styles.container} onPress={onNavigate}>
      <View style={styles.headerRow}>
        <Icon name={icon} size={20} color={MyTheme.text} />
        <LpPoints points={lp} size="small" />
      </View>

      <View style={styles.contentRow}>
        <AppText type="body" bold style={styles.title} numberOfLines={1}>
          {t(title)}
        </AppText>
        <AppText type="caption" style={styles.description} numberOfLines={2}>
          {t(description)}
        </AppText>
      </View>
    </BaseCard>
  );
});
TaskItem.displayName = "TaskItem";

const getStyles = () =>
  StyleSheet.create({
    container: {
      padding: Spacing.md,
      gap: Spacing.lg
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    contentRow: {
      gap: Spacing.xs
    },
    title: {
      fontSize: 18,
      marginBottom: Spacing.xs
    },
    description: {
      lineHeight: 20,
      height: 40
    }
  });

export default TaskItem;
