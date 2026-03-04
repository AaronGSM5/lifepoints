import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { mockComments } from "@/constants/MockData";

export default function CommentSheet({ isVisible, onClose, postId }) {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const safeInsets = useSafeAreaInsets();
  const insets = safeInsets || { top: 0, bottom: 0, left: 0, right: 0 };
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handlePostComment = () => {
    if (commentText.trim().length === 0) return;
    const newComment = {
      id: Date.now().toString(),
      username: "Du",
      avatar: "https://i.pravatar.cc/150?u=du",
      text: commentText,
      time: "Gerade eben"
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentRow}>
      <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <AppText style={styles.commentText}>
          <AppText bold>{item.username} </AppText>
          {item.text}
        </AppText>
        <AppText style={styles.commentTime}>{item.time} • Antworten</AppText>
      </View>
      {/* Kleines Herz rechts zum Liken des Kommentars */}
      <Pressable hitSlop={10} style={{ paddingLeft: 10 }}>
        <Icon name="heart" outline size={14} color={MyTheme.muted} />
      </Pressable>
    </View>
  );

  const renderEmptySection = () => (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Icon name="chat" size={40} color={MyTheme.muted} />
      <AppText style={{ color: MyTheme.muted, marginTop: 12 }}>Noch keine Kommentare. Schreib den ersten!</AppText>
    </View>
  );

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <KeyboardAvoidingView style={styles.sheetWrapper} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <View style={styles.dragPill} />
              <AppText bold style={styles.headerTitle}>
                Kommentare
              </AppText>
            </View>
            {/* Kommentar-Liste */}
            <View style={{ flex: 1 }}>
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={renderComment}
                showsVerticalScrollIndicator={true}
                ListEmptyComponent={renderEmptySection}
                contentContainerStyle={styles.listContent}
                style={
                  Platform.OS === "web" ? { maxHeight: SCREEN_HEIGHT * 0.75 - 130, overflowY: "auto" } : { flex: 1 }
                }
                keyboardShouldPersistTaps="handled"
              />
            </View>
            {/* Eingabefeld (Sticky at bottom) */}
            <View style={[styles.inputSection, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
              <Image source={{ uri: "https://i.pravatar.cc/150?u=du" }} style={styles.inputAvatar} />
              <View style={styles.inputBubble}>
                <TextInput
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
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  sheetWrapper: {
    height: "75%",
    width: "100%"
  },
  sheet: {
    flex: 1,
    backgroundColor: MyTheme.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden"
  },

  header: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: MyTheme.separator,
    paddingHorizontal: Spacing.md
  },
  dragPill: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 2,
    marginBottom: 12,
    marginTop: 8
  },
  headerTitle: {
    fontSize: 16,
    marginBottom: 12
  },

  listContent: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl
  },
  commentRow: {
    flexDirection: "row",
    marginBottom: Spacing.lg
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: "#F0F0F0"
  },
  commentContent: {
    flex: 1
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: MyTheme.text
  },
  commentTime: {
    fontSize: 12,
    color: MyTheme.muted,
    marginTop: 4
  },

  inputSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm + 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: MyTheme.separator,
    backgroundColor: MyTheme.background
  },
  inputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    marginBottom: 2
  },
  inputBubble: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.04)",
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
  }
});
