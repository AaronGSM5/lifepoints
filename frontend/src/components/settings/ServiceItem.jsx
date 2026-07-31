import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";

const ServiceItem = memo(({ name, description, icon, isConnected, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");
  return (
    <BaseCard style={styles.serviceCard}>
      <View style={styles.cardMain}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={28} color={MyTheme.primaryAccent} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <AppText type="title">{name}</AppText>
            {isConnected && (
              <AppBadge
                variant="outline"
                label={t("AKTIVE")}
                textStyle={styles.activeBadgeText}
                style={styles.activeBadge}
              />
            )}
          </View>
          <AppText type="caption">{description}</AppText>
        </View>
      </View>

      <AppButton
        title={isConnected ? t("Manage") : t("Connect")}
        variant={isConnected ? "secondary" : "primary"}
        onPress={onPress}
        bgColor={!isConnected && MyTheme.primaryAccent}
      />
    </BaseCard>
  );
});
ServiceItem.displayName = "ServiceItem";

const getStyles = (theme) =>
  StyleSheet.create({
    serviceCard: {
      gap: Spacing.lg
    },
    cardMain: {
      flexDirection: "row",
      alignItems: "center"
    },
    iconBox: {
      width: 54,
      height: 54,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md,
      backgroundColor: addOpacity(theme.primaryAccent, 0.1)
    },
    infoContainer: {
      flex: 1
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: Spacing.md,
      marginBottom: Spacing.xs
    },
    activeBadgeText: {
      color: theme.primaryAccent,
      fontSize: 10
    },
    activeBadge: {
      paddingVertical: Spacing.xs - 2,
      borderColor: theme.primaryAccent
    }
  });

export default ServiceItem;
