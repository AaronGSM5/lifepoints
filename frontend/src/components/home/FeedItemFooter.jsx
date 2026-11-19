import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";

const FeedItemFooter = memo(({ likesCount, username, description, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  return (
    <View style={styles.footer}>
      <AppText type="label" style={styles.likesText}>
        {t("likesCount", { count: likesCount })}
      </AppText>
      <AppText style={styles.descriptionText}>
        <AppText bold onPress={onPress}>
          {username}{" "}
        </AppText>
        {description}
      </AppText>

      <AppText type="caption" style={styles.timeAgo}>
        {t("hoursAgo", { count: 2 })}
      </AppText>
    </View>
  );
});
FeedItemFooter.displayName = "FeedItemFooter";

const getStyles = () =>
  StyleSheet.create({
    footer: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.md
    },
    likesText: {
      marginBottom: Spacing.xs
    },
    descriptionText: {
      ...Typography.label,
      fontFamily: "Inter-Regular"
    },
    timeAgo: {
      marginTop: Spacing.xs
    }
  });

export default FeedItemFooter;
