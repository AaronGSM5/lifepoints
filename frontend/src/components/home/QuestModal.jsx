import React, { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseBottomSheet from "../ui/BaseBottomSheet";
import LpPoints from "../ui/LpPoints";

const QuestItem = memo(({ quest, onStart }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getQuestItemStyles(MyTheme), [MyTheme]);
  const current = quest.currentProgress || 0;
  const target = quest.target || 1;
  const progressPercent = Math.min((current / target) * 100, 100);

  const getButtonTitle = () => {
    if (quest.completed) return quest.collected ? "Done" : `+${quest.points} LP`;
    return "Start";
  };

  return (
    <BaseCard style={styles.questCard}>
      <View style={{ flex: 1, paddingRight: Spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText bold style={{ flex: 1, paddingRight: Spacing.sm }}>
            {quest.title}
          </AppText>
          <LpPoints points={quest.points} />
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: MyTheme.primaryAccent }]}
            />
          </View>
          <AppText type="caption">
            {current}/{target}
          </AppText>
        </View>
      </View>

      <AppButton
        size="sm"
        title={getButtonTitle()}
        variant={quest.completed ? "primary" : "outline"}
        bgColor={quest.completed && !quest.collected ? MyTheme.primaryAccent : undefined}
        disabled={quest.completed && quest.collected}
        onPress={onStart}
      />
    </BaseCard>
  );
});
QuestItem.displayName = "QuestItem";

const QuestModal = ({ mockQuests, visible, onClose }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  const [activeTab, setActiveTab] = useState("today");

  const quests = mockQuests[activeTab];

  return (
    <BaseBottomSheet isVisible={visible} onClose={onClose} title={t("Challenges")}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "today" && styles.activeTab]}
          onPress={() => setActiveTab("today")}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === "today" }}
        >
          <AppText bold style={activeTab === "today" ? { color: MyTheme.text } : { color: MyTheme.muted }}>
            {t("Today")}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "week" && styles.activeTab]}
          onPress={() => setActiveTab("week")}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === "week" }}
        >
          <AppText bold style={activeTab === "week" ? { color: MyTheme.text } : { color: MyTheme.muted }}>
            {t("This Week")}
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {quests.map((quest) => (
          <QuestItem key={quest.id} quest={quest} onStart={() => console.log("Quest gestartet: ", quest.id)} />
        ))}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </BaseBottomSheet>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    tabContainer: {
      flexDirection: "row",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Spacing.lg,
      padding: 4,
      marginHorizontal: Spacing.lg,
      marginTop: Spacing.md,
      marginBottom: Spacing.lg
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.sm,
      alignItems: "center",
      borderRadius: Spacing.lg
    },
    activeTab: {
      backgroundColor: theme.primaryAccent,
      borderRadius: Spacing.lg
    },
    list: {
      flex: 1,
      paddingHorizontal: Spacing.lg
    }
  });

const getQuestItemStyles = (theme) =>
  StyleSheet.create({
    questCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: Spacing.md,
      padding: Spacing.md,
      gap: Spacing.sm
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
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: Spacing.borderRadius.lg,
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.primaryAccent,
      borderRadius: Spacing.borderRadius.lg
    }
  });

export default QuestModal;
