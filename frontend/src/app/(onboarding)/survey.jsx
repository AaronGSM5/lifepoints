import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { router } from "expo-router";

import ScreenFooter from "@/components/layout/ScreenFooter";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import SurveyProgressBar from "@/components/onboarding/SurveyProgressBar";
import SurveyQuestion from "@/components/onboarding/SurveyQuestion";
import AppButton from "@/components/ui/AppButton";
import { mockSurveyOptions } from "@/constants/OnboardingSurvey";
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
    <ScreenWrapper withPaddingBottom={false}>
      <View style={styles.content}>
        <SurveyProgressBar currentStep={step} totalSteps={totalSteps} />
        <SurveyQuestion question={currentQuestion} answers={answers} onSelect={handleSelect} />
      </View>
      <ScreenFooter breakOut>
        <AppButton title={"Weiter"} disabled={!isCompleted} onPress={handleNext} />
      </ScreenFooter>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
});
