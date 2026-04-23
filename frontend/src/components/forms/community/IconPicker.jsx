import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function IconPicker({ icons, selectedIcon, onSelectIcon }) {
  const styles = getStyles();
  const [showAll, setShowAll] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(62)).current;

  const expand = () => {
    setShowAll(true);
    Animated.timing(heightAnim, {
      toValue: fullHeight > 62 ? fullHeight : 200,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  return (
    <View>
      <AppText type="caption" style={styles.label}>
        COMMUNITY-ICON
      </AppText>

      <View
        style={[styles.iconGrid, styles.measureView]}
        onLayout={(event) => setFullHeight(event.nativeEvent.layout.height)}
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
              onPress={() => onSelectIcon(icon)}
              style={[styles.iconItem, selectedIcon === icon && styles.selectedIconItem]}
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
          <Pressable onPress={expand} style={styles.moreButton}>
            <AppText type="caption" style={{ color: MyTheme.primaryAccent }} bold>
              see more
            </AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
      opacity: 0.5,
      letterSpacing: 1,
      color: MyTheme.text
    },
    iconGrid: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 12
    },
    iconItem: {
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: MyTheme.glas,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "transparent"
    },
    selectedIconItem: {
      borderColor: MyTheme.primaryAccent,
      backgroundColor: "rgba(47, 196, 146, 0.1)"
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
      gap: 4,
      paddingVertical: 4
    },
    measureView: {
      position: "absolute",
      opacity: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1
    }
  });
