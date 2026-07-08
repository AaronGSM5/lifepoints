import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import StatusBadge from "../ui/StatusBadge";

const FeedItemHeader = ({ id, username, avatar, badge, onPress, onOpenOptions }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  return (
    <View style={styles.header}>
      <Pressable onPress={onPress}>
        <View style={styles.headerUser}>
          <Animated.View style={styles.avatar} sharedTransitionTag={`avatar-${username}-${id}`}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={{ width: "100%", height: "100%", borderRadius: Spacing.borderRadius.full }}
                resizeMode="cover"
              />
            ) : (
              <AppText type="title">{username ? username.charAt(0).toUpperCase() : "U"}</AppText>
            )}
          </Animated.View>
          {badge ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
              <AppText bold style={styles.username}>
                {username}
              </AppText>
              <StatusBadge id={badge} />
            </View>
          ) : (
            <AppText bold style={styles.username}>
              {username}
            </AppText>
          )}
        </View>
      </Pressable>
      <Pressable hitSlop={15} onPress={onOpenOptions}>
        <Icon name={"dots"} size={20} color={MyTheme.muted} />
      </Pressable>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm + 2
    },
    headerUser: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent,
      justifyContent: "center",
      alignItems: "center"
    },
    username: {
      fontSize: 15
    }
  });

export default FeedItemHeader;
