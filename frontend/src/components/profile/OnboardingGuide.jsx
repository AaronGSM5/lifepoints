import React, { useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import { mockTutorialSteps } from "@/constants/MockData";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import useStore from "@/store/useStore";
import { checkQuestCompletion } from "@/utils/onboardingGuideHelpers";

const OnboardingGuide = ({ skeletonProps, isLoading }) => {
  const styles = getStyles();
  const profile = useStore((state) => state.profile);
  const activities = useStore((state) => state.activities);
  const claimOnboardingReward = useStore((state) => state.claimOnboardingReward);
  const tutorialSteps = mockTutorialSteps.map((quest) => ({
    ...quest,
    completed: checkQuestCompletion(quest.id, profile, activities)
  }));
  const completedCount = tutorialSteps.filter((q) => q.completed).length;
  const isAllCompleted = completedCount === tutorialSteps.length;
  const progress = completedCount / tutorialSteps.length;

  useEffect(() => {
    if (isLoading) return;

    tutorialSteps.forEach((quest) => {
      const isAlreadyClaimed = profile.claimedQuests?.includes(quest.id);

      if (quest.completed && !isAlreadyClaimed) {
        claimOnboardingReward(quest.id, quest.reward);
      }
    });
  }, [completedCount, profile.claimedQuests]);

  if (isAllCompleted && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <BaseCard style={{ marginTop: Spacing.xl }}>
        <View style={styles.guideHeader}>
          <Skeleton {...skeletonProps} width={140} height={28} borderRadius={6} />
          <Skeleton {...skeletonProps} width={80} height={16} borderRadius={4} />
        </View>

        <View style={{ marginBottom: Spacing.lg }}>
          <Skeleton {...skeletonProps} width="100%" height={8} borderRadius={4} />
        </View>

        <View style={styles.questList}>
          {tutorialSteps.map((item) => (
            <View key={`skeleton-${item.id}`} style={styles.questItem}>
              <View style={styles.questIconContainer}>
                <Skeleton {...skeletonProps} width={28} height={28} borderRadius={14} />
              </View>

              <View style={styles.questTextContainer}>
                <View style={{ marginBottom: 6 }}>
                  <Skeleton {...skeletonProps} width="60%" height={18} borderRadius={4} />
                </View>
                <Skeleton {...skeletonProps} width="30%" height={14} borderRadius={4} />
              </View>

              <Skeleton {...skeletonProps} width={16} height={16} borderRadius={4} />
            </View>
          ))}
        </View>
      </BaseCard>
    );
  }

  return (
    <BaseCard style={{ marginTop: Spacing.xl }}>
      <View style={styles.guideHeader}>
        <AppText type="h2">Dein Leitfaden</AppText>
        <AppText type="caption">
          {completedCount} von {tutorialSteps.length} erledigt
        </AppText>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressInner, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.questList}>
        {tutorialSteps.map((quest) => {
          const isClaimed = profile.claimedQuests?.includes(quest.id);
          return (
            <Pressable
              key={quest.id}
              style={({ pressed }) => [
                styles.questItem,
                quest.completed && styles.questItemCompleted,
                pressed && !quest.completed && { opacity: 0.7 }
              ]}
              onPress={() => {
                if (!quest.completed && quest.route) {
                  router.push(quest.route);
                }
              }}
            >
              <View style={styles.questIconContainer}>
                <Icon
                  name={quest.completed ? "checkmark" : quest.icon}
                  color={quest.completed ? MyTheme.primaryAccent : "gray"}
                />
              </View>

              <View style={styles.questTextContainer}>
                <AppText type="body" style={[styles.questTitle, quest.completed && styles.textStrikeThrough]}>
                  {quest.title}
                </AppText>
                <AppText type="caption" bold style={[styles.rewardText, isClaimed && { color: MyTheme.muted }]}>
                  {isClaimed ? "LP erhalten" : `+${quest.reward} LP`}
                </AppText>
              </View>

              {!quest.completed && <Icon name="right" color={MyTheme.muted} size={20} />}
            </Pressable>
          );
        })}
      </View>
    </BaseCard>
  );
};

export default OnboardingGuide;

const getStyles = () =>
  StyleSheet.create({
    guideHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: Spacing.lg
    },
    progressBar: {
      height: 8,
      backgroundColor: "#eee",
      borderRadius: Spacing.borderRadius.sm,
      marginBottom: Spacing.lg,
      overflow: "hidden"
    },
    progressInner: {
      height: "100%",
      backgroundColor: MyTheme.primaryAccent
    },
    questList: {
      gap: Spacing.sm
    },
    questItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.sm
    },
    questItemCompleted: {
      opacity: 0.8
    },
    questIconContainer: {
      width: 40,
      alignItems: "center"
    },
    questTextContainer: {
      flex: 1,
      marginLeft: Spacing.sm
    },
    questTitle: {
      fontSize: 16
    },
    textStrikeThrough: {
      textDecorationLine: "line-through",
      color: MyTheme.muted
    },
    rewardText: {
      color: MyTheme.primaryAccent
    }
  });
