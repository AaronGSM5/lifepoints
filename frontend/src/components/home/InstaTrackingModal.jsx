import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import AppModal from "@/components/ui/AppModal";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function InstaTrackingModal({ visible, onClose, onConfirm }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

  const handleConfirm = () => {
    onConfirm(dontShowAgain);
  };

  return (
    <AppModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Haupttext */}
        <AppText style={styles.messageText} bold>
          Nutzen Sie Insta-Tracking nur bei erfüllten Aufgaben
        </AppText>

        {/* Checkbox Bereich */}
        <Pressable style={styles.checkboxContainer} onPress={() => setDontShowAgain(!dontShowAgain)}>
          <Icon
            name={dontShowAgain ? "checkmark" : "square"}
            size={24}
            color={dontShowAgain ? MyTheme.primaryAccent : MyTheme.text}
          />
          <AppText style={styles.checkboxText}>Nicht wieder anzeigen</AppText>
        </Pressable>

        {/* Bestätigungs-Button */}
        <AppButton title="Verstanden" onPress={handleConfirm} />
      </View>
    </AppModal>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: "stretch"
    },
    messageText: {
      marginBottom: Spacing.lg,
      textAlign: "center"
    },
    checkboxContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginBottom: Spacing.lg,
      paddingVertical: Spacing.xs
    },
    checkboxText: {
      marginLeft: Spacing.sm,
      fontSize: 14
    }
  });
