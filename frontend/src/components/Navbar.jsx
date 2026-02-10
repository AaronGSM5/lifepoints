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
            Animated.timing(scale, { toValue: 1.1, duration: 200, useNativeDriver: true }).start(() => {
              Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start()
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

// export default function Navbar() {
//   const insets = useSafeAreaInsets();
//   const pathname = usePathname();

//   // Hilfsfunktion: prüft, ob Route aktiv ist
//   const isActive = (route) => pathname === route;

//   return (
//     <View style={[styles.container, { 
//       height: 64 + insets.bottom, 
//       paddingBottom: insets.bottom, 
//       paddingLeft: insets.left, 
//       paddingRight: insets.right 
//     }]}>
//       <TouchableOpacity onPress={() => router.push("/home")} style={styles.button}>
//         <Ionicons 
//           name={isActive("/home") ? "home" : "home-outline"} 
//           size={26} 
//           color="white" 
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push("/shop")} style={styles.button}>
//         <Ionicons 
//           name={isActive("/shop") ? "bag" : "bag-outline"} 
//           size={26} 
//           color="white" 
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push("/profile")} style={styles.button}>
//         <Ionicons 
//           name={isActive("/profile") ? "person" : "person-outline"} 
//           size={26} 
//           color="white" 
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  button: {
    // borderWidth: 1,       // React Native erwartet borderWidth, nicht border
    // borderColor: 'grey',
    borderRadius: 24,     // in RN Prozentangaben nicht erlaubt, stattdessen Pixel
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
