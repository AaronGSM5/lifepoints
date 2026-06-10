import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function NotificationIcon({ onPress }) {
  const MyTheme = useAppTheme();
  const hasUnread = useStore((state) => state.profile.hasUnreadNotifications || false);

  return (
    <Pressable hitSlop={15} onPress={onPress}>
      {hasUnread && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: MyTheme.warning || "#ff0000",
              borderColor: MyTheme.background
            }
          ]}
        />
      )}
      <Icon name="bell" />
    </Pressable>
  );
}

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
