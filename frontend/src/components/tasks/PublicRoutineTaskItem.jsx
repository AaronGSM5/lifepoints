import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import LpPoints from "@/components/ui/LpPoints";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

// Nur-Lese-Ansicht eines Tasks in einer öffentlichen Routine (vor dem Übernehmen)
const PublicRoutineTaskItem = memo(({ task, substeps = [] }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSteps = substeps.length > 0;

  const toggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <BaseCard onPress={hasSteps ? toggle : undefined}>
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Icon name={task.icon} size={20} />
        </View>
        <View style={styles.textColumn}>
          <AppText bold numberOfLines={1}>
            {t(task.title)}
          </AppText>
          <AppText type="caption" numberOfLines={isExpanded ? undefined : 2}>
            {t(task.description)}
          </AppText>
          {hasSteps && (
            <AppText type="caption" style={styles.stepsHint}>
              {t("{{count}} steps", { count: substeps.length })}
            </AppText>
          )}
        </View>
        <LpPoints points={task.lp} size="xs" />
        {hasSteps && <Icon name={isExpanded ? "down" : "right"} size={18} color={MyTheme.muted} />}
      </View>

      {isExpanded && (
        <View style={styles.steps}>
          {substeps.map((step, i) => (
            <View key={`${step.title}-${i}`} style={styles.stepRow}>
              <View style={styles.stepDot} />
              <View style={styles.textColumn}>
                <AppText>{step.title}</AppText>
                {Boolean(step.description) && <AppText type="caption">{step.description}</AppText>}
              </View>
            </View>
          ))}
        </View>
      )}
    </BaseCard>
  );
});
PublicRoutineTaskItem.displayName = "PublicRoutineTaskItem";

const getStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.glas,
      alignItems: "center",
      justifyContent: "center"
    },
    textColumn: {
      flex: 1,
      gap: 2
    },
    stepsHint: {
      color: theme.primaryAccent
    },
    steps: {
      marginTop: Spacing.md,
      paddingLeft: Spacing.xl + Spacing.md,
      gap: Spacing.sm
    },
    stepRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: Spacing.sm
    },
    stepDot: {
      width: 8,
      height: 8,
      marginTop: 6,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent
    }
  });

export default PublicRoutineTaskItem;
