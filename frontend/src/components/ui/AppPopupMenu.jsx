import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const AppPopupMenu = ({ visible, onClose, items }) => {
  const theme = useAppTheme();

  if (!visible) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={[styles.menuCard, { backgroundColor: theme.background, borderColor: theme.separator }]}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, item.isDanger && { borderTopWidth: 1, borderTopColor: theme.separator }]}
            onPress={() => {
              onClose();
              item.onPress();
            }}
          >
            {item.icon && <Icon name={item.icon} size={18} color={item.color || theme.text} />}
            <AppText style={[styles.menuText, { color: item.color || theme.text }]}>{item.label}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: -1000,
    bottom: -1000,
    left: -1000,
    right: -1000,
    zIndex: 90
  },
  menuCard: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: Spacing.xs,
    borderRadius: 12,
    padding: Spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 180,
    zIndex: 100,
    borderWidth: 1
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm
  },
  menuText: {
    fontSize: 14
  }
});

export default AppPopupMenu;
