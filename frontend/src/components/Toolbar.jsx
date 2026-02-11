import { View, Pressable, StyleSheet, Animated, Text } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useRef } from 'react';
import { MyTheme } from '@/constants/Colors';

export default function Toolbar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const canGoBack = pathname !== '/home' && pathname !== '/shop' && pathname !== '/profile';
  const backScale = useRef(new Animated.Value(1)).current;

  const animateBack = () => {
    Animated.sequence([
      Animated.timing(backScale, { toValue: 1.12, duration: 120, useNativeDriver: false }),
      Animated.timing(backScale, { toValue: 1, duration: 100, useNativeDriver: false }),
    ]).start();
  };

  const onBack = () => router.back();

  const notifScale = useRef(new Animated.Value(1)).current;
  const animateNotification = () => {
    Animated.sequence([
      Animated.timing(notifScale, { toValue: 1.12, duration: 120, useNativeDriver: false }),
      Animated.timing(notifScale, { toValue: 1, duration: 100, useNativeDriver: false }),
    ]).start();
  };

  const onNotification = () => router.push('/notifications');

  return (
    <View style={[styles.container, { 
      height: 56 + insets.top, 
      paddingTop: insets.top, 
      paddingLeft: Math.max(12, insets.left), 
      paddingRight: Math.max(12, insets.right)
    }]}>
      {/* Back-Button */}
      {canGoBack ? (
        <Pressable onPress={onBack} onPressOut={animateBack}>
          <Animated.View style={{ transform: [{ scale: backScale }] }}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </Animated.View>
        </Pressable>
      ) : (
        <View style={{ width: 24 }} /> // Placeholder for center text
      )}

      {/* Title */}
      <Text style={styles.text}>LifePoints</Text>

      {/* Notifications */}
      {pathname !== '/profile' ? <Pressable onPress={onNotification} onPressOut={animateNotification}>
        <Animated.View style={{ transform: [{ scale: notifScale }] }}>
          <Ionicons name={pathname === '/notifications' ? "notifications" : "notifications-outline"} size={24} color="white" />
        </Animated.View>
      </Pressable> : pathname === '/settings' ? <Pressable>
        <Ionicons name="settings" size={24} color="white" />
        </Pressable> : <Pressable>
          <Ionicons name="settings-outline" size={24} color="white" />
        </Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: MyTheme.text,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
