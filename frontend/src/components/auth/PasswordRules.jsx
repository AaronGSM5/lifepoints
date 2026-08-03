import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

export default function PasswordRules({ passwordRules, passwordRuleStatus }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  return (
    <View>
      {passwordRules.map((rule) => (
        <View key={rule.name} style={styles.ruleRow}>
          <Icon
            name={passwordRuleStatus[rule.name] ? "checkmark" : "close"}
            size={20}
            color={passwordRuleStatus[rule.name] ? MyTheme.success : MyTheme.warning}
            style={{ marginRight: Spacing.sm }}
          />
          <AppText type={"caption"} style={styles.displayText}>
            {rule.displayMessage}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    ruleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.xs
    },
    displayText: {
      color: theme.text
    }
  });
