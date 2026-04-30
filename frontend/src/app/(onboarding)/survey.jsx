import React, { useState } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppButton from "@/components/ui/AppButton";
import { mockSurveyOptions } from "@/constants/OnboardingSurvey";
import SurveyProgressBar from "@/components/onboarding/SurveyProgressBar";
import SurveyQuestion from "@/components/onboarding/SurveyQuestion";

export default function SurveyScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = mockSurveyOptions[step];
  const totalSteps = mockSurveyOptions.length;

  const hasAnsweredCurrentQuestion = currentQuestion.multiple
    ? answers[currentQuestion.id]?.length > 0
    : answers[currentQuestion.id] !== undefined;

  const handleSelect = (value) => {
    setAnswers((prev) => {
      if (currentQuestion.multiple) {
        const currentSelected = prev[currentQuestion.id] || [];
        const newSelected = currentSelected.includes(value)
          ? currentSelected.filter((item) => item !== value)
          : [...currentSelected, value];

        return { ...prev, [currentQuestion.id]: newSelected };
      } else {
        return { ...prev, [currentQuestion.id]: value };
      }
    });
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Umfrage beendet:", answers);
      router.push("/auth/register");
    }
  };

  return (
    <ScreenWrapper>
      <SurveyProgressBar currentStep={step} totalSteps={totalSteps} />
      <SurveyQuestion question={currentQuestion} answers={answers} onSelect={handleSelect} />
      <AppButton
        title={"Weiter"}
        style={{ marginTop: "auto", marginBottom: Spacing.lg }}
        disabled={!hasAnsweredCurrentQuestion}
        onPress={handleNext}
      />
    </ScreenWrapper>
  );
}
