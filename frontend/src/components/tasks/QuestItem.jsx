import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";
import LpPoints from "../ui/LpPoints";

const QuestItem = memo(({ quest, onStart }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const current = quest.currentProgress || 0;
  const target = quest.target || 1;
  const progressPercent = Math.min((current / target) * 100, 100);

  const buttonTitle = quest.completed ? (quest.collected ? t("Done") : `+${quest.points} LP`) : t("Start");

  return (
    <BaseCard style={styles.questCard}>
      <View style={styles.leftContainer}>
        <View style={styles.titleRow}>
          <AppText bold style={styles.titleText}>
            {t(quest.title)}
          </AppText>
          <LpPoints points={quest.points} />
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <AppText type="caption">
            {current}/{target}
          </AppText>
        </View>
      </View>

      <AppButton
        size="sm"
        title={buttonTitle}
        variant={quest.completed ? "primary" : "outline"}
        bgColor={quest.completed && !quest.collected ? MyTheme.primaryAccent : undefined}
        disabled={quest.completed && quest.collected}
        onPress={onStart}
      />
    </BaseCard>
  );
});
QuestItem.displayName = "QuestItem";

const getStyles = (theme) =>
  StyleSheet.create({
    questCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: Spacing.md,
      padding: Spacing.md,
      gap: Spacing.sm
    },
    leftContainer: {
      flex: 1,
      paddingRight: Spacing.sm
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    titleText: {
      flex: 1,
      paddingRight: Spacing.sm
    },
    progressContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md,
      marginTop: Spacing.sm
    },
    progressTrack: {
      flex: 1,
      height: 6,
      backgroundColor: theme.separator,
      borderRadius: theme.radius.lg,
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.primaryAccent,
      borderRadius: theme.radius.lg
    }
  });

export default QuestItem;
