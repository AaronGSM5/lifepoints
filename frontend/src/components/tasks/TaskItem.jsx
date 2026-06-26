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
        <View style={styles.mainRow}>
          <View style={styles.iconContainer}>
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
              width="100%"
              height="100%"
              radius={Spacing.borderRadius.md}
              transition={{ type: "timing", duration: 1500 }}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={{ marginBottom: 8 }}>
              <Skeleton
                colorMode={isDarkMode ? "dark" : "light"}
                width="70%"
                height={16}
                transition={{ type: "timing", duration: 1500 }}
              />
            </View>
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
              width="40%"
              height={12}
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
        <AppText type="caption" style={styles.description} numberOfLines={1}>
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
      marginBottom: Spacing.xs
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
