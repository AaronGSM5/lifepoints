import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import CommentInputSection from "./CommentInputSection";
import CommentItem from "./CommentItem";
import ReplyBar from "./ReplyBar";
import BaseBottomSheet from "../ui/BaseBottomSheet";
import { useCommentLogic } from "@/hooks/useCommentLogic";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CommentSheet({ isVisible, onClose }) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("home");
  const {
    comments,
    commentText,
    setCommentText,
    replyingTo,
    setReplyingTo,
    handleLikeComment,
    handleReply,
    handlePostComment,
    onRefresh,
    inputRef,
    isRefreshing
  } = useCommentLogic();

  const handleNavigate = useCallback(
    (username) => {
      onClose();

      setTimeout(() => {
        router.push(`/user/${username}`);
      }, 50);
    },
    [onClose]
  );

  const renderComment = useCallback(
    ({ item }) => (
      <View style={styles.commentContainer}>
        <CommentItem item={item} onReply={handleReply} onLike={handleLikeComment} onNavigate={handleNavigate} />

        {item.replies && item.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {item.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                item={reply}
                parentId={item.id}
                isReply={true}
                onReply={handleReply}
                onLike={handleLikeComment}
                onNavigate={handleNavigate}
              />
            ))}
          </View>
        )}
      </View>
    ),
    [handleReply, handleLikeComment, handleNavigate, styles]
  );

  const renderEmptySection = () => (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Icon name="chat" size={40} color={MyTheme.muted} />
      <AppText style={{ color: MyTheme.muted, marginTop: 12 }}>
        {t("No comments yet. Be the first to leave one!")}
      </AppText>
    </View>
  );

  return (
    <BaseBottomSheet isVisible={isVisible} onClose={onClose} title={t("Comments")}>
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
        {replyingTo && <ReplyBar replyingTo={replyingTo} onPress={() => setReplyingTo(null)} />}
        <CommentInputSection
          inputRef={inputRef}
          commentText={commentText}
          setCommentText={setCommentText}
          onPost={handlePostComment}
        />
      </View>
    </BaseBottomSheet>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    listContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xl
    },
    repliesContainer: {
      marginLeft: 44,
      borderLeftWidth: 1,
      borderLeftColor: theme.glas,
      paddingLeft: 12,
      marginTop: -Spacing.sm,
      marginBottom: Spacing.sm
    },
    commentContainer: {
      marginBottom: Spacing.sm
    }
  });
