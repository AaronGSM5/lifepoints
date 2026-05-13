import { StyleSheet, Modal, Pressable } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";

export default function AppModal({ visible, onClose, children }) {
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
          {children}
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
      width: "80%",
      maxWidth: 340,
      alignItems: "center"
    }
  });
