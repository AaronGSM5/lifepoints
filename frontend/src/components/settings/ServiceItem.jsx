import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

import { Icon } from "../icons/Icon";
import AppBadge from "../ui/AppBadge";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

const ServiceItem = ({ name, description, icon, isConnected, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("settings");
  return (
    <View style={styles.serviceCard}>
      <View style={styles.cardMain}>
        <View style={[styles.iconBox, { backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1) }]}>
          <Icon name={icon} size={28} color={MyTheme.primaryAccent} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <AppText type="title">{name}</AppText>
            {isConnected && (
              <AppBadge
                variant="outline"
                label={t("AKTIVE")}
                textStyle={{ color: MyTheme.primaryAccent, fontSize: 10 }}
                style={{
                  paddingVertical: Spacing.xs - 2,
                  borderColor: MyTheme.primaryAccent
                }}
              />
            )}
          </View>
          <AppText type="caption">{description}</AppText>
        </View>
      </View>

      <AppButton
        title={isConnected ? t("Manage") : t("Connect")}
        variant={isConnected ? "secondary" : "primary"}
        size="md"
        onPress={onPress}
        bgColor={!isConnected && MyTheme.primaryAccent}
      />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    serviceCard: {
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: theme.secondary,
      gap: Spacing.md
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
      marginRight: Spacing.md
    },
    infoContainer: {
      flex: 1
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: 2
    }
  });

export default ServiceItem;
