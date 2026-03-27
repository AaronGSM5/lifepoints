import { View, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import AppText from "../ui/AppText";
import AppBadge from "../ui/AppBadge";

export default function Toolbar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const mainTabs = ["/home", "/tasks", "/communities", "/shop", "/profile"];
  const isMainTab = mainTabs.includes(pathname);

  // Responsive Logo
  const screenWidth = Dimensions.get("window").width;
  const logoWidth = Math.min(screenWidth * 0.4, 180);
  const logoHeight = logoWidth / 3.75;

  const LP = "1.250";

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
          <Pressable hitSlop={15} onPress={() => router.push("/notifications")}>
            <Icon name="notifications" />
          </Pressable>
        ) : (
          /* Placeholder for centered Logo */
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
