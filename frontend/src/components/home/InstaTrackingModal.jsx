import { memo, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppButton from "@/components/ui/AppButton";
import AppModal from "@/components/ui/AppModal";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const InstaTrackingModal = memo(({ visible, onClose, onConfirm }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  const toggleDontShowAgain = useCallback(() => {
    setDontShowAgain((prev) => !prev);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(dontShowAgain);
  }, [dontShowAgain, onConfirm]);

  return (
    <AppModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Haupttext */}
        <AppText style={styles.messageText} bold>
          Nutzen Sie Insta-Tracking nur bei erfüllten Aufgaben
        </AppText>

        {/* Checkbox Bereich */}
        <Pressable style={styles.checkboxContainer} onPress={toggleDontShowAgain}>
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
});
InstaTrackingModal.displayName = "InstaTrackingModal";

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
