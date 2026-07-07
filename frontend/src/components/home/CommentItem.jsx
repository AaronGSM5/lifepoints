import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import StatusBadge from "../ui/StatusBadge";

const CommentItem = memo(({ item, parentId, isReply = false, onReply, onLike, onNavigate }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("home");

  const handleReplyPress = () => {
    const targetParentId = isReply ? parentId : item.id;
    onReply(targetParentId, item.username);
  };

  return (
    <View style={[styles.commentRow, isReply && styles.replyRow]}>
      <View style={styles.avatarColumn}>
        <Pressable onPress={() => onNavigate(item.username)}>
          <Image source={{ uri: item.avatar }} style={isReply ? styles.replyAvatar : styles.commentAvatar} />
        </Pressable>
      </View>

      <View style={styles.commentContent}>
        {item.badge ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
            <AppText bold style={styles.usernameText} onPress={() => onNavigate(item.username)}>
              {item.username}
            </AppText>
            <StatusBadge id={item.badge} size={16} />
          </View>
        ) : (
          <AppText bold style={styles.usernameText} onPress={() => onNavigate(item.username)}>
            {item.username}
          </AppText>
        )}

        <View style={styles.textAndLikeRow}>
          <AppText style={styles.commentText}>{item.text}</AppText>

          {!isReply && (
            <Pressable hitSlop={10} style={styles.likeButton} onPress={() => onLike(item.id)}>
              <Icon name={"heart"} outline={!item.isLiked} size={14} color={item.isLiked ? "#FF3B30" : MyTheme.muted} />
            </Pressable>
          )}
        </View>

        <View style={styles.commentFooter}>
          <AppText style={styles.commentTime}>{item.time}</AppText>
          <Pressable onPress={handleReplyPress} hitSlop={10}>
            <AppText style={styles.replyButton}>{t("Reply")}</AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

CommentItem.displayName = "CommentItem";

const getStyles = (theme) =>
  StyleSheet.create({
    commentRow: {
      flexDirection: "row",
      paddingVertical: Spacing.sm,
      width: "100%"
    },
    replyRow: {
      marginBottom: Spacing.sm
    },
    commentAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#F0F0F0"
    },
    replyAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14
    },
    commentContent: {
      flex: 1
    },
    commentText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
      color: theme.text
    },
    commentTime: {
      fontSize: 12,
      color: theme.muted
    },
    commentFooter: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      gap: Spacing.md
    },
    replyButton: {
      fontSize: 12,
      color: theme.muted
    },
    avatarColumn: {
      marginRight: 12
    },
    usernameText: {
      marginBottom: 2
    },
    textAndLikeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    likeButton: {
      paddingLeft: 12,
      paddingTop: 2
    }
  });

export default CommentItem;
