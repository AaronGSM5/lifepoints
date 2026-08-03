import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppInput from "../ui/AppInput";

const ChatInputBar = ({ value, onChangeText, onSend, onAttach, placeholder }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={onAttach} style={styles.attachButton}>
        <Icon name="add" color={MyTheme.muted} />
      </TouchableOpacity>
      <AppInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        containerStyle={{ flex: 8 }}
        bottomMargin={false}
      />
      <TouchableOpacity onPress={onSend} style={styles.sendButton} disabled={!value.trim()}>
        <Icon name="send" size={20} color={value.trim() ? MyTheme.primaryAccent : MyTheme.muted} />
      </TouchableOpacity>
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
      borderTopColor: theme.glas,
      backgroundColor: theme.background
    },
    attachButton: {
      flex: 1,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center"
    },
    sendButton: {
      flex: 1,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default ChatInputBar;
