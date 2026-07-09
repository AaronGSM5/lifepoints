import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function SizePicker({ options, selectedSize, onSelectSize }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  return (
    <View>
      <AppText type="caption" style={styles.label}>
        {t("COMMUNITY-SIZE")}
      </AppText>
      <View style={styles.sizeGrid}>
        {options.map((opt) => (
          <BaseCard
            key={opt.slots}
            style={styles.sizeCard}
            isSelected={selectedSize.slots === opt.slots}
            onPress={() => onSelectSize(opt)}
          >
            <AppText bold>{opt.slots}</AppText>
            <AppText type="caption">{t(opt.price)}</AppText>
          </BaseCard>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    label: {
      marginBottom: Spacing.sm,
      opacity: 0.5,
      letterSpacing: 1,
      color: theme.text
    },
    sizeGrid: {
      flexDirection: "row",
      gap: 12
    },
    sizeCard: {
      flex: 1,
      padding: 12,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center"
    }
  });
