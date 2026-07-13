import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseCard from "../ui/BaseCard";

export default function NotificationEntry({ notification }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");
  return (
    <BaseCard style={styles.container} onPress={() => console.log("Notification clicked:", t(notification.title))}>
      <View style={styles.iconContainer}>
        <AppText type="body">✨</AppText>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.titleRow}>
          <AppText type="body" bold style={{ flex: 1 }}>
            {t(notification.title)}
          </AppText>
          <AppText type="caption">{notification.timestamp}</AppText>
        </View>

        <AppText type="caption">{t(notification.message)}</AppText>
      </View>
    </BaseCard>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.sm
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  });
