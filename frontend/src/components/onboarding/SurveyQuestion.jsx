import { StyleSheet, View } from "react-native";
import SurveyOptionCard from "./SurveyOptionCard";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";

const SurveyQuestion = ({ question, answers, onSelect }) => {
  return (
    <View style={styles.content}>
      <AppText type="h1" style={styles.title}>
        {question.title}
      </AppText>

      <View style={styles.optionsGrid}>
        {question.options.map((option) => {
          const isSelected = question.multiple
            ? answers[question.id]?.includes(option.value)
            : answers[question.id] === option.value;

          return (
            <SurveyOptionCard key={option.value} option={option} isSelected={isSelected} handleSelect={onSelect} />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1
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
  }
});

export default SurveyQuestion;
