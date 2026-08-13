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

const TaskItem = memo(({ title, lp, icon, onNavigate, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  if (isLoading) return <TaskItemSkeleton styles={styles} />;

  return (
    <BaseCard style={styles.container} onPress={onNavigate}>
      <View style={styles.headerRow}>
        <Icon name={icon} size={20} />
        <LpPoints points={lp} size="small" />
      </View>
      <AppText type="body" bold style={styles.title} numberOfLines={2}>
        {t(title)}
      </AppText>
    </BaseCard>
  );
});
TaskItem.displayName = "TaskItem";

const getStyles = () =>
  StyleSheet.create({
    container: {
      height: 125,
      padding: Spacing.md,
      gap: Spacing.lg
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    title: {
      fontSize: 16,
      lineHeight: 18
    }
  });

export default TaskItem;
