import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next"

import { postComments } from "@/mocks/PostComments";
import useStore from "@/store/useStore";

export const useCommentLogic = () => {
  const { t } = useTranslation('home')
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(postComments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeStatusBadge = useStore((state) => state.profile.activeStatusBadge);
  const inputRef = useRef(null);

  const handleLikeComment = useCallback((id) => {
    setComments((prevComments) =>
      prevComments.map((comment) => (comment.id === id ? { ...comment, isLiked: !comment.isLiked } : comment))
    );
  }, []);

  const handleReply = useCallback((targetParentId, targetUser) => {
    setReplyingTo({ parentId: targetParentId, username: targetUser });
    setCommentText(`@${targetUser} `);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handlePostComment = () => {
    if (commentText.trim().length === 0) return;
    const newCommentData = {
      id: Date.now().toString(),
      username: t("You"),
      badge: activeStatusBadge,
      avatar: "https://i.pravatar.cc/150?u=du",
      text: commentText,
      time: t("Just now")
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

  return {
    comments, commentText, setCommentText, replyingTo, setReplyingTo,
    handleLikeComment, handleReply, handlePostComment, onRefresh,
    inputRef, isRefreshing
  };
}