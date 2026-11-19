import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import LpPoints from "@/components/ui/LpPoints";
import ProgressBar from "@/components/ui/ProgressBar";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { isRoutineCompletedOn, isRoutineDueOn } from "@/utils/routineHelpers";

// Fokus-Karte oben auf Home: Was steht heute an, was ist geschafft, was ist die nächste gute Tat?
const TodaySummaryCard = memo(() => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  const routines = useStore((state) => state.routines);
  const activeTaskCount = useStore((state) => state.activeTaskIds.length);
  const profileLp = useStore((state) => state.profile.profileLp);

  const { dueCount, doneCount } = useMemo(() => {
    const today = new Date();
    const due = routines.filter((routine) => isRoutineDueOn(routine, today));
    return {
      dueCount: due.length,
      doneCount: due.filter((routine) => isRoutineCompletedOn(routine, today)).length
    };
  }, [routines]);

  const progress = dueCount ? (doneCount / dueCount) * 100 : 0;
  const isAllDone = dueCount > 0 && doneCount === dueCount;

  const handleNextDeed = useCallback(() => router.push("/tasks"), []);

  return (
    <BaseCard style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <AppText type="labelSm" style={{ color: MyTheme.primaryAccent }}>
            {t("Today")}
          </AppText>
          <AppText type="title">
            {isAllDone
              ? t("All routines done, great job!")
              : dueCount
                ? t("{{done}} of {{total}} routines done", { done: doneCount, total: dueCount })
                : t("Ready for a good deed?")}
          </AppText>
        </View>
        <LpPoints points={profileLp} size="small" />
      </View>

      {dueCount > 0 && <ProgressBar progress={progress} accessibilityLabel={t("Routine progress today")} />}

      <View style={styles.footerRow}>
        <View style={styles.meta}>
          <Icon name="target" size={16} color={MyTheme.muted} />
          <AppText type="caption">{t("{{count}} active tasks", { count: activeTaskCount })}</AppText>
        </View>
        <AppButton size="sm" title={t("Next good deed")} onPress={handleNextDeed} />
      </View>
    </BaseCard>
  );
});
TodaySummaryCard.displayName = "TodaySummaryCard";

const getStyles = () =>
  StyleSheet.create({
    card: {
      gap: Spacing.md
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: Spacing.sm
    },
    titleColumn: {
      flex: 1,
      gap: Spacing.xs
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    meta: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    }
  });

export default TodaySummaryCard;
