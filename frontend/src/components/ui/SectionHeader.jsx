import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

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

    const skeletonProps = {
      colorMode: MyTheme.isDark ? "dark" : "light",
      transition: { type: "timing", duration: 1500 }
    };

    if (isLoading) {
      return (
        <View style={[styles.container, style]}>
          <View style={styles.leftGroup}>
            {icon && <Skeleton {...skeletonProps} width={24} height={24} radius="round" />}
            <Skeleton {...skeletonProps} width={140} height={24} radius={4} />
          </View>
          {rightLabel && <Skeleton {...skeletonProps} width={60} height={24} radius={4} />}
        </View>
      );
    }

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
