import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";

import ConfirmableIcon from "../ui/ConfirmableIcon";
import LpPoints from "../ui/LpPoints";

const FYTaskCard = memo(({ title, icon, lp, onNavigate, onAction, style }) => {
  const { t } = useTranslation("tasks");

  return (
    <BaseCard style={style}>
      <View style={styles.headerRow}>
        {icon && <ConfirmableIcon icon={icon} actionIconName="add" onAction={onAction} />}
        <TouchableOpacity activeOpacity={0.8} onPress={onNavigate} style={styles.navContainer}>
          <AppText bold type="title" numberOfLines={1} style={styles.titleText}>
            {t(title)}
          </AppText>
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
  titleText: {
    flex: 1,
    marginRight: Spacing.sm
  }
});

export default FYTaskCard;
