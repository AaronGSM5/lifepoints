import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export const EmptyView = memo(
  ({
    icon,
    iconColor,
    iconBgColor,
    iconSize = 32,
    title,
    description,
    actionTitle,
    onAction,
    children,
    containerStyle
  }) => {
    const MyTheme = useAppTheme();
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

    return (
      <View style={[styles.container, containerStyle]}>
        {icon && (
          <View
            style={[
              styles.iconCircle,
              iconBgColor && { backgroundColor: iconBgColor },
              iconSize !== 32 && { width: iconSize * 2, height: iconSize * 2 }
            ]}
          >
            <Icon name={icon} size={iconSize} color={iconColor || MyTheme.muted} />
          </View>
        )}

        {title && (
          <AppText bold type="title" style={styles.title}>
            {title}
          </AppText>
        )}

        {description && (
          <AppText type="caption" style={styles.description}>
            {description}
          </AppText>
        )}

        {children}

        {actionTitle && onAction && (
          <View style={styles.buttonContainer}>
            <AppButton variant="outline" title={actionTitle} size="sm" onPress={onAction} />
          </View>
        )}
      </View>
    );
  }
);

EmptyView.displayName = "EmptyView";

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: Spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 200
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: Spacing.borderRadius.full,
      backgroundColor: theme.glas,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.sm
    },
    title: {
      marginBottom: Spacing.sm,
      textAlign: "center"
    },
    description: {
      textAlign: "center",
      marginBottom: Spacing.sm,
      paddingHorizontal: Spacing.lg
    },
    buttonContainer: {
      marginTop: Spacing.sm
    }
  });
