import { View, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import AppBadge from "../ui/AppBadge";
import useStore from "@/store/useStore";
import NotificationIcon from "../ui/NotificationsIcon";

export default function Toolbar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const LP = useStore((state) => state.profile.profileLp);
  const resetProfile = useStore((state) => state.resetProfile);
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

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
        {isMainTab && pathname !== "/shop" && (
          <AppBadge label={`${LP} LP`} onPress={() => router.push("/shop")} style={{ border: "none" }} />
        )}
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
            <Pressable hitSlop={15} onPress={() => router.push("/notifications")}>
              <NotificationIcon onPress={() => router.push("/notifications")} />
            </Pressable>
            <Pressable hitSlop={15} onPress={() => router.push("/settings")}>
              <Icon name="settings" />
            </Pressable>
          </View>
        ) : isMainTab && pathname !== "/profile" ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
            <Pressable hitSlop={15} onPress={() => console.log("HIER WIRD BEITRAG ERSTELLT")}>
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
    </View>
  );
}

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
