import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";
import CloseButton from "../ui/CloseButton";
import Separator from "../ui/Separator";

const ReplyBar = memo(({ replyingTo, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  if (!replyingTo) return null;
  return (
    <>
      <Separator />
      <View style={styles.replyBar}>
        <AppText style={styles.replyBarText}>
          {t("Reply to")}{" "}
          <AppText bold style={styles.username}>
            @{replyingTo.username}
          </AppText>
        </AppText>
        <CloseButton iconSize={16} color={MyTheme.muted} onPress={onPress} />
      </View>
    </>
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
      paddingVertical: Spacing.sm
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
