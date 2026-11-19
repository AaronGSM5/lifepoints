import { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppIconButton from "../ui/AppIconButton";
import AppInput from "../ui/AppInput";
import AppPopupMenu from "../ui/AppPopupMenu";

const menuItems = [
      {
        label: "Foto anhängen",
        icon: "camera",
      },
      {
        label: "Gewohnheit teilen",
        icon: "leaf",
      },
      {
        label: "Umfrage starten",
        icon: "statsChart",
      }
    ]

const ChatInputBar = memo(({ value = "", onChangeText, onSend, placeholder }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const safeValue = value || "";
  const isTrimmedEmpty = !safeValue.trim();

  return (
    <View style={styles.wrapper}>
      <AppPopupMenu visible={showMenu} items={menuItems} onClose={closeMenu} placement="top" />
      <View style={styles.inputContainer}>
        <AppIconButton icon="add" color={MyTheme.muted} onPress={toggleMenu} style={styles.attachButton} />
        <AppInput
          placeholder={placeholder}
          value={safeValue}
          onChangeText={onChangeText}
          containerStyle={{ flex: 8 }}
          bottomMargin={false}
        />
        <AppIconButton
          icon="send"
          iconSize={20}
          color={isTrimmedEmpty ? MyTheme.muted : MyTheme.primaryAccent}
          onPress={onSend}
          disabled={isTrimmedEmpty}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
});
ChatInputBar.displayName = "ChatInputBar";

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      position: "relative"
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.separator,
      backgroundColor: theme.background
    },
    attachButton: {
      padding: Spacing.xs
    },
    sendButton: {
      flex: 1
    }
  });

export default ChatInputBar;
