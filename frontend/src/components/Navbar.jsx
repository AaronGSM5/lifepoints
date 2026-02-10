import { View, Pressable, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useRef } from 'react';

export default function Navbar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const tabs = [
    { route: "/home", icon: "home" },
    { route: "/shop", icon: "bag" },
    { route: "/profile", icon: "person" },
  ];

  const isActive = (route) => pathname === route;

  return (
    <View style={[styles.container, { 
      height: 64 + insets.bottom, 
      paddingBottom: insets.bottom, 
      paddingLeft: insets.left, 
      paddingRight: insets.right 
    }]}>
      {tabs.map(({ route, icon }) => {
        const scale = useRef(new Animated.Value(1)).current;

        const animatePop = () => {
            Animated.timing(scale, { toValue: 1.12, duration: 180, useNativeDriver: false }).start(() => {
              Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: false }).start()
            })
        }

        const onPress = () => router.push(route);

        return (
          <Pressable
            key={route}
            onPress={onPress}
            onPressOut={animatePop}
          >
            <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
              <Ionicons 
                name={isActive(route) ? icon : `${icon}-outline`} 
                size={26} 
                color="white" 
              />
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  button: {
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
