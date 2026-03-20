import { Spacing } from "@/constants/Spacing";
import AppText from "../ui/AppText";
import { MyTheme } from "@/constants/Colors";

const { Pressable, StyleSheet } = require("react-native");

const SurveyOptionCard = ({ option, isSelected, handleSelect }) => {
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
};

const styles = StyleSheet.create({
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

export default SurveyOptionCard;
