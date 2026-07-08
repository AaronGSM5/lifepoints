import { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";

const ColorThemeItem = memo(({ theme, isSelected, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.squareContainer, isSelected && styles.selectedSquare]}
    >
      <View style={styles.colorBox}>
        <LinearGradient
          colors={[theme.bg, theme.bg, theme.accent, theme.accent]}
          locations={[0, 0.5, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {theme.isLocked && (
        <View style={styles.overlay}>
          <View style={styles.iconCircle}>
            <Icon name={"lock"} size={20} />
          </View>
        </View>
      )}

      {isSelected && !theme.isLocked && (
        <View style={styles.overlay}>
          <View style={[styles.iconCircle, { backgroundColor: MyTheme.primaryAccent }]}>
            <Icon name={"checkmark"} size={20} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
});
ColorThemeItem.displayName = "ColorThemeItem";

const getStyles = (theme) =>
  StyleSheet.create({
    squareContainer: {
      width: 72,
      height: 72,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "transparent"
    },
    selectedSquare: {
      borderColor: theme.primaryAccent,
      transform: [{ scale: 1.05 }]
    },
    colorBox: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center"
    },
    iconCircle: {
      width: 24,
      height: 24,
      borderRadius: 16,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default ColorThemeItem;
