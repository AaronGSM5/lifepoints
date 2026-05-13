import { View, StyleSheet } from "react-native";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "../icons/Icon";
import AppModal from "../ui/AppModal";

export default function PasswordRulesModal({ visible, onClose, passwordRules, passwordRuleStatus }) {
  const styles = getStyles();

  return (
    <AppModal visible={visible} onClose={onClose}>
      {passwordRules.map((rule) => (
        <View key={rule.name} style={styles.ruleRow}>
          <Icon
            name={passwordRuleStatus[rule.name] ? "checkmark" : "close"}
            size={20}
            color={passwordRuleStatus[rule.name] ? MyTheme.success : MyTheme.warning}
            style={{ marginRight: Spacing.sm }}
          />
          <AppText>{rule.displayMessage}</AppText>
        </View>
      ))}
    </AppModal>
  );
}

const getStyles = () =>
  StyleSheet.create({
    ruleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.sm
    }
  });
