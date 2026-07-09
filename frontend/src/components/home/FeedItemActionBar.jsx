import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const FeedItemActionBar = ({ handleLike, handleSave, handleShare, isLiked, isSaved, onOpenComments }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.actionBar}>
      <View style={styles.actionLeft}>
        <Icon outline={!isLiked} name="heart" color={isLiked ? "red" : undefined} onPress={handleLike} />
        <Icon name="chat" onPress={onOpenComments} />
        <Icon name="forwardShare" onPress={handleShare} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
        <Icon outline={!isSaved} name="bookmark" onPress={handleSave} />
      </View>
    </View>
  );
};

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
    }
  });

export default FeedItemActionBar;
