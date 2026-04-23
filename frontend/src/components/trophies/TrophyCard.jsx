import React, { useRef, useEffect } from "react";
import { View, Animated as RNAnimated, StyleSheet, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "../icons/Icon";
import { router } from "expo-router";

const TrophyCard = ({ id, title, icon, unlocked, justUnlocked, onAnimationComplete }) => {
  const styles = getStyles();
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

  const imageOpacity = animValue.interpolate({
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
    router.push(`/trophy/${id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.trophyItem}>
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
              <Icon name="lock" size={13} color={MyTheme.text} />
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
          {title}
        </AppText>
      </View>
    </Pressable>
  );
};

const getStyles = () =>
  StyleSheet.create({
    trophyItem: {
      alignItems: "center",
      width: "100%"
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
      backgroundColor: MyTheme.background,
      borderRadius: Spacing.borderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: MyTheme.primary
    }
  });

export default React.memo(TrophyCard);
