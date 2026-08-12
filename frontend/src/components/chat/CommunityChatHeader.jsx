import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import BackButton from "../ui/BackButton";

const CommunityChatHeader = ({ community, onDetailsPress, onOptionsPress }) => {
  const insets = useSafeAreaInsets();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("chat");
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
      borderBottomColor: theme.glas
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
    }
  });

export default CommunityChatHeader;
