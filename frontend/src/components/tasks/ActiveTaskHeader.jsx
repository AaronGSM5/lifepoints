import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import ConfirmableIcon from "../ui/ConfirmableIcon";

const ActiveTaskHeader = memo(({ title, icon, progress, isExpanded, setIsExpanded, onAction }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View>
      <View style={styles.headerRow}>
        {icon && <ConfirmableIcon icon={icon} actionIconName="checkmark" onAction={onAction} />}
        <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.expandableContainer}>
          <View style={styles.contentColumn}>
            <AppText bold type="title" numberOfLines={1} style={styles.titleText}>
              {t(title)}
            </AppText>
            <View style={styles.metaRow}>
              <Icon name={"time"} size={13} color={MyTheme.muted} />
              <AppText type={"caption"}>10m • Focus</AppText>
            </View>
          </View>
          <Icon name={isExpanded ? "down" : "right"} color={MyTheme.muted} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.progressTrack,
          { marginBottom: isExpanded ? 0 : -Spacing.md },
          isExpanded && styles.progressShadow
        ]}
      >
        <View style={[styles.progressFill, { width: `${safeProgress}%`, backgroundColor: MyTheme.primaryAccent }]} />
      </View>
    </View>
  );
});
ActiveTaskHeader.displayName = "ActiveTaskHeader";

const getStyles = (theme) =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Spacing.md
    },
    expandableContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    },
    contentColumn: {
      flex: 1,
      flexDirection: "column",
      marginRight: Spacing.sm
    },
    titleText: {
      marginRight: Spacing.sm
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    progressTrack: {
      height: 8,
      backgroundColor: theme.separator,
      marginHorizontal: -Spacing.md
    },
    progressShadow: {
      boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.15)"
    },
    progressFill: {
      height: "100%",
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4
    }
  });

export default ActiveTaskHeader;
