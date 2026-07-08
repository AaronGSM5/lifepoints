import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { Spacing } from "@/constants/Spacing";
import useStore from "@/store/useStore";
import { triggerHaptic } from "@/utils/haptics";

import NavbarItem from "./NavbarItem";

export default function Navbar({ state, navigation }) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = getStyles(isDarkMode);
  const insets = useSafeAreaInsets();

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

      <LinearGradient
        colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientOverlay}
      />

      <LinearGradient
        colors={["rgba(255,255,255,0.05)", "transparent", "transparent", "rgba(0,0,0,0.08)"]}
        locations={[0, 0.1, 0.9, 1]}
        style={styles.innerVignette}
      />

      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sideShadowLeft}
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sideShadowRight}
      />

      <View style={styles.borderOverlay} />

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
              triggerHaptic();
              navigation.navigate(route.name);
            }
          };

          return <NavbarItem key={route.key} route={route} isFocused={isFocused} onPress={onPress} />;
        })}
      </View>
    </View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    shadowContainer: {
      position: "absolute",
      left: 20,
      right: 20,
      height: 65,
      borderRadius: 35,
      boxShadow: isDarkMode ? "0px 8px 20px rgba(0, 0, 0, 0.4)" : "0px 8px 15px rgba(0, 0, 0, 0.2)",
      elevation: 10,
      backgroundColor: "transparent"
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
    innerVignette: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 35
    },
    borderOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 35,
      borderWidth: 1,
      borderTopColor: "rgba(255, 255, 255, 0.1)",
      borderLeftColor: "rgba(255, 255, 255, 0.075)",
      borderRightColor: "rgba(255, 255, 255, 0.075)",
      borderBottomColor: "rgba(255, 255, 255, 0.04)"
    },
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 35,
      opacity: 0.5
    },
    sideShadowLeft: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 30,
      borderTopLeftRadius: 35,
      borderBottomLeftRadius: 35
    },
    sideShadowRight: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 30,
      borderTopRightRadius: 35,
      borderBottomRightRadius: 35
    }
  });
