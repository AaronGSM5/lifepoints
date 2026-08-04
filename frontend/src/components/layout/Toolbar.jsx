import React, { memo, useCallback, useMemo } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { router, usePathname } from "expo-router";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import useStore from "@/store/useStore";

import { Icon } from "../icons/Icon";
import AppImage from "../ui/AppImage";
import BackButton from "../ui/BackButton";
import LpPoints from "../ui/LpPoints";
import NotificationIcon from "../ui/NotificationsIcon";

export default memo(function Toolbar({ scrollY }) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const toolbarHeight = useToolbarPadding();
  const LP = useStore((state) => state.profile.profileLp);
  const resetProfile = useStore((state) => state.resetProfile);
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

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

  const mainTabs = ["/home", "/tasks", "/social", "/shop", "/profile"];
  const isMainTab = mainTabs.includes(pathname);

  const screenWidth = Dimensions.get("window").width;
  const logoWidth = Math.min(screenWidth * 0.4, 110);
  const logoHeight = logoWidth / 3.75;

  const handleResetProfile = useCallback(() => {
    resetProfile();
  }, [resetProfile]);

  const handleToNotifications = useCallback(() => router.push("/notifications"), []);
  const handleToSettings = useCallback(() => router.push("/settings"), []);
  const handleToCreatePost = useCallback(() => router.push("/post/create"), []);
  const handleToSearch = useCallback(() => router.push("/search"), []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: toolbarHeight,
          paddingTop: insets.top,
          paddingLeft: Math.max(Spacing.md, insets.left),
          paddingRight: Math.max(Spacing.md, insets.right),
          transform: [{ translateY: pathname === "/home" || pathname === "/shop" ? translateY : 0 }],
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100
        }
      ]}
    >
      <View style={styles.sideSection}>
        {isMainTab ? <LpPoints points={LP} onPress={() => router.push("/shop")} /> : <BackButton />}
      </View>

      <View style={styles.centerSection}>
        <Pressable onPress={() => router.push("/dev")}>
          <AppImage
            source={require("@/../public/assets/lifepointsLogo.png")}
            style={{ width: logoWidth, height: logoHeight }}
            contentFit="contain"
          />
        </Pressable>
      </View>

      <View style={[styles.sideSection, { alignItems: "flex-end" }]}>
        {pathname === "/profile" ? (
          <View style={{ flexDirection: "row", gap: Spacing.lg }}>
            <Icon name="reset" onPress={handleResetProfile} />
            <NotificationIcon onPress={handleToNotifications} />
            <Icon name="settings" onPress={handleToSettings} />
          </View>
        ) : isMainTab && pathname !== "/profile" ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
            <Icon name="add" onPress={handleToCreatePost} />
            <Icon name="search" onPress={handleToSearch} />
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
