import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

import NavigationRow from "./NavigationRow";
import QuestItem from "./QuestItem";
import BaseBottomSheet from "../ui/BaseBottomSheet";

const QuestModal = ({ mockQuests, visible, onClose }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const tabLabels = [t("Today"), t("This Week")];
  const tabKeys = ["today", "week"];

  const questProgress = useStore((state) => state.questProgress);
  const claimQuestReward = useStore((state) => state.claimQuestReward);
  const syncQuestPeriods = useStore((state) => state.syncQuestPeriods);

  useEffect(() => {
    if (visible) syncQuestPeriods();
  }, [visible, syncQuestPeriods]);

  const activeTab = tabKeys[activeIndex];

  // MVP: nur Quests mit automatischem Trigger (z. B. TASK_COMPLETED) – der Rest braucht Backend-Events
  const quests = useMemo(
    () =>
      (mockQuests[activeTab] || [])
        .filter((quest) => Boolean(quest.trigger))
        .map((quest) => {
          const progress = questProgress?.[quest.id];
          const currentProgress = progress?.progress || 0;
          return {
            ...quest,
            currentProgress,
            completed: currentProgress >= quest.target,
            collected: Boolean(progress?.isCollected)
          };
        }),
    [mockQuests, activeTab, questProgress]
  );

  const handleQuestPress = useCallback(
    (quest) => {
      if (quest.completed && !quest.collected) {
        if (claimQuestReward(quest.id)) triggerHaptic("success");
        return;
      }
      onClose();
    },
    [claimQuestReward, onClose]
  );

  return (
    <BaseBottomSheet isVisible={visible} onClose={onClose} title={t("Challenges")} containerStyle={styles.bottomSheet}>
      <NavigationRow tabs={tabLabels} activeIndex={activeIndex} onTabChange={setActiveIndex} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {quests.map((quest) => (
          <QuestItem key={quest.id} quest={quest} onStart={() => handleQuestPress(quest)} />
        ))}
      </ScrollView>
    </BaseBottomSheet>
  );
};

const getStyles = () =>
  StyleSheet.create({
    list: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.xl
    },
    scrollContent: {
      paddingBottom: Spacing.xl
    },
    bottomSheet: {
      height: "80%"
    }
  });

export default QuestModal;
