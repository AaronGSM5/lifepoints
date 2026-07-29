import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import { router } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import SurveyProgressBar from "@/components/onboarding/SurveyProgressBar";
import SurveyQuestion from "@/components/onboarding/SurveyQuestion";
import AppButton from "@/components/ui/AppButton";
import { mockSurveyOptions } from "@/constants/OnboardingSurvey";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

export default function SurveyScreen() {
  const completeOnboarding = useStore((state) => state.setHasCompletedOnboarding);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = useMemo(() => mockSurveyOptions[step], [step]);
  const totalSteps = mockSurveyOptions.length;

  const isCompleted = useMemo(
    () =>
      currentQuestion.multiple ? answers[currentQuestion.id]?.length > 0 : answers[currentQuestion.id] !== undefined,
    [answers, currentQuestion]
  );

  const handleSelect = useCallback(
    (value) => {
      setAnswers((prev) => {
        const { id, multiple } = currentQuestion;

        if (!multiple) {
          return { ...prev, [id]: value };
        }

        const currentSelected = prev[id] || [];
        const newSelected = currentSelected.includes(value)
          ? currentSelected.filter((item) => item !== value)
          : [...currentSelected, value];

        return { ...prev, [id]: newSelected };
      });
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      completeOnboarding(true);
      router.push("/auth/login");
    }
  }, [step, totalSteps, completeOnboarding]);

  return (
    <ScreenWrapper>
      <SurveyProgressBar currentStep={step} totalSteps={totalSteps} />
      <SurveyQuestion question={currentQuestion} answers={answers} onSelect={handleSelect} />
      <AppButton title={"Weiter"} style={styles.button} disabled={!isCompleted} onPress={handleNext} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: "auto",
    marginBottom: Spacing.lg
  }
});
