import { useTranslation } from "react-i18next";
import { Image, Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";

const CommentInputSection = ({ inputRef, commentText, setCommentText, onPost }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("home");
  const insets = useSafeAreaInsets() || { top: 0, bottom: 0, left: 0, right: 0 };
  return (
    <View style={[styles.inputSection, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
      <Image source={{ uri: "https://i.pravatar.cc/150?u=du" }} style={styles.inputAvatar} />
      <View style={styles.inputBubble}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          placeholder={t("Leave a comment...")}
          placeholderTextColor={MyTheme.muted}
          value={commentText}
          onChangeText={setCommentText}
          multiline
          textAlignVertical="center"
          {...{ accessibilityRole: "text" }}
        />
        <Pressable
          onPress={onPost}
          style={[styles.postButton, { opacity: commentText.trim().length > 0 ? 1 : 0.5 }]}
          disabled={commentText.trim().length === 0}
        >
          <AppText bold style={{ color: MyTheme.primaryAccent }}>
            {t("Post")}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    inputSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.separator,
      backgroundColor: theme.background
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
      backgroundColor: theme.glas,
      borderRadius: Spacing.borderRadius.lg,
      paddingHorizontal: Spacing.md,
      minHeight: 36,
      maxHeight: 120
    },
    textInput: {
      flex: 1,
      fontSize: 14,
      color: theme.text,
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

export default CommentInputSection;
