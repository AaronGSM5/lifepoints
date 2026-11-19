import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppIconButton from "../ui/AppIconButton";

const FeedItemActionBar = memo(({ handleLike, handleSave, handleShare, isLiked, isSaved, onOpenComments }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");
  return (
    <View style={styles.actionBar}>
      <View style={styles.actionLeft}>
        <AppIconButton
          icon="heart"
          outline={!isLiked}
          color={isLiked ? MyTheme.secondaryAccent : undefined}
          onPress={handleLike}
          accessibilityLabel={isLiked ? t("Remove like") : t("Like")}
          accessibilityState={{ selected: isLiked }}
        />
        <AppIconButton icon="chat" onPress={onOpenComments} accessibilityLabel={t("Open comments")} />
        <AppIconButton icon="forwardShare" onPress={handleShare} accessibilityLabel={t("Share")} />
      </View>

      <View style={styles.actionRight}>
        <AppIconButton
          icon="bookmark"
          outline={!isSaved}
          onPress={handleSave}
          accessibilityLabel={isSaved ? t("Remove from saved") : t("Save post")}
          accessibilityState={{ selected: isSaved }}
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
