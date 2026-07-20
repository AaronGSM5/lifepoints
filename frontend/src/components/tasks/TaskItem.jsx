import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const TaskItem = memo(({ title, description, lp, icon, onNavigate, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  const skeletonColor = MyTheme.isDark ? "dark" : "light";

  if (isLoading) {
    return (
      <BaseCard style={styles.container}>
        <View style={styles.headerRow}>
          <Skeleton colorMode={skeletonColor} width={20} height={20} radius="round" />
          <Skeleton colorMode={skeletonColor} width={50} height={16} radius={4} />
        </View>
        <View style={styles.contentRow}>
          <Skeleton colorMode={skeletonColor} width="60%" height={22} radius={4} />
          <Skeleton colorMode={skeletonColor} width="100%" height={14} radius={4} />
          <Skeleton colorMode={skeletonColor} width="80%" height={14} radius={4} />
        </View>
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.container} onPress={onNavigate}>
      <View style={styles.headerRow}>
        <Icon name={icon} size={20} color={MyTheme.text} />
        <AppText type="caption" bold style={styles.lpText}>
          {lp} LP
        </AppText>
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

const getStyles = (theme) =>
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
    },
    lpText: {
      color: theme.primaryAccent
    }
  });

export default TaskItem;
