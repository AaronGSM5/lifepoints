import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";

export default function NotificationEntry({ notification }) {
  const styles = getStyles();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
      onPress={() => console.log("Notification clicked:", notification.title)}
    >
      <View style={styles.iconContainer}>
        <AppText type="body">✨</AppText>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.titleRow}>
          <AppText type="body" bold style={{ flex: 1 }}>
            {notification.title}
          </AppText>
          <AppText type="caption">Vor 2h</AppText>
        </View>

        <AppText type="caption" numberOfLines={2}>
          {notification.message}
        </AppText>
      </View>
    </Pressable>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: MyTheme.primary,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: Spacing.borderRadius.md,
      borderWidth: 1,
      borderColor: MyTheme.secondary,
      alignItems: "center"
    },
    containerPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }]
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: MyTheme.secondary,
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
