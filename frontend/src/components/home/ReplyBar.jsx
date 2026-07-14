import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";

const ReplyBar = memo(({ replyingTo, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  if (!replyingTo) return null;
  return (
    <View style={styles.replyBar}>
      <AppText style={styles.replyBarText}>
        {t("Reply to")}{" "}
        <AppText bold style={styles.username}>
          @{replyingTo.username}
        </AppText>
      </AppText>
      <Icon name="close" size={16} color={MyTheme.muted} onPress={onPress} />
    </View>
  );
});
ReplyBar.displayName = "ReplyBar";

const getStyles = (theme) =>
  StyleSheet.create({
    replyBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.15)",
      paddingHorizontal: Spacing.md,
      paddingVertical: 8,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.separator
    },
    replyBarText: {
      fontSize: 13,
      color: theme.muted
    },
    username: {
      fontSize: 14
    }
  });

export default ReplyBar;
