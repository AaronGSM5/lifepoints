import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import BaseCard from "@/components/ui/BaseCard";
import useStore from "@/store/useStore";

const ActiveTaskCard = ({ title, points, isLoading, onAction }) => {
  const styles = getStyles();
  const { isDarkMode } = useStore();
  if (isLoading) {
    return (
      <Skeleton colorMode={isDarkMode ? "dark" : "light"} width="100%" height={70} radius={Spacing.borderRadius.lg} />
    );
  }

  return (
    <BaseCard style={styles.taskCardActive}>
      <View style={styles.taskIconContainer}>
        <Icon name="timer" size={20} color={MyTheme.primaryAccent} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText bold type="title">
            {title}
          </AppText>
        </View>
      </View>
      <View style={styles.lpContainer}>
        <AppText bold type="caption" style={{ color: MyTheme.primaryAccent }}>
          {points} LP
        </AppText>
      </View>
      <AppButton
        size="sm"
        icon={<Icon name="checkmark" size={20} />}
        iconPosition="center"
        bgColor={MyTheme.primaryAccent}
        onPress={onAction}
      />
    </BaseCard>
  );
};

const getStyles = () =>
  StyleSheet.create({
    taskCardActive: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "rgba(16, 185, 129, 0.25)"
    },
    taskIconContainer: {
      width: 36,
      height: 36,
      backgroundColor: "rgba(16, 185, 129, 0.16)",
      borderRadius: Spacing.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md
    },
    lpContainer: {
      marginRight: Spacing.md
    }
  });

export default ActiveTaskCard;
