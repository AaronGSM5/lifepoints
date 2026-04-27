import { View, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import AppText from "../ui/AppText";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";

export default function Toolbar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const styles = getStyles();

  const mainTabs = ["/home", "/tasks", "/communities", "/shop", "/profile"];
  const isMainTab = mainTabs.includes(pathname);

  // Responsive Logo
  const screenWidth = Dimensions.get("window").width;
  const logoWidth = Math.min(screenWidth * 0.4, 180);
  const logoHeight = logoWidth / 3.75;

  const LP = useStore((state) => state.profile.profileLp);

  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <View
      style={[
        styles.container,
        {
          height: 56 + insets.top,
          paddingTop: insets.top,
          paddingLeft: Math.max(Spacing.md, insets.left),
          paddingRight: Math.max(Spacing.md, insets.right)
        }
      ]}
    >
      {/* Back-Button */}
      <View style={styles.sideSection}>
        {isMainTab && pathname !== "/shop" && <AppBadge label={`${LP} LP`} onPress={() => router.push("/shop")} />}
        {!isMainTab && (
          <Pressable hitSlop={15} onPress={() => router.back()}>
            <Icon name="back" />
          </Pressable>
        )}
      </View>

      {/* Title */}
      <View style={styles.centerSection}>
        <Image
          source={require("@/../public/assets/adaptive-icon.png")}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.sideSection, { alignItems: "flex-end" }]}>
        {pathname === "/profile" ? (
          <Pressable hitSlop={15} onPress={() => router.push("/settings")}>
            <Icon name="settings" />
          </Pressable>
        ) : isMainTab && pathname !== "/profile" ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg + 4 }}>
            <Pressable hitSlop={15} onPress={() => router.push("/search")}>
              <Icon name="search" />
            </Pressable>
            <Pressable hitSlop={15} onPress={() => router.push("/notifications")}>
              <Icon name="notifications" />
            </Pressable>
            <Pressable hitSlop={15} onPress={toggleDarkMode}>
              <Icon name="moon" />
            </Pressable>
          </View>
        ) : (
          /* Placeholder for centered Logo */
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: MyTheme.background,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: MyTheme.separator
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
