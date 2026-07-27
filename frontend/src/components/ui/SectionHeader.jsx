import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import SectionHeaderSkeleton from "./SectionHeaderSkeleton";

const SectionHeader = memo(
  ({
    title,
    icon,
    iconColor,
    iconOutline = false,
    rightLabel,
    rightIcon,
    onRightPress,
    rightLabelColor,
    style,
    isLoading
  }) => {
    const MyTheme = useAppTheme();

    const resolvedRightLabelColor = rightLabelColor ?? MyTheme.primaryAccent;

    if (isLoading) return <SectionHeaderSkeleton style={style} icon={icon} rightLabel={rightLabel} styles={styles} />;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.leftGroup}>
          {icon && <Icon name={icon} size={20} color={iconColor} outline={iconOutline} />}
          <AppText type="title">{title}</AppText>
        </View>

        {((rightLabel && onRightPress) || rightIcon) && (
          <AppButton
            variant="ghost"
            title={rightLabel}
            icon={rightIcon || undefined}
            size="sm"
            textStyle={{ color: resolvedRightLabelColor }}
            onPress={onRightPress}
          />
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
    marginBottom: Spacing.md
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm
  }
});

export default SectionHeader;
