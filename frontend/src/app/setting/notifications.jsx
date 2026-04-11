import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";

export default function NotificationsScreen() {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    offers: true
  });

  const toggleSwitch = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <ScreenWrapper withPaddingTop={false}>
      <View style={styles.row}>
        <AppText>Push Notifications</AppText>
        <Switch
          value={settings.push}
          onValueChange={() => toggleSwitch("push")}
          trackColor={{ false: "#767577", true: MyTheme.primaryAccent }}
        />
      </View>
      {/* ... weitere Zeilen ... */}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  }
});
