import { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppPopupMenu from "../ui/AppPopupMenu";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import BackButton from "../ui/BackButton";

const UserChatHeader = memo(({ mockChatPartner, onProfilePress, onOptionsPress }) => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const [showMenu, setShowMenu] = useState(false);

  const handleMute = useCallback(() => {
    setShowMenu(false);
    if (onOptionsPress) onOptionsPress("mute");
  }, [onOptionsPress]);

  const handleBlock = useCallback(() => {
    setShowMenu(false);
    if (onOptionsPress) onOptionsPress("block");
  }, [onOptionsPress]);

  const menuItems = useMemo(
    () => [
      {
        label: "Stummschalten",
        icon: "notifications-off-outline",
        onPress: handleMute
      },
      {
        label: "Blockieren",
        icon: "ban-outline",
        color: "#EF4444",
        isDanger: true,
        onPress: handleBlock
      }
    ],
    [handleMute, handleBlock]
  );

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  return (
    <View style={[styles.customHeader, { paddingTop: insets.top }]}>
      <BackButton style={styles.headerIcon} />

      <TouchableOpacity onPress={onProfilePress} style={styles.headerTitleContainer} activeOpacity={0.7}>
        <Avatar source={mockChatPartner.avatar} name={mockChatPartner.name} />
        <View>
          <AppText bold>{mockChatPartner.name}</AppText>
          {mockChatPartner.isOnline && (
            <AppText bold type="caption" style={styles.onlineStatus}>
              Online
            </AppText>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.optionsWrapper}>
        <Icon name="dots" onPress={toggleMenu} style={styles.headerIcon} />
        <AppPopupMenu visible={showMenu} items={menuItems} onClose={closeMenu} />
      </View>
    </View>
  );
});
UserChatHeader.displayName = "UserChatHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    customHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator,
      zIndex: 50
    },
    headerIcon: {
      padding: Spacing.md,
      minWidth: 50
    },
    headerTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flex: 1,
      gap: Spacing.sm
    },
    onlineStatus: {
      color: theme.primaryAccent
    },
    optionsWrapper: {
      position: "relative"
    }
  });

export default UserChatHeader;
