import React, { useRef, useEffect } from "react";
// WICHTIG: Image aus react-native importieren!
import { View, Animated, StyleSheet, Pressable, Image } from "react-native";
import AppText from "@/components/ui/AppText";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Icon } from "../icons/Icon";
import { router } from "expo-router";

// Wir machen das normale Image animierbar, damit wir es faden können
const AnimatedImage = Animated.createAnimatedComponent(Image);

const TrophyCard = ({ id, title, icon, unlocked, justUnlocked, onAnimationComplete }) => {
  const animValue = useRef(new Animated.Value(justUnlocked ? 0 : unlocked ? 1 : 0)).current;

  useEffect(() => {
    if (justUnlocked) {
      Animated.timing(animValue, {
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

  // Bild ist nur zu 30% sichtbar, wenn gelockt. 100% wenn unlocked.
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
        {/* Die äußere Box mit Scale-Animation bleibt! */}
        <Animated.View style={[styles.trophyIconBox, { transform: [{ scale }] }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.glowLayer, { opacity: animValue }]} />

          <AnimatedImage source={icon} style={[styles.trophyImage, { opacity: imageOpacity }]} resizeMode="contain" />

          {/* Das kleine Schloss bleibt als Icon erhalten */}
          {(!unlocked || justUnlocked) && (
            <Animated.View style={[styles.lockOverlay, { opacity: unlocked ? lockOpacity : 1 }]}>
              <Icon name="lock" size={16} color="#FFFFFF" />
            </Animated.View>
          )}
        </Animated.View>

        <AppText
          animated
          bold
          type="caption"
          style={{ color: textColor, textAlign: "center", fontSize: 12, marginTop: 4 }}
        >
          {title}
        </AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  // glowLayer: {
  //   borderRadius: Spacing.borderRadius.md,
  //   shadowColor: "#ffd900cc",
  //   shadowOffset: { width: 0, height: 0 },
  //   shadowOpacity: 1,
  //   shadowRadius: 12,
  //   elevation: 15
  // },
  lockOverlay: {
    position: "absolute",
    bottom: -10,
    right: -10,
    width: 30,
    height: 30,
    backgroundColor: "#1E1E1E",
    borderRadius: Spacing.borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: MyTheme.primary
  }
});

export default React.memo(TrophyCard);
