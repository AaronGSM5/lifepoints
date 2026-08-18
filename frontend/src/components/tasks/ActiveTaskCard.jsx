import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { calculateStepPoints } from "@/utils/taskHelpers";

import ActiveTaskHeader from "./ActiveTaskHeader";
import AddSubStepForm from "./AddSubStepForm";
import SubStepItem from "./SubStepItem";
import AppButton from "../ui/AppButton";
import AppSkeleton from "../ui/AppSkeleton";

const ActiveTaskCard = memo(
  ({
    id,
    title,
    icon,
    lp,
    progress = 0,
    isLoading,
    onAction,
    initialExpanded = false,
    subSteps = [],
    onToggleSubStep,
    onAddSubStep,
    onDeleteSubStep,
    style
  }) => {
    const { t } = useTranslation("tasks");
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const stepPoints = calculateStepPoints(subSteps, lp);

    const handleGoToTask = useCallback(() => {
      router.push(`/task/${id}`);
    }, [id]);

    if (isLoading) {
      return <AppSkeleton height={70} radius={Spacing.borderRadius.lg} />;
    }

    return (
      <BaseCard style={[styles.card, style]}>
        <ActiveTaskHeader
          title={title}
          icon={icon}
          progress={progress}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          onAction={onAction}
        />
        {isExpanded && (
          <>
            <View style={styles.contentContainer}>
              {subSteps.map((step) => {
                return (
                  <SubStepItem
                    key={step._id}
                    step={step}
                    stepPoints={stepPoints}
                    onToggle={onToggleSubStep}
                    onDelete={onDeleteSubStep}
                  />
                );
              })}

              <AddSubStepForm onAddSubStep={onAddSubStep} />
            </View>

            <View style={styles.footer}>
              <AppButton title={t("Go to Task")} variant={"ghost"} onPress={handleGoToTask} size={"sm"} />
              <AppButton title={t("Finish")} onPress={onAction} />
            </View>
          </>
        )}
      </BaseCard>
    );
  }
);
ActiveTaskCard.displayName = "ActiveTaskCard";

const styles = StyleSheet.create({
  card: {
    overflow: "hidden"
  },
  contentContainer: {
    paddingTop: Spacing.md,
    paddingLeft: Spacing.lg
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.md
  }
});

export default ActiveTaskCard;
