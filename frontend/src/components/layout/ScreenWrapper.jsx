import React, { useMemo, useState } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

import Toolbar from "./Toolbar";

export const useFloatingNavbarPadding = () => {
  const insets = useSafeAreaInsets();
  const navbarBottomSpace = insets.bottom > 0 ? insets.bottom + 10 : 25;
  const navbarHeight = 65;
  const extraClearance = Spacing.md || 16;
  return navbarBottomSpace + navbarHeight + extraClearance;
};

/**
 * Feste Screen-Varianten. Jede Variante legt Toolbar und Innenabstände fest,
 * damit Screens nicht mehr einzelne Boolean-Props kombinieren müssen.
 *
 * - tab:       Tab-Screen mit Toolbar; Inhalt scrollt über der schwebenden Navbar.
 * - list:      Tab-Screen, dessen Liste (AnimatedScreenList) Abstände selbst verwaltet.
 * - stack:     Unterseite mit Toolbar (Zurück-Button), ohne Navbar.
 * - plain:     Ohne Toolbar, mit seitlichem Abstand (Auth, Fehler, "nicht gefunden").
 * - immersive: Ohne Toolbar und ohne seitlichen Abstand; der Screen bringt eigenen Header mit.
 */
export const SCREEN_VARIANTS = {
  tab: { toolbar: true, sides: true, top: "toolbar", bottom: "navbar" },
  list: { toolbar: true, sides: false, top: "inset", bottom: "none" },
  stack: { toolbar: true, sides: true, top: "toolbar", bottom: "inset" },
  plain: { toolbar: false, sides: true, top: "inset", bottom: "inset" },
  immersive: { toolbar: false, sides: false, top: "inset", bottom: "inset" }
};

export default function ScreenWrapper({
  children,
  variant = "stack",
  scrollY: externalScrollY,
  scrollable = true,
  useGradient = true,
  style
}) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const insets = useSafeAreaInsets();
  const navbarPadding = useFloatingNavbarPadding();
  const toolbarTopPadding = useToolbarPadding();
  const [internalScrollY] = useState(() => new Animated.Value(0));
  const scrollY = externalScrollY || internalScrollY;
  const config = SCREEN_VARIANTS[variant] || SCREEN_VARIANTS.stack;

  const paddingTop = config.top === "toolbar" ? toolbarTopPadding : insets.top;

  let paddingBottom = 0;
  if (config.bottom === "navbar") {
    paddingBottom = scrollable ? navbarPadding : insets.bottom;
  } else if (config.bottom === "inset") {
    paddingBottom = insets.bottom + (scrollable ? Spacing.lg : 0);
  }

  const contentStyles = [
    {
      paddingHorizontal: config.sides ? Spacing.md : 0,
      paddingTop,
      paddingBottom
    },
    style
  ];

  return (
    <View style={styles.wrapper}>
      {useGradient && (
        <LinearGradient colors={[MyTheme.background, MyTheme.backgroundBottom]} style={StyleSheet.absoluteFillObject} />
      )}
      {config.toolbar && <Toolbar scrollY={scrollY} />}
      {scrollable ? (
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[contentStyles, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: Platform.OS !== "web"
          })}
          scrollEventThrottle={16}
        >
          {children}
        </Animated.ScrollView>
      ) : (
        <View style={[{ flex: 1 }, contentStyles]}>{children}</View>
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.background
    }
  });
