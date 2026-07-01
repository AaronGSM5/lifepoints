import { Animated, View, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";
import NotificationIcon from "../ui/NotificationsIcon";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import React, { memo, useMemo } from "react";

export default memo(function Toolbar({ scrollY }) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const toolbarHeight = useToolbarPadding();
  const LP = useStore((state) => state.profile.profileLp);
  const resetProfile = useStore((state) => state.resetProfile);
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

  const fallbackScrollY = useMemo(() => new Animated.Value(0), []);
  const activeScrollY = scrollY || fallbackScrollY;

  const translateY = useMemo(() => {
    const safeScrollY = activeScrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolateLeft: "clamp"
    });

    const clamped = Animated.diffClamp(safeScrollY, 0, toolbarHeight);

    return clamped.interpolate({
      inputRange: [0, toolbarHeight],
      outputRange: [0, -toolbarHeight],
      extrapolate: "clamp"
    });
  }, [activeScrollY, toolbarHeight]);

  const mainTabs = ["/home", "/tasks", "/communities", "/shop", "/profile"];
  const isMainTab = mainTabs.includes(pathname);

  // Responsive Logo
  const screenWidth = Dimensions.get("window").width;
  const logoWidth = Math.min(screenWidth * 0.4, 180);
  const logoHeight = logoWidth / 3.75;

  const handleResetProfile = () => {
    resetProfile();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: toolbarHeight,
          paddingTop: insets.top,
          paddingLeft: Math.max(Spacing.md, insets.left),
          paddingRight: Math.max(Spacing.md, insets.right),
          transform: [{ translateY: pathname === "/profile" || pathname === "/tasks" ? 0 : translateY }],
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100
        }
      ]}
    >
      {/* Back-Button */}
      <View style={styles.sideSection}>
        {isMainTab && <AppBadge label={`${LP} LP`} onPress={() => router.push("/shop")} style={{ border: "none" }} />}
        {!isMainTab && (
          <Pressable hitSlop={15} onPress={() => router.back()}>
            <Icon name="back" />
          </Pressable>
        )}
      </View>

      {/* Title */}
      <View style={styles.centerSection}>
        <Pressable onPress={() => router.push("/")}>
          <Image
            source={require("@/../public/assets/appIcons/adaptive-icon.png")}
            style={{ width: logoWidth, height: logoHeight }}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={[styles.sideSection, { alignItems: "flex-end" }]}>
        {pathname === "/profile" ? (
          <View style={{ flexDirection: "row", gap: Spacing.lg }}>
            <Pressable hitSlop={15} onPress={handleResetProfile}>
              <Icon name="reset" />
            </Pressable>
            <NotificationIcon onPress={() => router.push("/notifications")} />
            <Pressable hitSlop={15} onPress={() => router.push("/settings")}>
              <Icon name="settings" />
            </Pressable>
          </View>
        ) : isMainTab && pathname !== "/profile" ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
            <Pressable hitSlop={15} onPress={() => router.push("/post/create")}>
              <Icon name="add" />
            </Pressable>
            <Pressable hitSlop={15} onPress={() => router.push("/search")}>
              <Icon name="search" />
            </Pressable>
          </View>
        ) : (
          /* Placeholder for centered Logo */
          <View style={{ width: 40 }} />
        )}
      </View>
    </Animated.View>
  );
});

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flexDirection: "row",
      alignItems: "center"
    },
    sideSection: {
      flex: 1,
      justifyContent: "center"
    },
    centerSection: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center"
    }
  });
};
