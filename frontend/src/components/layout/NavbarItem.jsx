import { memo, useCallback, useMemo, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";

import { Icon } from "../icons/Icon";

const NavbarItem = memo(({ route, isFocused, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const hasUnread = useStore((state) => state.profile.hasUnreadNotifications || true);
  const [scale] = useState(() => new Animated.Value(1));

  const activeColor = MyTheme.primaryAccent;
  const inactiveColor = MyTheme.text;

  const animatePop = useCallback(() => {
    Animated.timing(scale, { toValue: 1.15, duration: 150, useNativeDriver: Platform.OS !== "web" }).start(() => {
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: Platform.OS !== "web" }).start();
    });
  }, [scale]);

  const handlePress = useCallback(() => {
    onPress();
    animatePop();
  }, [animatePop, onPress]);

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
});
NavbarItem.displayName = "NavbarItem";

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
