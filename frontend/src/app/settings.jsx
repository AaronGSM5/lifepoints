import { View, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper scrollable>
        <View style={styles.header}>
          <AppText type="h1">Settings</AppText>
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg
  }
});
