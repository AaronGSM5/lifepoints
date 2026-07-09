import { memo, useCallback, useMemo } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const AppModal = memo(({ visible, onClose, children, contentStyle }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const handleIgnorePress = useCallback(() => {}, []);
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable style={[styles.modalContent, contentStyle]} onPress={handleIgnorePress}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
});
AppModal.displayName = "AppModal";

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

export default AppModal;
