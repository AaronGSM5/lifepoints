import { View, StyleSheet, Modal, Pressable } from "react-native";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "../icons/Icon";

export default function PasswordRulesModal({ visible, onClose, passwordRules, passwordRuleStatus }) {
  const styles = getStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose} // Android Back Button
    >
      {/* Hintergrund: Klick hier schließt Modal */}
      <Pressable style={styles.modalBackground} onPress={onClose}>
        {/* Inhalt: Klick hier bleibt offen */}
        <Pressable style={styles.modalContent} onPress={() => {}}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const getStyles = () =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center"
    },
    modalContent: {
      backgroundColor: MyTheme.background,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.lg,
      minWidth: 280
    },
    ruleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.sm
    }
  });
