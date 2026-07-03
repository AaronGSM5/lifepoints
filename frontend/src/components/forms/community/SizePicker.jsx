import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

export default function SizePicker({ options, selectedSize, onSelectSize }) {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("community");
  return (
    <View>
      <AppText type="caption" style={styles.label}>
        {t("COMMUNITY-SIZE")}
      </AppText>
      <View style={styles.sizeGrid}>
        {options.map((opt) => (
          <Pressable
            key={opt.slots}
            onPress={() => onSelectSize(opt)}
            style={[
              styles.sizeCard,
              selectedSize.slots === opt.slots && {
                borderColor: MyTheme.primaryAccent,
                backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1)
              }
            ]}
          >
            <AppText bold>{opt.slots}</AppText>
            <AppText type="caption">{t(opt.price)}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
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
      borderRadius: 16,
      backgroundColor: theme.glas,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "transparent"
    }
  });
