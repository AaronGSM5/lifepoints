import React, { useRef, useEffect } from "react";
import { View, Animated as RNAnimated, StyleSheet, Pressable } from "react-native";
import AppText from "@/components/ui/AppText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "@/components/icons/Icon";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const CustomizablesCard = ({
  id,
  name,
  icon,
  color = "rgb(47, 196, 146)",
  isActive = false,
  unlocked = true,
  justUnlocked = false,
  onAnimationComplete,
  onPress
}) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("profile");

  const animValue = useRef(new RNAnimated.Value(justUnlocked ? 0 : unlocked ? 1 : 0)).current;

  useEffect(() => {
    if (justUnlocked) {
      RNAnimated.timing(animValue, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: false
      }).start(({ finished }) => {
        if (finished && onAnimationComplete) {
          onAnimationComplete(id);
        }
      });
    }
  }, [justUnlocked, animValue, id, onAnimationComplete]);

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
            <Icon name={icon} size={24} color={icon === "profile" ? MyTheme.text : color} />
          </RNAnimated.View>

          {(!unlocked || justUnlocked) && (
            <RNAnimated.View style={[styles.lockOverlay, { opacity: unlocked ? lockOpacity : 1 }]}>
              <Icon name="lock" size={12} color={MyTheme.text} />
            </RNAnimated.View>
          )}
        </RNAnimated.View>

        <AppText
          animated
          bold
          type="caption"
          numberOfLines={2}
          style={{ color: textColor, textAlign: "center", fontSize: 12, marginTop: 4, minHeight: 34 }}
        >
          {t(name)}
        </AppText>
      </View>
    </Pressable>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.surface,
      padding: Spacing.sm,
      borderRadius: Spacing.borderRadius.md,
      borderWidth: 1,
      borderColor: "transparent",
      height: 90,
      position: "relative"
    },
    cardContainerActive: {
      borderColor: theme.primaryAccent
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
      backgroundColor: theme.background,
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.primary
    }
  });

export default React.memo(CustomizablesCard);
