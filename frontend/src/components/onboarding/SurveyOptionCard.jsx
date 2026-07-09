import { useMemo } from "react";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";

const { Pressable, StyleSheet } = require("react-native");

const SurveyOptionCard = ({ option, isSelected, handleSelect }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <Pressable
      key={option.value}
      style={[styles.optionCard, isSelected && styles.selectedCard]}
      onPress={() => handleSelect(option.value)}
    >
      <AppText style={{ fontSize: 32, lineHeight: 40 }}>{option.icon}</AppText>
      <AppText type="body" bold style={{ marginTop: Spacing.sm }}>
        {option.label}
      </AppText>
    </Pressable>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    optionCard: {
      width: "47%",
      backgroundColor: theme.primary,
      padding: Spacing.lg,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.secondary
    },
    selectedCard: {
      borderColor: theme.primaryAccent,
      backgroundColor: theme.primaryAccent
    }
  });

export default SurveyOptionCard;
