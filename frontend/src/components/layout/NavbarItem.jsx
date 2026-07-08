import { useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import { Icon } from "../icons/Icon";

const NavbarItem = ({ route, isFocused, onPress }) => {
  const MyTheme = useAppTheme();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const hasUnread = useStore((state) => state.profile.hasUnreadNotifications || true);
  const styles = getStyles(isDarkMode);
  const [scale] = useState(() => new Animated.Value(1));

  const activeColor = MyTheme.primaryAccent;
  const inactiveColor = MyTheme.text;

  const animatePop = () => {
    Animated.timing(scale, { toValue: 1.15, duration: 150, useNativeDriver: true }).start(() => {
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    });
  };

  const handlePress = () => {
    onPress();
    animatePop();
  };

  return (
    <Pressable onPress={handlePress} style={styles.tabButton}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {route.name === "profile" && hasUnread && !isFocused && (
          <View style={[styles.badge, { backgroundColor: MyTheme.warning || "#ff0000" }]} />
        )}
        <Icon
          name={route.name || "help"}
          size={26}
          color={isFocused ? activeColor : inactiveColor}
          outline={!isFocused}
        />
      </Animated.View>
    </Pressable>
  );
};

const getStyles = () =>
  StyleSheet.create({
    tabButton: {
      flex: 1,
      height: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    badge: {
      position: "absolute",
      top: -2,
      right: -2,
      zIndex: 1,
      width: 8,
      height: 8,
      borderRadius: Spacing.borderRadius.full
    }
  });

export default NavbarItem;
