import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppIconButton from "@/components/ui/AppIconButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import SectionHeaderSkeleton from "./SectionHeaderSkeleton";

/**
 * Einheitlicher Section-Header für alle Screens.
 * Rechts gibt es genau zwei Aktionsmuster:
 *  - Text-Link: `rightLabel` + `onRightPress` (z. B. "Alle anzeigen")
 *  - Icon-Button: `rightIcon` (Icon-Name) + `rightIconLabel` (Pflicht für Screenreader) + `onRightPress`
 * Zusätzlich:
 *  - `counter` zeigt einen Fortschritt wie "2/3" neben dem Titel
 *  - `collapsible` + `isCollapsed` + `onToggle` für auf-/zuklappbare Sections
 *  - `center` zentriert den Titel (z. B. Listenende)
 */
const SectionHeader = memo(
  ({
    title,
    icon,
    iconColor,
    iconOutline = false,
    counter,
    rightLabel,
    rightIcon,
    rightIconLabel,
    onRightPress,
    rightLabelColor,
    collapsible = false,
    isCollapsed = false,
    onToggle,
    center = false,
    style,
    textStyle,
    isLoading
  }) => {
    const MyTheme = useAppTheme();
    const { t } = useTranslation("common");

    const resolvedRightLabelColor = rightLabelColor ?? MyTheme.primaryAccent;

    if (isLoading) return <SectionHeaderSkeleton style={style} icon={icon} rightLabel={rightLabel} styles={styles} />;

    const titleNode = (
      <View style={[styles.leftGroup, center && styles.centerGroup]}>
        {icon && <Icon name={icon} size={20} color={iconColor} outline={iconOutline} />}
        <AppText type="title" style={[collapsible && { color: MyTheme.muted }, textStyle]}>
          {title}
        </AppText>
        {counter !== undefined && counter !== null && (
          <View style={[styles.counter, { backgroundColor: MyTheme.glas, borderColor: MyTheme.separator }]}>
            <AppText type="labelSm" style={{ color: MyTheme.primaryAccent }}>
              {counter}
            </AppText>
          </View>
        )}
      </View>
    );

    if (collapsible) {
      return (
        <Pressable
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityState={{ expanded: !isCollapsed }}
          accessibilityLabel={`${title}, ${isCollapsed ? t("Expand") : t("Collapse")}`}
          style={[styles.container, style]}
        >
          {titleNode}
          <Icon name={isCollapsed ? "right" : "down"} color={MyTheme.muted} />
        </Pressable>
      );
    }

    return (
      <View style={[styles.container, center && styles.centerContainer, style]}>
        {titleNode}

        {rightLabel && onRightPress && (
          <AppButton
            variant="ghost"
            title={rightLabel}
            size="sm"
            textStyle={{ color: resolvedRightLabelColor }}
            onPress={onRightPress}
          />
        )}

        {!rightLabel && typeof rightIcon === "string" && (
          <AppIconButton
            icon={rightIcon}
            onPress={onRightPress}
            accessibilityLabel={rightIconLabel || title}
            withBackground
          />
        )}

        {!rightLabel && rightIcon && typeof rightIcon !== "string" && (
          <AppButton variant="ghost" icon={rightIcon} size="sm" onPress={onRightPress} />
        )}
      </View>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
    minHeight: 32
  },
  centerContainer: {
    justifyContent: "center"
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flexShrink: 1
  },
  centerGroup: {
    justifyContent: "center"
  },
  counter: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.full,
    borderWidth: 1
  }
});

export default SectionHeader;
