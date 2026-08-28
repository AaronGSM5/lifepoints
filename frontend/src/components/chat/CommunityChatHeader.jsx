import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppPopupMenu from "../ui/AppPopupMenu";
import AppText from "../ui/AppText";
import BackButton from "../ui/BackButton";

const CommunityChatHeader = memo(({ community, onDetailsPress, onOptionsPress }) => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("chat");
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
        icon: "mute",
        onPress: handleMute
      },
      {
        label: "Blockieren",
        icon: "ban",
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

      <TouchableOpacity onPress={onDetailsPress} style={styles.headerTitleContainer} activeOpacity={0.7}>
        <View style={styles.titleRow}>
          {community?.icon && (
            <View style={[styles.iconBox, { backgroundColor: community?.color }]}>
              <Icon name={community.icon} size={20} />
            </View>
          )}
          <AppText bold>{community?.title || "Community Chat"}</AppText>
        </View>
        <AppText type="caption">{t("Tap for more info")}</AppText>
      </TouchableOpacity>

      <View style={styles.optionsWrapper}>
        <Icon name="dots" onPress={toggleMenu} style={styles.headerIcon} />
        <AppPopupMenu visible={showMenu} items={menuItems} onClose={closeMenu} />
      </View>
    </View>
  );
});
CommunityChatHeader.displayName = "CommunityChatHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    customHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.glas,
      zIndex: 50
    },
    headerIcon: {
      padding: Spacing.md,
      minWidth: 50
    },
    headerTitleContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      gap: Spacing.xs - 2
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    iconBox: {
      width: 32,
      height: 32,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center"
    },
    optionsWrapper: {
      position: "relative"
    }
  });

export default CommunityChatHeader;
