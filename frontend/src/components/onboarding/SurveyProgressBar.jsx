import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const SurveyProgressBar = ({ currentStep, totalSteps }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressInner, { width: `${progressPercentage}%` }]} />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    progressBar: {
      height: 6,
      backgroundColor: "#121212",
      borderRadius: Spacing.borderRadius.full,
      marginVertical: Spacing.lg
    },
    progressInner: {
      height: "100%",
      backgroundColor: theme.primaryAccent,
      borderRadius: Spacing.borderRadius.full
    }
  });

export default SurveyProgressBar;
