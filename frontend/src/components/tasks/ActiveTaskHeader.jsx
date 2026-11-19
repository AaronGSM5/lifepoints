import React, { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import ProgressBar from "@/components/ui/ProgressBar";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

// Abschließen passiert ausschließlich über den "Finish"-Button der Karte; das Icon ist reine Kennzeichnung
const ActiveTaskHeader = memo(({ title, icon, progress, isExpanded, setIsExpanded, doneSteps, totalSteps }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("tasks");

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleExpand}
        style={styles.headerRow}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        accessibilityLabel={t(title)}
      >
        {icon && (
          <View style={[styles.iconCircle, { backgroundColor: icon.bg || MyTheme.glas }]}>
            <Icon name={icon.name} color={icon.color} />
          </View>
        )}
        <View style={styles.contentColumn}>
          <AppText bold type="title" numberOfLines={1}>
            {t(title)}
          </AppText>
          <View style={styles.metaRow}>
            <Icon name="checkmarkCircle" size={13} color={MyTheme.muted} />
            <AppText type="caption">{t("{{done}}/{{total}} steps", { done: doneSteps, total: totalSteps })}</AppText>
          </View>
        </View>
        <Icon name={isExpanded ? "down" : "right"} color={MyTheme.muted} />
      </TouchableOpacity>
      <ProgressBar
        variant="strip"
        progress={progress}
        style={[styles.progress, { marginBottom: isExpanded ? 0 : -Spacing.md }]}
      />
    </View>
  );
});
ActiveTaskHeader.displayName = "ActiveTaskHeader";

const getStyles = () =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md,
      marginBottom: Spacing.md
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: Spacing.borderRadius.full,
      alignItems: "center",
      justifyContent: "center"
    },
    contentColumn: {
      flex: 1,
      gap: 2
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs
    },
    progress: {
      marginHorizontal: -Spacing.md,
      width: undefined
    }
  });

export default ActiveTaskHeader;
