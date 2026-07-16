import { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppImage from "../ui/AppImage";

const AppIconItem = memo(({ icon, isSelected, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  return (
    <TouchableOpacity
      key={icon.id}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.squareContainer, isSelected && styles.selectedSquare]}
    >
      <View style={styles.iconBox}>
        <AppImage source={icon.source} variant={"fill"} />
      </View>

      {isSelected && (
        <View style={styles.overlay}>
          <View style={styles.iconCircle}>
            <Icon name={"checkmark"} size={20} color={"#fff"} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
});
AppIconItem.displayName = "AppIconItem";

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
    iconBox: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden"
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.primaryAccent
    }
  });

export default AppIconItem;
