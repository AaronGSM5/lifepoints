import { StyleSheet, Modal, Pressable } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function AppModal({ visible, onClose, children }) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
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
