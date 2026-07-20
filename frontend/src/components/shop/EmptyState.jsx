import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

const EmptyState = memo(({ activeCat, setActiveCat }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("shop");
  const translatedCat = t(`categories.${activeCat}`);
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Icon name="search" size={32} color={MyTheme.muted} />
      </View>
      <AppText bold type="title" style={styles.title}>
        {t("No Rewards Found")}
      </AppText>
      <AppText type="caption" style={styles.description}>
        {t("We don't have any deals for", { category: translatedCat })}
      </AppText>
      <View style={styles.buttonContainer}>
        <AppButton variant="outline" title={t("Reset filter")} size="sm" onPress={() => setActiveCat("all")} />
      </View>
    </View>
  );
});

EmptyState.displayName = "EmptyState";

const getStyles = (theme) =>
  StyleSheet.create({
    emptyContainer: {
      width: "100%",
      paddingVertical: Spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 200
    },
    emptyIconCircle: {
      width: 64,
      height: 64,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.glas,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.sm
    },
    title: {
      marginBottom: Spacing.sm
    },
    description: {
      textAlign: "center",
      color: theme.muted,
      marginVertical: Spacing.sm
    },
    buttonContainer: {
      marginTop: Spacing.sm
    }
  });

export default EmptyState;
