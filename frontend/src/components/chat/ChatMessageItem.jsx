import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";

const ChatMessageItem = memo(({ item, showSenderName = true }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const isMe = item.senderId === "me";
  const isSystem = item.senderId === "system";

  if (isSystem) {
    return (
      <View style={styles.systemMessageContainer}>
        <AppText type="caption" bold style={styles.systemMessageText}>
          {item.text}
        </AppText>
      </View>
    );
  }
  return (
    <View style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowOther]}>
      {!isMe && showSenderName && (
        <View style={styles.avatar}>
          <AppText bold style={styles.avatarText}>
            {item.senderName?.charAt(0)}
          </AppText>
        </View>
      )}
      <View style={[styles.messageBubble, isMe ? styles.messageBubbleMe : styles.messageBubbleOther]}>
        {!isMe && showSenderName && (
          <AppText bold type="caption" style={[styles.senderName, item.color && { color: item.color }]}>
            {item.senderName}
          </AppText>
        )}
        <AppText style={{ color: isMe ? "#fff" : MyTheme.text }}>{item.text}</AppText>
        <AppText type="caption" style={[styles.timeText, isMe && { color: "rgba(255,255,255,0.7)" }]}>
          {item.time}
        </AppText>
      </View>
    </View>
  );
});
ChatMessageItem.displayName = "ChatMessageItem";

const getStyles = (theme) =>
  StyleSheet.create({
    systemMessageContainer: {
      alignItems: "center",
      marginVertical: Spacing.md
    },
    systemMessageText: {
      backgroundColor: theme.glas,
      paddingHorizontal: Spacing.md,
      paddingVertical: 4,
      borderRadius: Spacing.borderRadius.md
    },
    messageRow: {
      flexDirection: "row",
      marginBottom: Spacing.md,
      alignItems: "flex-end"
    },
    messageRowMe: {
      justifyContent: "flex-end"
    },
    messageRowOther: {
      justifyContent: "flex-start"
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: "rgba(76, 150, 160, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: Spacing.sm
    },
    avatarText: {
      color: "#4C96A0",
      fontSize: 14
    },
    messageBubble: {
      maxWidth: "80%",
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.lg
    },
    messageBubbleMe: {
      backgroundColor: theme.primaryAccent,
      borderBottomRightRadius: Spacing.borderRadius.sm - 4
    },
    messageBubbleOther: {
      backgroundColor: theme.primary,
      borderBottomLeftRadius: Spacing.borderRadius.sm - 4
    },
    senderName: {
      color: theme.primaryAccent,
      marginBottom: 2
    },
    timeText: {
      fontSize: 10,
      marginTop: 4,
      alignSelf: "flex-end",
      opacity: 0.6
    }
  });

export default ChatMessageItem;
