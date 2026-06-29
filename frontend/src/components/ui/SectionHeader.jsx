import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Skeleton } from "moti/skeleton";
import useStore from "@/store/useStore";

const SectionHeader = ({
  title,
  icon,
  iconColor,
  iconOutline = false,
  rightLabel,
  rightIcon,
  onRightPress,
  rightLabelColor = "rgb(47, 196, 146)",
  style,
  isLoading
}) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const isDarkMode = useStore((state) => state.isDarkMode);
  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.leftGroup}>
          {icon && (
            <Skeleton
              colorMode={isDarkMode ? "dark" : "light"}
              width={24}
              height={24}
              radius="round"
              transition={{ type: "timing", duration: 1500 }}
            />
          )}
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width={140}
            height={24}
            radius={4}
            transition={{ type: "timing", duration: 1500 }}
          />
        </View>

        {rightLabel && (
          <Skeleton
            colorMode={isDarkMode ? "dark" : "light"}
            width={60}
            height={24}
            radius={4}
            transition={{ type: "timing", duration: 1500 }}
          />
        )}
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
          textStyle={{ color: rightLabelColor }}
          onPress={onRightPress}
        />
      )}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
