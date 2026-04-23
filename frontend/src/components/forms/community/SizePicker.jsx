import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";

export default function SizePicker({ options, selectedSize, onSelectSize }) {
  const styles = getStyles();

  return (
    <View>
      <AppText type="caption" style={styles.label}>
        COMMUNITY-GRÖSSE
      </AppText>
      <View style={styles.sizeGrid}>
        {options.map((opt) => (
          <Pressable
            key={opt.slots}
            onPress={() => onSelectSize(opt)}
            style={[styles.sizeCard, selectedSize.slots === opt.slots && styles.selectedSizeCard]}
          >
            <AppText bold>{opt.slots}</AppText>
            <AppText type="caption">{opt.price}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
      opacity: 0.5,
      letterSpacing: 1
    },
    sizeGrid: {
      flexDirection: "row",
      gap: 12
    },
    sizeCard: {
      flex: 1,
      padding: 12,
      borderRadius: 16,
      backgroundColor: MyTheme.glas,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "transparent"
    },
    selectedSizeCard: {
      borderColor: MyTheme.primaryAccent,
      backgroundColor: "rgba(47, 196, 146, 0.1)"
    }
  });
