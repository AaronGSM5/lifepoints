import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import StatusBadge from "../ui/StatusBadge";

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
      {!isMe && showSenderName && <Avatar source={item.avatar} name={item.senderName} style={styles.avatar} />}
      <View style={[styles.messageBubble, isMe ? styles.messageBubbleMe : styles.messageBubbleOther]}>
        {!isMe &&
          showSenderName &&
          (item.badge ? (
            <View style={styles.nameWithBadge}>
              <AppText bold type="caption" style={[styles.senderName, item.color && { color: item.color }]}>
                {item.senderName}
              </AppText>
              <StatusBadge id={item.badge} />
            </View>
          ) : (
            <AppText bold type="caption" style={[styles.senderName, item.color && { color: item.color }]}>
              {item.senderName}
            </AppText>
          ))}
        <AppText style={{ color: isMe ? "#000" : MyTheme.text }}>{item.text}</AppText>
        <AppText type="caption" style={[styles.timeText, isMe && { color: "#000" }]}>
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
      marginRight: Spacing.sm
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
    nameWithBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    timeText: {
      fontSize: 10,
      marginTop: Spacing.xs,
      alignSelf: "flex-end",
      opacity: 0.75
    }
  });

export default ChatMessageItem;
