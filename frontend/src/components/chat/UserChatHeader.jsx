import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import BackButton from "../ui/BackButton";

const UserChatHeader = ({ mockChatPartner, onProfilePress, onOptionsPress }) => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
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

      <Icon name="dots" onPress={onOptionsPress} style={styles.headerIcon} />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    customHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator
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
    }
  });

export default UserChatHeader;
