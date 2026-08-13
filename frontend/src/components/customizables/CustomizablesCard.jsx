import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated as RNAnimated, Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const CustomizablesCard = memo(
  ({
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
    const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
    const { t } = useTranslation("profile");

    const [animValue] = useState(() => new RNAnimated.Value(justUnlocked ? 0 : unlocked ? 1 : 0));

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
      } else {
        animValue.setValue(unlocked ? 1 : 0);
      }
    }, [justUnlocked, unlocked, animValue, id, onAnimationComplete]);

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

    const handlePress = useCallback(() => {
      if (onPress) {
        onPress();
      } else {
        router.push("/customizables");
      }
    }, [onPress]);

    return (
      <Pressable onPress={handlePress}>
        <View style={[styles.cardContainer, isActive && styles.cardContainerActive]}>
          <RNAnimated.View style={[styles.iconBox, { transform: [{ scale }] }]}>
            <RNAnimated.View style={[styles.iconWrapper, { opacity: itemOpacity, borderColor: color }]}>
              <Icon name={icon} size={24} color={icon === "profile" ? MyTheme.text : color} />
            </RNAnimated.View>

            {(!unlocked || justUnlocked) && (
              <RNAnimated.View style={[styles.lockOverlay, { opacity: unlocked ? lockOpacity : 1 }]}>
                <Icon name="lock" size={12} />
              </RNAnimated.View>
            )}
          </RNAnimated.View>

          <AppText animated bold type="caption" numberOfLines={2} style={[styles.cardTitle, { color: textColor }]}>
            {t(name)}
          </AppText>
        </View>
      </Pressable>
    );
  }
);
CustomizablesCard.displayName = "CustomizablesCard";

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
    },
    cardTitle: {
      textAlign: "center",
      fontSize: 12,
      marginTop: 4,
      minHeight: 34
    }
  });

export default CustomizablesCard;
