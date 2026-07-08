import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppInput from "../ui/AppInput";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";

const SuggestTaskInput = memo(() => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");
  const [suggestionInput, setSuggestionInput] = useState("");

  const handleSendSuggestion = useCallback(() => {
    if (!suggestionInput.trim()) return;
    console.log("Mock Send: ", suggestionInput);
    setSuggestionInput("");
  }, [suggestionInput]);

  return (
    <BaseCard>
      <View style={styles.suggestionHeader}>
        <View style={styles.bulbIcon}>
          <Icon name="bulb" size={20} />
        </View>
        <View style={styles.textContainer}>
          <AppText type="title">{t("Suggest a Task")}</AppText>
          <AppText type="caption">{t("Earn LP if your idea gets added!")}</AppText>
        </View>
      </View>
      <AppInput
        bottomMargin={false}
        placeholder={t("I want to see a task for...")}
        value={suggestionInput}
        onChangeText={setSuggestionInput}
        rightIcon="send"
        onRightIconPress={handleSendSuggestion}
      />
    </BaseCard>
  );
});
SuggestTaskInput.displayName = "SuggestTaskInput";

const getStyles = (theme) =>
  StyleSheet.create({
    suggestionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.md
    },
    bulbIcon: {
      width: 40,
      height: 40,
      backgroundColor: theme.primaryAccent,
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.sm
    },
    textContainer: {
      flex: 1
    }
  });

export default SuggestTaskInput;
