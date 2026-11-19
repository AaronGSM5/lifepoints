import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { router, usePathname } from "expo-router";

import AppIconButton from "@/components/ui/AppIconButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";
import useStore from "@/store/useStore";

import AppImage from "../ui/AppImage";
import BackButton from "../ui/BackButton";
import LpPoints from "../ui/LpPoints";
import NotificationIcon from "../ui/NotificationsIcon";

const MAIN_TABS = ["/home", "/tasks", "/social", "/shop", "/profile"];

// Auf Home und Shop fährt die Toolbar beim Scrollen nach oben weg und kommt beim Zurückscrollen wieder
const HIDE_ON_SCROLL_PATHS = ["/home", "/shop"];

export default memo(function Toolbar({ scrollY }) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const toolbarHeight = useToolbarPadding();
  const LP = useStore((state) => state.profile.profileLp);
  const resetProfile = useStore((state) => state.resetProfile);
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");

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

  const isMainTab = MAIN_TABS.includes(pathname);
  const isProfile = pathname === "/profile";

  const screenWidth = Dimensions.get("window").width;
  const logoWidth = Math.min(screenWidth * 0.4, 110);
  const logoHeight = logoWidth / 3.75;

  const handleResetProfile = useCallback(() => resetProfile(), [resetProfile]);
  const handleToNotifications = useCallback(() => router.push("/notifications"), []);
  const handleToSettings = useCallback(() => router.push("/settings"), []);
  const handleToCreatePost = useCallback(() => router.push("/post/create"), []);
  const handleToSearch = useCallback(() => router.push("/search"), []);
  const handleToShop = useCallback(() => router.push("/shop"), []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: toolbarHeight,
          paddingTop: insets.top,
          paddingLeft: Math.max(Spacing.md, insets.left),
          paddingRight: Math.max(Spacing.md, insets.right),
          transform: [{ translateY: HIDE_ON_SCROLL_PATHS.includes(pathname) ? translateY : 0 }]
        }
      ]}
    >
      <View style={styles.sideSection}>
        {isMainTab ? <LpPoints points={LP} onPress={handleToShop} /> : <BackButton />}
      </View>

      <View style={styles.centerSection}>
        <Pressable onPress={__DEV__ ? () => router.push("/dev") : undefined} disabled={!__DEV__}>
          <AppImage
            source={require("@/../public/assets/lifepointsLogo.png")}
            style={{ width: logoWidth, height: logoHeight }}
            contentFit="contain"
          />
        </Pressable>
      </View>

      <View style={[styles.sideSection, styles.rightSection]}>
        {isProfile ? (
          <View style={styles.actions}>
            {__DEV__ && (
              <AppIconButton icon="reset" onPress={handleResetProfile} accessibilityLabel={t("Reset profile")} />
            )}
            <NotificationIcon onPress={handleToNotifications} />
            <AppIconButton icon="settings" onPress={handleToSettings} accessibilityLabel={t("Settings")} />
          </View>
        ) : isMainTab ? (
          <View style={styles.actions}>
            <AppIconButton icon="add" onPress={handleToCreatePost} accessibilityLabel={t("Create post")} />
            <AppIconButton icon="search" onPress={handleToSearch} accessibilityLabel={t("Search")} />
          </View>
        ) : (
          /* Platzhalter, damit das Logo zentriert bleibt */
          <View style={styles.placeholder} />
        )}
      </View>
    </Animated.View>
  );
});

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flexDirection: "row",
      alignItems: "center",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.45)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100
    },
    sideSection: {
      flex: 1,
      justifyContent: "center"
    },
    rightSection: {
      alignItems: "flex-end"
    },
    centerSection: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center"
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.lg
    },
    placeholder: {
      width: 40
    }
  });
