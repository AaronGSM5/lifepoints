import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";
import LpPoints from "../ui/LpPoints";
import ProgressBar from "../ui/ProgressBar";

const QuestItem = memo(({ quest, onStart }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  const current = quest.currentProgress || 0;
  const target = quest.target || 1;
  const progressPercent = Math.min((current / target) * 100, 100);

  const buttonTitle = quest.completed ? (quest.collected ? t("Done") : `+${quest.points} LP`) : t("Start");

  return (
    <BaseCard style={styles.questCard}>
      <View style={styles.leftContainer}>
        <View style={styles.titleRow}>
          <AppText bold style={styles.titleText}>
            {quest.title}
          </AppText>
          <LpPoints points={quest.points} />
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progressPercent} style={styles.progress} />
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

const getStyles = () =>
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
    progress: {
      flex: 1,
      width: undefined
    }
  });

export default QuestItem;
