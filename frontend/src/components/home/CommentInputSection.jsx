import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppImage from "../ui/AppImage";
import AppText from "../ui/AppText";
import Separator from "../ui/Separator";

const CommentInputSection = memo(({ inputRef, commentText, setCommentText, onPost }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  const insets = useSafeAreaInsets() || { top: 0, bottom: 0, left: 0, right: 0 };
  return (
    <>
      <Separator />
      <View style={[styles.inputSection, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        <AppImage source={"https://i.pravatar.cc/150?u=du"} variant={"avatarSmall"} style={styles.inputAvatar} />
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
            accessibilityRole="text"
          />
          <AppText
            bold
            onPress={onPost}
            disabled={commentText.trim().length === 0}
            style={{ color: MyTheme.primaryAccent }}
          >
            {t("Post")}
          </AppText>
        </View>
      </View>
    </>
  );
});
CommentInputSection.displayName = "CommentInputSection";

const getStyles = (theme) =>
  StyleSheet.create({
    inputSection: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm
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
    }
  });

export default CommentInputSection;
