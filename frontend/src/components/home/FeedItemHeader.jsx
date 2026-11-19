import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppIconButton from "../ui/AppIconButton";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import LpPoints from "../ui/LpPoints";
import StatusBadge from "../ui/StatusBadge";

const FeedItemHeader = memo(
  ({ id, username, avatar, badge, taskName, taskLp, onPress, onOpenOptions, onTaskPress }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("common");
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onPress} accessibilityRole="link" accessibilityLabel={username}>
            <View style={styles.headerUser}>
              <Animated.View style={styles.avatar} sharedTransitionTag={`avatar-${username}-${id}`}>
                <Avatar source={avatar} />
              </Animated.View>
              {badge ? (
                <View style={styles.badge}>
                  <AppText type="label">{username}</AppText>
                  <StatusBadge id={badge} />
                </View>
              ) : (
                <AppText type="label">{username}</AppText>
              )}
            </View>
          </Pressable>
          <AppIconButton
            icon="dots"
            iconSize={20}
            color={MyTheme.muted}
            onPress={onOpenOptions}
            accessibilityLabel={t("More options")}
          />
        </View>
        {taskName && (
          <Pressable
            style={styles.taskRow}
            onPress={onTaskPress}
            disabled={!onTaskPress}
            accessibilityRole="link"
            accessibilityLabel={taskName}
          >
            <Icon name="target" size={14} color={MyTheme.primaryAccent} />
            <AppText type="caption" style={styles.taskText} numberOfLines={1}>
              {taskName}
            </AppText>
            {typeof taskLp === "number" && <LpPoints points={taskLp} size="xs" />}
          </Pressable>
        )}
      </View>
    );
  }
);
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
      paddingVertical: Spacing.sm
    },
    headerUser: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.primaryAccent,
      justifyContent: "center",
      alignItems: "center"
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
      flexShrink: 1
    }
  });

export default FeedItemHeader;
