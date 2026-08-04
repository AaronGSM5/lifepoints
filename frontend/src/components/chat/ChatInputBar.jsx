import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppIconButton from "../ui/AppIconButton";
import AppInput from "../ui/AppInput";

const ChatInputBar = ({ value, onChangeText, onSend, onAttach, placeholder }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.inputContainer}>
      <AppIconButton icon="add" color={MyTheme.muted} onPress={onAttach} style={styles.attachButton} />
      <AppInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        containerStyle={{ flex: 8 }}
        bottomMargin={false}
      />
      <AppIconButton
        icon="send"
        iconSize={20}
        color={value.trim() ? MyTheme.primaryAccent : MyTheme.muted}
        onPress={onSend}
        disabled={!value.trim()}
        style={styles.sendButton}
      />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
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
      flex: 1
    },
    sendButton: {
      flex: 1
    }
  });

export default ChatInputBar;
