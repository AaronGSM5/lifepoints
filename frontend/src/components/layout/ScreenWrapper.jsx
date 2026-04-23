import { View, ScrollView, StyleSheet } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MyTheme } from "@/constants/Colors";

export const useFloatingNavbarPadding = () => {
  const insets = useSafeAreaInsets();
  const navbarBottomSpace = insets.bottom > 0 ? insets.bottom + 10 : 25;
  const navbarHeight = 65;
  const extraClearance = Spacing.md || 16;
  return navbarBottomSpace + navbarHeight + extraClearance;
};

export default function ScreenWrapper({
  children,
  scrollable = true,
  withOffset = false,
  withPaddingBottom = true,
  withPaddingSides = true,
  useGradient = true,
  withPaddingTop = true,
  style
}) {
  const styles = getStyles();
  const insets = useSafeAreaInsets();
  const totalBottomPadding = useFloatingNavbarPadding();
  const contentStyles = [
    {
      paddingHorizontal: withPaddingSides ? Spacing.md : 0,
      paddingTop: withOffset ? insets.top + Spacing.md : withPaddingTop ? Spacing.md : insets.top,
      paddingBottom: scrollable && withPaddingBottom ? totalBottomPadding : 0
    },
    style
  ];

  return (
    <View style={styles.wrapper}>
      {useGradient && (
        <LinearGradient colors={[MyTheme.background, MyTheme.backgroundBottom]} style={StyleSheet.absoluteFillObject} />
      )}
      {scrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[contentStyles, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, contentStyles]}>{children}</View>
      )}
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: MyTheme.background // backgroundColor if useGradient = false
    }
  });
