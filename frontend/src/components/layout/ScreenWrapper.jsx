import { View, ScrollView, StyleSheet } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useToolbarPadding } from "@/hooks/useToolbarPadding";

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
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const insets = useSafeAreaInsets();
  const totalBottomPadding = useFloatingNavbarPadding();
  const toolbarTopPadding = useToolbarPadding();
  const contentStyles = [
    {
      paddingHorizontal: withPaddingSides ? Spacing.md : 0,
      paddingTop: withPaddingTop ? toolbarTopPadding + (withOffset ? Spacing.md : 0) : insets.top,
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

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.background // backgroundColor if useGradient = false
    }
  });
