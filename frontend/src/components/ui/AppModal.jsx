import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const AppModal = memo(({ visible, onClose, children, contentStyle }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        {/* Backdrop als eigenes Element neben dem Inhalt, damit der Inhalt für Screenreader erreichbar bleibt. */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t("close")}
        />
        <View style={[styles.modalContent, contentStyle]} accessibilityViewIsModal onAccessibilityEscape={onClose}>
          {children}
        </View>
      </View>
    </Modal>
  );
});
AppModal.displayName = "AppModal";

const getStyles = (theme) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center"
    },
    modalContent: {
      backgroundColor: theme.background,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.lg,
      width: "80%",
      maxWidth: 340,
      alignItems: "center"
    }
  });

export default AppModal;
