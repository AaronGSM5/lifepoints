import { View, Pressable, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { BlurView } from "expo-blur";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "../icons/Icon";
import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";

const TabBarItem = ({ route, isFocused, onPress }) => {
  const styles = getStyles();
  const scale = useRef(new Animated.Value(1)).current;

  const animatePop = () => {
    Animated.timing(scale, { toValue: 1.15, duration: 150, useNativeDriver: true }).start(() => {
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    });
  };

  const handlePress = () => {
    onPress();
    animatePop();
  };

  return (
    <Pressable onPress={handlePress} style={styles.tabButton}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon
          name={route.name || "help"}
          size={26}
          color={isFocused ? MyTheme.primaryAccent : MyTheme.text}
          outline={!isFocused}
        />
      </Animated.View>
    </Pressable>
  );
};

export default function Navbar({ state, descriptors, navigation }) {
  const styles = getStyles();
  const { isDarkMode } = useStore();
  const insets = useSafeAreaInsets();

  // Reihenfolge der Tabs in der Navbar
  const orderedRoutes = [...state.routes].sort((a, b) => {
    const order = ["home", "tasks", "communities", "shop", "profile"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  const navbarBottomSpace = insets.bottom > 0 ? insets.bottom + 10 : 25;

  return (
    <View
      style={[
        styles.shadowContainer,
        {
          bottom: navbarBottomSpace
        }
      ]}
    >
      <BlurView intensity={80} tint={isDarkMode ? "systemChromeMaterialDark" : "light"} style={styles.blurBackground} />

      {/* Button Wrapper */}
      <View style={styles.buttonContainer}>
        {orderedRoutes.map((route) => {
          const isFocused = state.routes[state.index].key === route.key;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return <TabBarItem key={route.key} route={route} isFocused={isFocused} onPress={onPress} />;
        })}
      </View>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    shadowContainer: {
      position: "absolute",
      left: 20,
      right: 20,
      height: 65,
      borderRadius: 35,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
      elevation: 10
    },
    blurBackground: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: Spacing.borderRadius.full,
      overflow: "hidden"
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    },
    tabButton: {
      flex: 1,
      height: "100%",
      alignItems: "center",
      justifyContent: "center"
    }
  });
