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

  const mainTabs = ["/home", "/tasks", "/communities", "/shop", "/profile"];
  const isMainTab = mainTabs.includes(pathname);

  // Responsive Logo
  const screenWidth = Dimensions.get("window").width;
  const logoWidth = Math.min(screenWidth * 0.4, 180);
  const logoHeight = logoWidth / 3.75;

  const LP = useStore((state) => state.profile.profileLp);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const resetProfile = useStore((state) => state.resetProfile);
  const styles = getStyles(isDarkMode);

  const handleResetProfile = () => {
    resetProfile();
  };

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
          <View style={{ flexDirection: "row", gap: Spacing.md }}>
            <Pressable hitSlop={15} onPress={handleResetProfile}>
              <Icon name="reset" />
            </Pressable>
            <Pressable hitSlop={15} onPress={() => router.push("/settings")}>
              <Icon name="settings" />
            </Pressable>
          </View>
        ) : isMainTab && pathname !== "/profile" ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg + 4 }}>
            <Pressable hitSlop={15} onPress={() => router.push("/search")}>
              <Icon name="search" />
            </Pressable>
            <Pressable hitSlop={15} onPress={() => router.push("/notifications")}>
              <Icon name="notifications" />
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

const getStyles = (isDarkMode) => {
  const bgColor = isDarkMode ? "rgb(15, 23, 41)" : "rgb(248, 250, 252)";
  const separatorColor = isDarkMode ? "rgba(0,0,0,0.08)" : "rgba(0, 0, 0, 0.06)";

  return StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: separatorColor
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
