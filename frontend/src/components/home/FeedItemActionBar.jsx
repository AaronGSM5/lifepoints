import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const FeedItemActionBar = memo(({ handleLike, handleSave, handleShare, isLiked, isSaved, onOpenComments }) => {
  const MyTheme = useAppTheme();
  const { t: tc } = useTranslation("common");
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
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
});
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
    actionRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.lg
    }
  });

export default FeedItemActionBar;
