import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function NotificationEntry({ notification }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("common");
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
      onPress={() => console.log("Notification clicked:", t(notification.title))}
    >
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
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primary,
      padding: Spacing.md,
      borderRadius: Spacing.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.secondary,
      marginBottom: Spacing.sm
    },
    containerPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }]
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
