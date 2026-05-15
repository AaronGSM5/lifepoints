import React, { useState } from "react";
import { StyleSheet, View, LayoutAnimation, Platform, UIManager, TouchableOpacity } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import AppInput from "@/components/ui/AppInput";
import { Skeleton } from "moti/skeleton";
import AppButton from "../ui/AppButton";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskItem = ({
  id,
  title,
  lp,
  progress,
  status,
  icon,
  onTrack,
  onInstaTrack,
  onNavigate,
  isLoading,
  requiresInput,
  isExpanded,
  onToggleExpand
}) => {
  const styles = getStyles();
  const { t } = useTranslation("tasks");
  const isDarkMode = useStore((state) => state.isDarkMode);
  const [inputValue, setInputValue] = useState("");

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggleExpand();
  };

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
    <BaseCard style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleExpand} style={styles.mainRow}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color={MyTheme.text} />
        </View>

        <View style={styles.textContainer}>
          <AppText type="body" bold style={styles.title} numberOfLines={1}>
            {t(title)}
          </AppText>

          <View style={styles.metaRow}>
            <AppText type="caption" bold style={styles.lpText}>
              +{lp} LP
            </AppText>

            {status && (
              <>
                <AppText type="caption"> • </AppText>
                <AppText type="caption">{status}</AppText>
              </>
            )}
          </View>
        </View>

        <View style={styles.chevronContainer}>
          <Icon name={isExpanded ? "down" : "right"} size={20} color={MyTheme.muted} />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContainer}>
          {requiresInput && (
            <AppInput
              placeholder={`${t("Anzahl")} ${t(requiresInput)} ${t("eingeben...")}`}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
          )}

          <View style={styles.actionRow}>
            <AppButton title={t("View details")} variant="ghost" onPress={onNavigate} size="sm" />
            <View style={styles.trackingRow}>
              <AppButton
                variant="ghost"
                icon={<Icon name={"checkmark"} size={28} color={MyTheme.primaryAccent} />}
                iconPosition="center"
                size="sm"
                onPress={onInstaTrack}
              />
              <AppButton title={t("Track")} bgColor={MyTheme.primaryAccent} onPress={() => onTrack(inputValue)} />
            </View>
          </View>
        </View>
      )}
    </BaseCard>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.md,
      overflow: "hidden"
    },
    mainRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: Spacing.borderRadius.md,
      backgroundColor: MyTheme.secondary,
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
    metaRow: {
      flexDirection: "row",
      alignItems: "center"
    },
    lpText: {
      color: MyTheme.primaryAccent
    },
    chevronContainer: {
      marginLeft: Spacing.sm
    },
    expandedContainer: {
      marginTop: Spacing.md,
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: MyTheme.secondary
    },
    actionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Spacing.sm
    },
    trackingRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.sm
    }
  });

export default TaskItem;
