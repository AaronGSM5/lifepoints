import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { addOpacity } from "@/utils/addOpacity";

const ActiveTaskCard = ({ title, points, isLoading, onAction }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("tasks");
  const isDarkMode = useStore((state) => state.isDarkMode);
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
            {t(title)}
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

const getStyles = (theme) =>
  StyleSheet.create({
    taskCardActive: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: addOpacity(theme.primaryAccent, 0.3)
    },
    taskIconContainer: {
      width: 36,
      height: 36,
      backgroundColor: addOpacity(theme.primaryAccent, 0.16),
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
