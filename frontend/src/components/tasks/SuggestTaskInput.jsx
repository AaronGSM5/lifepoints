import { StyleSheet, View } from "react-native";
import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import AppInput from "../ui/AppInput";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { useState } from "react";

const SuggestTaskInput = () => {
  const styles = getStyles();
  const [suggestionInput, setSuggestionInput] = useState("");
  const handleSendSuggestion = () => {
    console.log("Mock Send");
    setSuggestionInput("");
  };
  return (
    <View style={styles.suggestionBox}>
      <View style={styles.suggestionHeader}>
        <View style={styles.bulbIcon}>
          <Icon name="bulb" size={20} />
        </View>
        <View>
          <AppText type="title">Suggest a Task</AppText>
          <AppText type="caption">Earn LP if your idea gets added!</AppText>
        </View>
      </View>
      <AppInput
        bottomMargin={false}
        placeholder="I want to see a task for..."
        value={suggestionInput}
        onChangeText={setSuggestionInput}
        rightIcon="send"
        onRightIconPress={handleSendSuggestion}
      />
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    suggestionBox: {
      backgroundColor: MyTheme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.lg
    },
    suggestionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.md
    },
    bulbIcon: {
      width: 40,
      height: 40,
      backgroundColor: MyTheme.primaryAccent,
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.sm
    }
  });

export default SuggestTaskInput;
