import React, { useState, useRef, memo, useCallback } from "react";
import { View, StyleSheet, Pressable, TextInput, Platform, FlatList, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { postComments } from "@/mocks/PostComments";
import { router } from "expo-router";
import BaseBottomSheet from "../ui/BaseBottomSheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CommentItem = memo(({ item, isReply = false, onReply, onLike, onNavigate }) => {
  const styles = getStyles();
  return (
    <View style={[styles.commentRow, isReply && styles.replyRow]}>
      <View style={styles.avatarColumn}>
        <Pressable onPress={() => onNavigate(item.username)}>
          <Image source={{ uri: item.avatar }} style={isReply ? styles.replyAvatar : styles.commentAvatar} />
        </Pressable>
      </View>

      <View style={styles.commentContent}>
        <AppText bold style={styles.usernameText} onPress={() => onNavigate(item.username)}>
          {item.username}
        </AppText>

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
          <Pressable onPress={onReply} hitSlop={10}>
            <AppText style={styles.replyButton}>Antworten</AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

export default function CommentSheet({ isVisible, onClose, postId }) {
  const styles = getStyles();
  const insets = useSafeAreaInsets() || { top: 0, bottom: 0, left: 0, right: 0 };
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(postComments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const inputRef = useRef(null);

  const handleNavigate = useCallback(
    (username) => {
      onClose();

      setTimeout(() => {
        router.push(`/user/${username}`);
      }, 50);
    },
    [onClose, router]
  );

  const handleLikeComment = useCallback((id) => {
    setComments((prevComments) =>
      prevComments.map((comment) => (comment.id === id ? { ...comment, isLiked: !comment.isLiked } : comment))
    );
  }, []);

  const handleReply = useCallback((parentComment, targetUser) => {
    setReplyingTo({ parentId: parentComment.id, username: targetUser });
    setCommentText(`@${targetUser} `);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handlePostComment = () => {
    if (commentText.trim().length === 0) return;
    const newCommentData = {
      id: Date.now().toString(),
      username: "Du",
      avatar: "https://i.pravatar.cc/150?u=du",
      text: commentText,
      time: "Gerade eben"
    };

    if (replyingTo) {
      const updatedComments = comments.map((cmd) => {
        if (cmd.id === replyingTo.parentId) {
          return {
            ...cmd,
            replies: [...(cmd.replies || []), newCommentData]
          };
        }
        return cmd;
      });
      setComments(updatedComments);
    } else {
      setComments([newCommentData, ...comments]);
    }

    setCommentText("");
    setReplyingTo(null);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const renderComment = useCallback(
    ({ item }) => (
      <View style={styles.commentContainer}>
        <CommentItem
          item={item}
          onReply={() => handleReply(item, item.username)}
          onLike={handleLikeComment}
          onNavigate={handleNavigate}
        />

        {item.replies && item.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {item.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                item={reply}
                isReply={true}
                onReply={() => handleReply(item, reply.username)}
                onLike={handleLikeComment}
                onNavigate={handleNavigate}
              />
            ))}
          </View>
        )}
      </View>
    ),
    [handleReply, handleLikeComment, handleNavigate]
  );

  const renderEmptySection = () => (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Icon name="chat" size={40} color={MyTheme.muted} />
      <AppText style={{ color: MyTheme.muted, marginTop: 12 }}>Noch keine Kommentare. Schreib den ersten!</AppText>
    </View>
  );

  return (
    <BaseBottomSheet isVisible={isVisible} onClose={onClose} title={"Kommentare"}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          showsVerticalScrollIndicator={true}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={renderEmptySection}
          contentContainerStyle={styles.listContent}
          style={Platform.OS === "web" ? { maxHeight: SCREEN_HEIGHT * 0.75 - 130, overflowY: "auto" } : { flex: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        />
        {replyingTo && (
          <View style={styles.replyBar}>
            <AppText style={styles.replyBarText}>
              Antwort an{" "}
              <AppText bold style={{ fontSize: 14 }}>
                @{replyingTo.username}
              </AppText>
            </AppText>
            <Pressable onPress={() => setReplyingTo(null)}>
              <Icon name="close" size={16} color={MyTheme.muted} />
            </Pressable>
          </View>
        )}

        <View style={[styles.inputSection, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
          <Image source={{ uri: "https://i.pravatar.cc/150?u=du" }} style={styles.inputAvatar} />
          <View style={styles.inputBubble}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Kommentieren..."
              placeholderTextColor={MyTheme.muted}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              textAlignVertical="center"
              {...{ accessibilityRole: "text" }}
            />
            <Pressable
              onPress={handlePostComment}
              style={[styles.postButton, { opacity: commentText.trim().length > 0 ? 1 : 0.5 }]}
              disabled={commentText.trim().length === 0}
            >
              <AppText bold style={{ color: MyTheme.primaryAccent }}>
                Posten
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </BaseBottomSheet>
  );
}

const getStyles = () =>
  StyleSheet.create({
    listContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xl
    },
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
    repliesContainer: {
      marginLeft: 44,
      borderLeftWidth: 1,
      borderLeftColor: MyTheme.glas,
      paddingLeft: 12,
      marginTop: -Spacing.sm,
      marginBottom: Spacing.sm
    },
    replyBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.15)",
      paddingHorizontal: Spacing.md,
      paddingVertical: 8,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: MyTheme.separator
    },
    replyBarText: {
      fontSize: 13,
      color: MyTheme.muted
    },
    commentContainer: {
      marginBottom: Spacing.sm
    },
    commentContent: {
      flex: 1
    },
    commentText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
      color: MyTheme.text
    },
    commentTime: {
      fontSize: 12,
      color: MyTheme.muted
    },
    commentFooter: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      gap: Spacing.md
    },
    replyButton: {
      fontSize: 12,
      color: MyTheme.muted
    },
    inputSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: MyTheme.separator,
      backgroundColor: MyTheme.background
    },
    inputAvatar: {
      width: 36,
      height: 36,
      borderRadius: Spacing.borderRadius.full,
      marginRight: 12,
      marginBottom: 2
    },
    inputBubble: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: MyTheme.glas,
      borderRadius: Spacing.borderRadius.lg,
      paddingHorizontal: Spacing.md,
      minHeight: 36,
      maxHeight: 120
    },
    textInput: {
      flex: 1,
      fontSize: 14,
      color: MyTheme.text,
      padding: 0,
      includeFontPadding: false,
      textAlignVertical: "center",
      lineHeight: 18,
      paddingTop: Platform.OS === "ios" ? 9 : 8,
      paddingBottom: Platform.OS === "ios" ? 9 : 8,
      outlineStyle: "none"
    },
    postButton: {
      height: 36,
      justifyContent: "center"
    },
    avatarColumn: {
      marginRight: 12
    },
    likeColumn: {
      paddingLeft: 10,
      alignItems: "flex-end",
      justifyContent: "flex-start",
      paddingTop: 2
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
