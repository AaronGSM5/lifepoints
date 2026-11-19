import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import CloseButton from "@/components/ui/CloseButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import OnboardingGuideItem from "./OnboardingGuideItem";
import OnboardingGuideSkeleton from "./OnboardingGuideSkeleton";

const OnboardingGuide = ({ tutorialSteps = [], isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("profile");
  const claimedQuests = useStore((state) => state.profile?.claimedQuests);
  const setHasCompletedOnboarding = useStore((state) => state.setHasCompletedOnboarding);
  const hasCompletedOnboarding = useStore((state) => state.hasCompletedOnboarding);
  const completedCount = useMemo(() => {
    return tutorialSteps?.filter((q) => q.completed).length;
  }, [tutorialSteps]);
  const isAllCompleted = tutorialSteps?.length > 0 && completedCount === tutorialSteps.length;
  const progress = tutorialSteps?.length > 0 ? completedCount / tutorialSteps.length : 0;

  if (isAllCompleted && !isLoading) return null;
  if (hasCompletedOnboarding) return null;

  if (isLoading) return <OnboardingGuideSkeleton stepsCount={tutorialSteps?.length || 3} />;

  return (
    <BaseCard style={styles.card}>
      <View style={styles.guideHeader}>
        <AppText type="h2">{t("Your Guide")}</AppText>
        <CloseButton onPress={() => setHasCompletedOnboarding(true)} />
      </View>

      <ProgressBar progress={progress * 100} style={styles.progressBar} />

      <View style={styles.progressTextContainer}>
        <AppText type="caption">
          {completedCount} {t("of")} {tutorialSteps?.length} {t("done")}
        </AppText>
      </View>

      <View style={styles.questList}>
        {tutorialSteps?.map((quest) => {
          const isClaimed = claimedQuests?.includes(quest.id);
          return <OnboardingGuideItem key={quest.id} quest={quest} isClaimed={isClaimed} />;
        })}
      </View>
    </BaseCard>
  );
};

export default OnboardingGuide;

const getStyles = () =>
  StyleSheet.create({
    card: {
      marginTop: Spacing.lg
    },
    guideHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.lg
    },
    progressBar: {
      marginBottom: Spacing.sm
    },
    progressTextContainer: {
      alignItems: "flex-end"
    },
    questList: {
      gap: Spacing.sm
    }
  });
