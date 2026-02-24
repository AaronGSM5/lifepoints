import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import AppText from './AppText';
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

const TrophyCard = ({ id, title, icon, unlocked, justUnlocked, onAnimationComplete }) => {
  const animValue = useRef(new Animated.Value(justUnlocked ? 0 : (unlocked ? 1 : 0))).current;

  useEffect(() => {
    if (justUnlocked) {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 800,
        delay: 300, 
        useNativeDriver: false, 
      }).start(({ finished }) => {
        if (finished && onAnimationComplete) {
          onAnimationComplete(id);
        }
      });
    }
  }, [justUnlocked, animValue, id, onAnimationComplete]);

  const iconColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#838383', '#FFD700']
  });

  const borderColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [MyTheme.secondary, 'rgba(255, 217, 0, 0.4)']
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

  return (
    <View style={styles.trophyItem}>
      <Animated.View style={[styles.trophyIconBox, { transform: [{ scale }], borderColor: borderColor }]}>

        <Animated.View style={[
          StyleSheet.absoluteFillObject, 
          styles.glowLayer, 
          { opacity: animValue } 
        ]} />

        <AnimatedIcon name={icon} size={24} style={{ color: iconColor }} />
        
        {(!unlocked || justUnlocked) && (
          <Animated.View style={[styles.lockOverlay, { opacity: unlocked ? lockOpacity : 1 }]}>
            <FontAwesome5 name="lock" size={10} color="#FFFFFF" />
          </Animated.View>
        )}
      </Animated.View>
      <AppText animated bold type='caption' style={{ color: textColor, textAlign: 'center', fontSize: 12 }}>{title}</AppText>
    </View>
  );
};

  const styles = StyleSheet.create({
    trophyItem: {
    alignItems: 'center',
    width: 80,
  },
  trophyIconBox: {
    width: 64,
    height: 64,
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: Spacing.xs,
    position: 'relative'
  },
  glowLayer: {
    borderRadius: Spacing.borderRadius.md,
    backgroundColor: MyTheme.primary, // necessary
    shadowColor: '#ffd900cc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,  // (wird über opacity des Layers gesteuert)
    shadowRadius: 12,
    elevation: 15,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: '#1E1E1E',
    width: 22,
    height: 22,
    borderRadius: Spacing.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: MyTheme.primary,
  }
  })

  // Tells react only re-render this card if their own props (example: unlocked-status) changed
  // Improves performance if we have many trophies
  export default React.memo(TrophyCard)