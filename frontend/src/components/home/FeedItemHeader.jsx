import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import LpPoints from "../ui/LpPoints";
import StatusBadge from "../ui/StatusBadge";

const FeedItemHeader = memo(({ id, username, avatar, badge, taskName, onPress, onOpenOptions, onTaskPress }) => {
  const MyTheme = useAppTheme();
  const { t: tc } = useTranslation("common");
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={username}>
          <View style={styles.headerUser}>
            <Animated.View style={styles.avatar} sharedTransitionTag={`avatar-${username}-${id}`}>
              <Avatar source={avatar} />
            </Animated.View>
            {badge ? (
              <View style={styles.badge}>
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
        <Icon
          name={"dots"}
          size={20}
          color={MyTheme.muted}
          onPress={onOpenOptions}
          accessibilityLabel={tc("More options")}
        />
      </View>
      {taskName && (
        <Pressable
          style={styles.taskRow}
          onPress={onTaskPress}
          disabled={!onTaskPress}
          accessibilityRole={onTaskPress ? "link" : undefined}
          accessibilityState={{ disabled: !onTaskPress }}
        >
          <Icon name="target" size={14} color={MyTheme.muted} />
          <AppText style={styles.taskText} numberOfLines={1}>
            {taskName} • <LpPoints points={100} size="xs" />
          </AppText>
        </Pressable>
      )}
    </View>
  );
});
FeedItemHeader.displayName = "FeedItemHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "column"
    },
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
      borderRadius: theme.radius.full,
      backgroundColor: theme.primaryAccent,
      justifyContent: "center",
      alignItems: "center"
    },
    username: {
      fontSize: 15
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    taskRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      gap: Spacing.sm,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: theme.glas,
      borderTopColor: theme.glas
    },
    taskText: {
      fontSize: 13,
      color: theme.muted,
      flexShrink: 1
    }
  });

export default FeedItemHeader;
