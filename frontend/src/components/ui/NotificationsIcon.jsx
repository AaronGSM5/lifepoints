import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

const NotificationIcon = memo(({ onPress }) => {
  const MyTheme = useAppTheme();
  const hasUnread = useStore((state) => state.profile.hasUnreadNotifications || true);

  const badgeStyle = useMemo(
    () => ({
      backgroundColor: MyTheme.warning ?? "#ff0000",
      borderColor: MyTheme.background
    }),
    [MyTheme.warning, MyTheme.background]
  );

  return (
    <Pressable hitSlop={15} onPress={onPress}>
      {hasUnread && <View style={[styles.badge, badgeStyle]} />}
      <Icon name="bell" />
    </Pressable>
  );
});
NotificationIcon.displayName = "NotificationIcon";

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    zIndex: 1,
    width: 12,
    height: 12,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 2
  }
});

export default NotificationIcon;
