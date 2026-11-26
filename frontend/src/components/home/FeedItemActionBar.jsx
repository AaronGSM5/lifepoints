import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";

// Ohne `handleSave` (MVP: Speichern ausgeblendet) zeigt die Leiste Like + Zahl links und Teilen rechts
const FeedItemActionBar = memo(
  ({ handleLike, handleSave, handleShare, isLiked, isSaved, onOpenComments, likesCount }) => {
    const MyTheme = useAppTheme();
    const { t: tc } = useTranslation("common");
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

    if (!handleSave) {
      const likesLabel = `${likesCount} ${likesCount === 1 ? "Like" : "Likes"}`;
      return (
        <View style={styles.actionBar}>
          <View style={styles.actionLeft}>
            <Pressable
              onPress={handleLike}
              style={styles.likeButton}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`${isLiked ? tc("Remove like") : tc("Like")}, ${likesLabel}`}
              accessibilityState={{ selected: isLiked }}
            >
              <Icon outline={!isLiked} name="heart" color={isLiked ? "red" : undefined} />
              <AppText bold style={styles.likesCount}>
                {likesCount}
              </AppText>
            </Pressable>
            {onOpenComments && <Icon name="chat" onPress={onOpenComments} accessibilityLabel={tc("Open comments")} />}
          </View>

          <View style={styles.actionRight}>
            <Icon name="forwardShare" onPress={handleShare} accessibilityLabel={tc("Share")} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <Icon
            outline={!isLiked}
            name="heart"
            color={isLiked ? "red" : undefined}
            onPress={handleLike}
            accessibilityLabel={isLiked ? tc("Remove like") : tc("Like")}
          />
          {onOpenComments && <Icon name="chat" onPress={onOpenComments} accessibilityLabel={tc("Open comments")} />}
          <Icon name="forwardShare" onPress={handleShare} accessibilityLabel={tc("Share")} />
        </View>

        <View style={styles.actionRight}>
          <Icon
            outline={!isSaved}
            name="bookmark"
            onPress={handleSave}
            accessibilityLabel={isSaved ? tc("Remove from saved") : tc("Save post")}
          />
        </View>
      </View>
    );
  }
);
FeedItemActionBar.displayName = "FeedItemActionBar";

const getStyles = () =>
  StyleSheet.create({
    actionBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      marginTop: 2
    },
    actionLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.lg
    },
    likeButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    likesCount: {
      fontSize: 14
    },
    actionRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.lg
    }
  });

export default FeedItemActionBar;
