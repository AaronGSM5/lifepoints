import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppSkeleton from "../ui/AppSkeleton";
import ConfirmableIcon from "../ui/ConfirmableIcon";
import LpPoints from "../ui/LpPoints";

const FYTaskCard = memo(({ title, icon, lp, isLoading, onNavigate, onAction, style }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("tasks");

  if (isLoading) {
    return <AppSkeleton height={70} radius={Spacing.borderRadius.lg} />;
  }

  return (
    <BaseCard style={style}>
      <View style={styles.headerRow}>
        {icon && (
          <ConfirmableIcon
            icon={icon}
            actionIconName="add"
            onAction={onAction}
            accessibilityLabel={t("Add task")}
            confirmLabel={t("Tap again to confirm")}
          />
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNavigate}
          style={styles.navContainer}
          accessibilityRole="button"
        >
          <View style={styles.contentColumn}>
            <AppText bold type="title" numberOfLines={1} style={styles.titleText}>
              {t(title)}
            </AppText>
            <View style={styles.metaRow}>
              <Icon name={"time"} size={13} color={MyTheme.muted} />
              <AppText type={"caption"}>10m • Focus</AppText>
            </View>
          </View>
          <LpPoints points={lp} />
        </TouchableOpacity>
      </View>
    </BaseCard>
  );
});
FYTaskCard.displayName = "FYTaskCard";

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  navContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  contentColumn: {
    flex: 1,
    flexDirection: "column",
    marginRight: Spacing.sm
  },
  titleText: {
    flex: 1,
    marginRight: Spacing.sm
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs
  }
});

export default FYTaskCard;
