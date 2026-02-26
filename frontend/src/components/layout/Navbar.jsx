import { View, Pressable, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { MyTheme } from "@/constants/Colors";
import { Icon } from "../icons/Icon";

export default function Navbar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  // Reihenfolge der Tabs in der Navbar
  const orderedRoutes = [...state.routes].sort((a, b) => {
    const order = ["home", "tasks", "communities", "shop", "profile"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  return (
    <View
      style={[
        styles.container,
        {
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: MyTheme.primary,
          borderTopWidth: 1,
          borderTopColor: MyTheme.secondary
        }
      ]}
    >
      {orderedRoutes.map((route, index) => {
        const isFocused = state.routes[state.index].key === route.key;
        // const iconName = iconMap[route.name] || "help-circle";

        // Animation Hook
        const scale = useRef(new Animated.Value(1)).current;

        const animatePop = () => {
          Animated.timing(scale, { toValue: 1.15, duration: 150, useNativeDriver: true }).start(() => {
            Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
          });
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          animatePop();
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tabButton}>
            <Animated.View style={{ transform: [{ scale }] }}>
              <Icon
                name={route.name || "help"}
                size={26}
                color={isFocused ? MyTheme.primaryAccent : "white"}
                outline={!isFocused}
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
