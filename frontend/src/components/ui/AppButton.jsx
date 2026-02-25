import React, { useRef } from 'react';
import { 
  Pressable, 
  StyleSheet, 
  Animated, 
  ActivityIndicator, 
  View 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from './AppText';

export default function AppButton({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',         // 'sm' | 'md' | 'lg'
  icon,                // z.B. <Ionicons ... />
  iconPosition = 'left', 
  loading = false, 
  disabled = false,
  style,               
  fullWidth = false,
}) {
  
  // Animation für den physikalischen "Druck"-Effekt
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      speed: 20,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  };

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline'
  const isGhost = variant === 'ghost';

  return (
    <Animated.View style={[
      { transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : 'auto' }, 
      style
    ]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading }}
        style={({ pressed }) => [
          styles.base,
          styles[size],
          isSecondary && styles.secondary,
          isOutline && styles.outline,
          isGhost && styles.ghost,
          (disabled || loading) && styles.disabled,
        ]}
      >
        {/* Hintergrund: Gradient nur bei der Primary-Variante */}
        {isPrimary && !disabled && !loading && (
          <LinearGradient
            colors={[MyTheme.secondary, MyTheme.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        {loading ? (
          <ActivityIndicator color={isPrimary ? "#fff" : MyTheme.primaryAccent} />
        ) : (
          <View style={[styles.content, iconPosition === 'right' && { flexDirection: 'row-reverse' }]}>
            {icon && <View style={styles.iconWrapper}>{icon}</View>}
            
            <AppText 
              bold 
              style={[
                styles.text, 
                isSecondary && { color: MyTheme.text },
                isOutline && { color: MyTheme.primaryAccent },
                isGhost && { color: MyTheme.muted },
                size === 'sm' && { fontSize: 12 },
                size === 'lg' && { fontSize: 16 },
              ]}
            >
              {title}
            </AppText>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Spacing.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Größen-Definitionen
  sm: { paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.sm + 4 },
  md: { paddingVertical: Spacing.sm + 4, paddingHorizontal: Spacing.lg },
  lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  
  // Varianten-Styles
  secondary: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  outline: {
    borderWidth: 1,
    borderColor: MyTheme.primaryAccent,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: '#2A2A2A',
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  iconWrapper: {
    marginHorizontal: 8,
  },
});