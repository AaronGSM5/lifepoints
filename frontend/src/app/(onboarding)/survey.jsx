import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppButton from "@/components/ui/AppButton";

const QUESTIONS = [
  {
    id: "goals",
    title: "Was ist dein Ziel?",
    options: [
      { label: "Umwelt", icon: "🌱", value: "eco" },
      { label: "Soziales", icon: "🤝", value: "social" },
      { label: "Tierschutz", icon: "🐾", value: "animals" },
      { label: "Nachbarschaft", icon: "🏠", value: "community" }
    ],
    multiple: true
  },
  {
    id: "interests",
    title: "Was liegt dir am Herzen?",
    options: [
      { label: "Umwelt", icon: "🌱", value: "eco" },
      { label: "Soziales", icon: "🤝", value: "social" },
      { label: "Tierschutz", icon: "🐾", value: "animals" },
      { label: "Nachbarschaft", icon: "🏠", value: "community" }
    ],
    multiple: true
  }
];

export default function SurveyScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = QUESTIONS[step];

  const handleSelect = (value) => {
    if (currentQuestion.multiple) {
      const currentSelected = answers[currentQuestion.id] || [];

      let newSelected;
      if (currentSelected.includes(value)) {
        newSelected = currentSelected.filter((item) => item !== value);
      } else {
        newSelected = [...currentSelected, value];
      }

      setAnswers({ ...answers, [currentQuestion.id]: newSelected });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Umfrage beendet:", answers);
      router.push("/auth/register");
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.progressBar}>
        <View style={[styles.progressInner, { width: `${(step / QUESTIONS.length) * 100}%` }]} />
      </View>

      <View style={styles.content}>
        <AppText type="h1" style={styles.title}>
          {currentQuestion.title}
        </AppText>

        <View style={styles.optionsGrid}>
          {currentQuestion.options.map((option) => {
            const isSelected = currentQuestion.multiple
              ? answers[currentQuestion.id]?.includes(option.value)
              : answers[currentQuestion.id] === option.value;

            return (
              <Pressable
                key={option.value}
                style={[styles.optionCard, isSelected && styles.selectedCard]}
                onPress={() => handleSelect(option.value)}
              >
                <AppText style={{ fontSize: 32 }}>{option.icon}</AppText>
                <AppText type="body" bold style={{ marginTop: Spacing.sm }}>
                  {option.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <AppButton title={"Weiter"} style={{ marginTop: "auto", marginBottom: Spacing.lg }} onPress={handleNext} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 6,
    backgroundColor: "#121212",
    borderRadius: Spacing.borderRadius.full,
    marginVertical: Spacing.lg
  },
  progressInner: {
    height: "100%",
    backgroundColor: MyTheme.primaryAccent,
    borderRadius: Spacing.borderRadius.full
  },
  title: {
    marginBottom: Spacing.xl,
    textAlign: "center"
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.md
  },
  optionCard: {
    width: "47%",
    backgroundColor: MyTheme.primary,
    padding: Spacing.lg,
    borderRadius: Spacing.borderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: MyTheme.secondary
  },
  selectedCard: {
    borderColor: MyTheme.primaryAccent,
    backgroundColor: MyTheme.primaryAccent
  }
});
