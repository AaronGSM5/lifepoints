import React, { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Pressable, StyleSheet, View } from "react-native";

// eslint-disable-next-line import/no-unresolved
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

const IconPicker = memo(({ icons = [], selectedIcon, onSelectIcon }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const [showAll, setShowAll] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const [heightAnim] = useState(() => new Animated.Value(62));

  const expand = useCallback(() => {
    setShowAll(true);
    Animated.timing(heightAnim, {
      toValue: fullHeight > 62 ? fullHeight : 200,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [fullHeight, heightAnim]);

  const handleSelect = useCallback(
    (icon) => {
      if (onSelectIcon) {
        onSelectIcon(icon);
      }
    },
    [onSelectIcon]
  );

  return (
    <View>
      <AppText type="caption" style={styles.label}>
        COMMUNITY-ICON
      </AppText>

      <View
        style={[styles.iconGrid, styles.measureView]}
        onLayout={(event) => setFullHeight(event.nativeEvent.layout.height)}
        pointerEvents="none"
      >
        {icons.map((icon, index) => (
          <View key={`measure-${icon}-${index}`} style={styles.iconItem} />
        ))}
      </View>

      <Animated.View style={[styles.animatedWrapper, { height: heightAnim }]}>
        <View style={styles.iconGrid}>
          {icons.map((icon, index) => (
            <Pressable
              key={`${icon}-${index}`}
              onPress={() => handleSelect(icon)}
              style={[styles.iconItem, selectedIcon === icon && styles.iconItemActive]}
            >
              <MaterialIcons
                name={icon}
                size={28}
                color={selectedIcon === icon ? MyTheme.primaryAccent : MyTheme.muted}
              />
            </Pressable>
          ))}
        </View>
      </Animated.View>

      {!showAll && fullHeight > 62 && (
        <View style={styles.expandContainer}>
          <AppText type="caption" bold onPress={expand} style={styles.moreButton}>
            {t("see more")}
          </AppText>
        </View>
      )}
    </View>
  );
});
IconPicker.displayName = "IconPicker";

const getStyles = (theme) =>
  StyleSheet.create({
    label: {
      marginBottom: Spacing.sm,
      opacity: 0.5,
      letterSpacing: 1,
      color: theme.text
    },
    iconGrid: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: Spacing.md - 4
    },
    iconItem: {
      width: 50,
      height: 50,
      borderRadius: Spacing.borderRadius.md,
      backgroundColor: theme.glas,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "transparent"
    },
    animatedWrapper: {
      overflow: "hidden",
      width: "100%"
    },
    expandContainer: {
      alignItems: "center",
      marginTop: Spacing.sm
    },
    moreButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 2,
      gap: Spacing.xs,
      paddingVertical: Spacing.xs,
      color: theme.primaryAccent
    },
    measureView: {
      position: "absolute",
      opacity: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1
    },
    iconItemActive: {
      borderColor: theme.primaryAccent,
      backgroundColor: addOpacity(theme.primaryAccent, 0.1)
    }
  });

export default IconPicker;
