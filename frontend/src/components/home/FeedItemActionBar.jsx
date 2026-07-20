import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const FeedItemActionBar = ({ handleLike, handleSave, handleShare, isLiked, isSaved, onOpenComments }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.actionBar}>
      <View style={styles.actionLeft}>
        <Pressable hitSlop={10} onPress={handleLike}>
          <Icon outline={!isLiked} name="heart" color={isLiked ? "red" : undefined} />
        </Pressable>
        <Pressable hitSlop={10} onPress={onOpenComments}>
          <Icon name="chat" />
        </Pressable>
        <Pressable hitSlop={10} onPress={handleShare}>
          <Icon name="forwardShare" />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
        <Pressable hitSlop={10} onPress={handleSave}>
          <Icon outline={!isSaved} name="bookmark" />
        </Pressable>
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
