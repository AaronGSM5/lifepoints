import { View, ScrollView, StyleSheet } from "react-native";
import { Spacing } from "@/constants/Spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MyTheme } from "@/constants/Colors";

export default function ScreenWrapper({ children, scrollable = true, withOffset = false, useGradient = true, style }) {
  const insets = useSafeAreaInsets();

  const contentStyles = [
    {
      paddingHorizontal: Spacing.md,
      paddingTop: withOffset ? insets.top + Spacing.md : Spacing.md,
      paddingBottom: Math.max(insets.bottom, Spacing.md)
    },
    style
  ];

  return (
    <View style={styles.wrapper}>
      {useGradient && <LinearGradient colors={[MyTheme.background, "#121212"]} style={StyleSheet.absoluteFillObject} />}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: MyTheme.background // backgroundColor if useGradient = false
  }
});
