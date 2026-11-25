import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

import NavbarItem from "./NavbarItem";

export default function Navbar({ state, navigation }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const insets = useSafeAreaInsets();

  const orderedRoutes = [...state.routes].sort((a, b) => {
    const order = ["home", "tasks", "social", "shop", "profile"];
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
      <BlurView
        intensity={80}
        tint={MyTheme.navbarTint}
        style={styles.blurBackground}
      />

      <View style={styles.solidBackground} />

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
      <View style={styles.buttonContainer} accessibilityRole="tablist">
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

const getStyles = (theme) =>
  StyleSheet.create({
    shadowContainer: {
      position: "absolute",
      left: 20,
      right: 20,
      height: 65,
      borderRadius: 35,
      boxShadow: theme.navbarShadow,
      elevation: 10,
      backgroundColor: "transparent"
    },
    blurBackground: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: theme.radius.full,
      overflow: "hidden"
    },
    solidBackground: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 35,
      backgroundColor: theme.navbarBackground
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
      borderColor: theme.navbarBorderColor
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
