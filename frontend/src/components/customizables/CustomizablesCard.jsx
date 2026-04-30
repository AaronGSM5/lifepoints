import React, { useRef, useEffect } from "react";
import { View, Animated as RNAnimated, StyleSheet, Pressable } from "react-native";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { router } from "expo-router";

const CustomizablesCard = ({
  id,
  name,
  icon,
  color = MyTheme.primaryAccent,
  isActive = false,
  unlocked = true,
  justUnlocked = false,
  onAnimationComplete,
  onPress // Erlaubt es dem Parent, das Klick-Verhalten zu überschreiben
}) => {
  const styles = getStyles();

  // Animations-Logik für "Neu freigeschaltet" (Dopamin-Effekt!)
  const animValue = useRef(new RNAnimated.Value(justUnlocked ? 0 : unlocked ? 1 : 0)).current;

  useEffect(() => {
    if (justUnlocked) {
      RNAnimated.timing(animValue, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: false // Muss false sein, wenn wir Farben interpolieren
      }).start(({ finished }) => {
        if (finished && onAnimationComplete) {
          onAnimationComplete(id);
        }
      });
    }
  }, [justUnlocked, animValue, id, onAnimationComplete]);

  // Interpolationen für den Lock-Zustand
  const itemOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1]
  });

  const textColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [MyTheme.muted, MyTheme.text]
  });

  const scale = animValue.interpolate({
    inputRange: [0, 0.5, 0.8, 1],
    outputRange: [1, 1.4, 0.9, 1]
  });

  const lockOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/customizables");
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.cardContainer, isActive && styles.cardContainerActive]}>
        <RNAnimated.View style={[styles.iconBox, { transform: [{ scale }] }]}>
          <RNAnimated.View style={[styles.iconWrapper, { opacity: itemOpacity, borderColor: color }]}>
            <Icon name={icon} size={24} color={color} />
          </RNAnimated.View>

          {/* Lock-Overlay wie bei der TrophyCard */}
          {(!unlocked || justUnlocked) && (
            <RNAnimated.View style={[styles.lockOverlay, { opacity: unlocked ? lockOpacity : 1 }]}>
              <Icon name="lock" size={12} color={MyTheme.text} />
            </RNAnimated.View>
          )}
        </RNAnimated.View>

        <AppText
          animated
          bold={isActive}
          type="caption"
          numberOfLines={2}
          style={{
            color: isActive ? MyTheme.primaryAccent : textColor,
            textAlign: "center",
            fontSize: 10,
            marginTop: 4,
            minHeight: 28
          }}
        >
          {name}
        </AppText>

        {isActive && (
          <AppText type="caption" style={styles.activeLabel}>
            Aktiv
          </AppText>
        )}
      </View>
    </Pressable>
  );
};

const getStyles = () =>
  StyleSheet.create({
    cardContainer: {
      alignItems: "center",
      width: "100%",
      backgroundColor: MyTheme.surface,
      padding: Spacing.sm,
      borderRadius: Spacing.borderRadius.md,
      borderWidth: 1,
      borderColor: "transparent",
      height: 90,
      position: "relative"
    },
    cardContainerActive: {
      borderColor: MyTheme.primaryAccent,
      backgroundColor: `${MyTheme.primaryAccent}10` // Dezenter Highlight-Hintergrund
    },
    iconBox: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    },
    iconWrapper: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center"
    },
    lockOverlay: {
      position: "absolute",
      bottom: -2,
      right: 12,
      width: 18,
      height: 18,
      backgroundColor: MyTheme.background,
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: MyTheme.primary
    },
    activeLabel: {
      position: "absolute",
      top: -6,
      backgroundColor: MyTheme.primaryAccent,
      color: MyTheme.background,
      fontSize: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      overflow: "hidden",
      fontWeight: "bold"
    }
  });

export default React.memo(CustomizablesCard);
