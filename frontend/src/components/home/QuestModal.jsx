import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import AppButton from "@/components/ui/AppButton";
import { Spacing } from "@/constants/Spacing";
import BaseBottomSheet from "../ui/BaseBottomSheet";
import { MyTheme } from "@/constants/Colors";

const QuestModal = ({ mockQuests, visible, onClose }) => {
  const [activeTab, setActiveTab] = useState("today"); // "today" | "week"
  const quests = mockQuests[activeTab];

  return (
    <BaseBottomSheet isVisible={visible} onClose={onClose} title="Herausforderungen">
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "today" && styles.activeTab]}
          onPress={() => setActiveTab("today")}
        >
          <AppText bold style={activeTab === "today" ? { color: MyTheme.text } : { color: MyTheme.muted }}>
            Heute
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "week" && styles.activeTab]}
          onPress={() => setActiveTab("week")}
        >
          <AppText bold style={activeTab === "week" ? { color: MyTheme.text } : { color: MyTheme.muted }}>
            Diese Woche
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {quests.map((quest) => {
          const current = quest.currentProgress || 0;
          const target = quest.target || 1;
          const progressPercent = Math.min((current / target) * 100, 100);
          return (
            <BaseCard key={quest.id} style={styles.questCard}>
              <View style={{ flex: 1, paddingRight: Spacing.md }}>
                <AppText bold style={styles.questTitle}>
                  {quest.title}
                </AppText>

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
                title={quest.completed ? (quest.collected ? "Erledigt" : `+${quest.points} LP`) : `Starten`}
                variant={quest.completed ? quest.collected && "primary" : "outline"}
                bgColor={quest.completed && !quest.collected && MyTheme.primaryAccent}
                disabled={quest.completed && quest.collected}
              />
            </BaseCard>
          );
        })}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </BaseBottomSheet>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: Spacing.lg
  },
  list: {
    flex: 1,
    paddingHorizontal: Spacing.lg
  },
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
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: Spacing.borderRadius.lg
  }
});

export default QuestModal;
