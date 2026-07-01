import React, { useState } from "react";
import { StyleSheet, View, Platform, UIManager, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import { Skeleton } from "moti/skeleton";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskItem = ({ id, title, description, lp, icon, onNavigate, isLoading }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("tasks");
  const isDarkMode = useStore((state) => state.isDarkMode);

  if (isLoading) {
    return (
      <BaseCard style={styles.container}>
        <View style={styles.headerRow}>
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width={20}
            height={20}
            radius="round"
            transition={{ type: "timing", duration: 1500 }}
          />
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width={50}
            height={16}
            radius={4}
            transition={{ type: "timing", duration: 1500 }}
          />
        </View>
        <View style={styles.contentRow}>
          <View style={{ marginBottom: Spacing.xs }}>
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
              width="60%"
              height={22}
              radius={4}
              transition={{ type: "timing", duration: 1500 }}
            />
          </View>
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width="100%"
            height={14}
            radius={4}
            transition={{ type: "timing", duration: 1500 }}
          />
          <View style={{ marginTop: 6 }}>
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
              width="80%"
              height={14}
              radius={4}
              transition={{ type: "timing", duration: 1500 }}
            />
          </View>
        </View>
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.container} onPress={onNavigate}>
      <View style={styles.headerRow}>
        <Icon name={icon} size={20} color={MyTheme.text} />
        <AppText type="caption" bold style={styles.lpText}>
          {lp} LP
        </AppText>
      </View>

      <View style={styles.contentRow}>
        <AppText type="body" bold style={styles.title} numberOfLines={1}>
          {t(title)}
        </AppText>
        <AppText type="caption" style={styles.description} numberOfLines={2}>
          {t(description)}
        </AppText>
      </View>
    </BaseCard>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      padding: Spacing.md,
      gap: Spacing.lg
    },
    mainRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    contentRow: {
      gap: Spacing.xs
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: Spacing.borderRadius.md,
      backgroundColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md
    },
    textContainer: {
      flex: 1,
      justifyContent: "center"
    },
    title: {
      fontSize: 18,
      marginBottom: Spacing.xs
    },
    description: {
      lineHeight: 20,
      height: 40
    },
    lpText: {
      color: theme.primaryAccent
    },
    heartButton: {
      padding: Spacing.xs,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default TaskItem;
