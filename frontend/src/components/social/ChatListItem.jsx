import { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppImage from "../ui/AppImage";
import AppText from "../ui/AppText";

const ChatListItem = memo(({ chat }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <TouchableOpacity key={chat.id} style={styles.chatRow} activeOpacity={0.7}>
      <AppImage source={chat.avatar} style={styles.chatAvatar} />

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <AppText bold>{chat.userName}</AppText>
          <AppText type="caption">{chat.time}</AppText>
        </View>

        <View style={styles.chatFooter}>
          <AppText
            bold={chat.unread > 0}
            numberOfLines={1}
            style={[styles.lastMessage, chat.unread > 0 && { color: MyTheme.text }]}
          >
            {chat.lastMessage}
          </AppText>

          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <AppText bold style={styles.unreadText}>
                {chat.unread}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});
ChatListItem.displayName = "ChatListItem";

const getStyles = (theme) =>
  StyleSheet.create({
    chatRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator
    },
    chatAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: Spacing.md,
      backgroundColor: theme.glas
    },
    chatInfo: {
      flex: 1,
      justifyContent: "center"
    },
    chatHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    },
    chatFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    lastMessage: {
      flex: 1,
      color: theme.muted,
      marginRight: Spacing.md
    },
    unreadBadge: {
      backgroundColor: theme.primaryAccent,
      borderRadius: Spacing.borderRadius.full,
      minWidth: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 6
    },
    unreadText: {
      color: "black",
      fontSize: 12
    }
  });

export default ChatListItem;
