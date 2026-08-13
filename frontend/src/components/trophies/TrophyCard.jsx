import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated as RNAnimated, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { router } from "expo-router";

import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import BaseCard from "../ui/BaseCard";

const TrophyCard = memo(({ id, title, icon, unlocked, justUnlocked, onAnimationComplete }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("trophies");
  const [animValue] = useState(() => new RNAnimated.Value(justUnlocked ? 0 : unlocked ? 1 : 0));

  useEffect(() => {
    let animation;

    if (justUnlocked) {
      animation = RNAnimated.timing(animValue, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: false
      });

      animation.start(({ finished }) => {
        if (finished && onAnimationComplete) {
          onAnimationComplete(id);
        }
      });
    } else {
      animValue.setValue(unlocked ? 1 : 0);
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [justUnlocked, unlocked, animValue, id, onAnimationComplete]);

  const { imageOpacity, textColor, scale, lockOpacity } = useMemo(
    () => ({
      imageOpacity: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1]
      }),
      textColor: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [MyTheme.muted, MyTheme.text]
      }),
      scale: animValue.interpolate({
        inputRange: [0, 0.5, 0.8, 1],
        outputRange: [1, 1.4, 0.9, 1]
      }),
      lockOpacity: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })
    }),
    [animValue, MyTheme.muted, MyTheme.text]
  );

  const handlePress = useCallback(() => {
    router.push(`/trophy/${id}`);
  }, [id]);

  return (
    <BaseCard onPress={handlePress} style={styles.trophyItem} padding={0}>
      <RNAnimated.View style={[styles.trophyIconBox, { transform: [{ scale }] }]}>
        <RNAnimated.View style={[StyleSheet.absoluteFillObject, styles.glowLayer, { opacity: animValue }]} />

        <RNAnimated.View style={[styles.trophyImage, { opacity: imageOpacity }]}>
          <Animated.Image
            source={icon}
            style={styles.trophyImage}
            resizeMode="contain"
            sharedTransitionTag={`trophy-image-${id}`}
          />
        </RNAnimated.View>

        {(!unlocked || justUnlocked) && (
          <RNAnimated.View style={[styles.lockOverlay, { opacity: unlocked ? lockOpacity : 1 }]}>
            <Icon name="lock" size={13} />
          </RNAnimated.View>
        )}
      </RNAnimated.View>

      <AppText animated bold type="caption" numberOfLines={2} style={[styles.title, { color: textColor }]}>
        {t(title)}
      </AppText>
    </BaseCard>
  );
});
TrophyCard.displayName = "TrophyCard";

const getStyles = (theme) =>
  StyleSheet.create({
    trophyItem: {
      alignItems: "center",
      backgroundColor: "transparent",
      borderWidth: 0
    },
    trophyIconBox: {
      width: "95%",
      aspectRatio: 1,
      borderRadius: Spacing.borderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    trophyImage: {
      width: "100%",
      height: "100%"
    },
    lockOverlay: {
      position: "absolute",
      bottom: 0,
      right: 5,
      width: 15,
      height: 15,
      backgroundColor: theme.background,
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.primary
    },
    title: {
      textAlign: "center",
      fontSize: 12,
      marginTop: 4,
      minHeight: 34
    }
  });

export default TrophyCard;
