import { memo, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";

const SurveyOptionCard = memo(({ option, isSelected, handleSelect }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const handlePress = useCallback(() => {
    handleSelect(option.value);
  }, [handleSelect, option.value]);
  return (
    <BaseCard key={option.value} isSelected={isSelected} style={styles.optionCard} onPress={handlePress}>
      <AppText style={styles.icon}>{option.icon}</AppText>
      <AppText type="body" bold style={styles.label}>
        {option.label}
      </AppText>
    </BaseCard>
  );
});
SurveyOptionCard.displayName = "SurveyOptionCard";

const getStyles = () =>
  StyleSheet.create({
    optionCard: {
      width: "47%",
      alignItems: "center"
    },
    icon: {
      fontSize: 32,
      lineHeight: 40
    },
    label: {
      marginTop: Spacing.sm
    }
  });

export default SurveyOptionCard;
