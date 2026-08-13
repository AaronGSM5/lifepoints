import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

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

  const activeTab = tabKeys[activeIndex];
  const quests = mockQuests[activeTab] || [];

  return (
    <BaseBottomSheet isVisible={visible} onClose={onClose} title={t("Challenges")}>
      <NavigationRow tabs={tabLabels} activeIndex={activeIndex} onTabChange={setActiveIndex} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {quests.map((quest) => (
          <QuestItem key={quest.id} quest={quest} onStart={() => console.log("Quest gestartet: ", quest.id)} />
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
    }
  });

export default QuestModal;
