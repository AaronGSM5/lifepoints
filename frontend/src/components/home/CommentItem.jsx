import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import StatusBadge from "../ui/StatusBadge";

const CommentItem = memo(({ item, parentId, isReply = false, onReply, onLike, onNavigate }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");

  const handleReplyPress = useCallback(() => {
    const targetParentId = isReply ? parentId : item.id;
    onReply(targetParentId, item.username);
  }, [isReply, item, onReply, parentId]);

  const handleLike = useCallback(
    (id) => {
      onLike(id);
    },
    [onLike]
  );

  return (
    <View style={[styles.commentRow, isReply && styles.replyRow]}>
      <View style={styles.avatarColumn}>
        <Pressable onPress={() => onNavigate(item.username)}>
          <Avatar source={item.avatar} size="small" style={isReply && styles.replyAvatar} />
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
            <Icon
              name={"heart"}
              outline={!item.isLiked}
              size={14}
              onPress={() => handleLike(item.id)}
              color={item.isLiked ? "#FF3B30" : MyTheme.muted}
              style={styles.likeButton}
            />
          )}
        </View>

        <View style={styles.commentFooter}>
          <AppText style={styles.commentTime}>{item.time}</AppText>
          <AppText onPress={handleReplyPress} style={styles.replyButton}>
            {t("Reply")}
          </AppText>
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
