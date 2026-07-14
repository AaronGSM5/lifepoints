import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";

const FeedItemFooter = memo(({ likesCount, username, description, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");
  return (
    <View style={styles.footer}>
      <AppText bold style={styles.likesText}>
        {likesCount} {likesCount === 1 ? "Like" : "Likes"}
      </AppText>
      <AppText style={styles.descriptionText}>
        <AppText bold onPress={onPress}>
          {username}{" "}
        </AppText>
        {description}
      </AppText>

      <AppText type="caption" style={styles.timeAgo}>
        {t("Vor")} 2 {t("Hours")}
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
      marginBottom: 4,
      fontSize: 14
    },
    descriptionText: {
      fontSize: 14,
      lineHeight: 20
    },
    timeAgo: {
      fontSize: 12,
      marginTop: Spacing.xs
    }
  });

export default FeedItemFooter;
