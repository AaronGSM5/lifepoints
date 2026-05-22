import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { triggerHaptic } from "@/utils/haptics";

export default function NotificationsScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("settings");
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    offers: true
  });

  const toggleSwitch = (key) => {
    triggerHaptic();
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScreenWrapper withPaddingTop={false}>
      <ScreenTitle title={t("Notifications")} />
      <View style={styles.row}>
        <AppText>{t("Push Notifications")}</AppText>
        <Switch
          value={settings.push}
          onValueChange={() => toggleSwitch("push")}
          trackColor={{ false: "#767577", true: MyTheme.primaryAccent }}
        />
      </View>
      <View style={styles.row}>
        <AppText>{t("Email")}</AppText>
        <Switch
          value={settings.email}
          onValueChange={() => toggleSwitch("email")}
          trackColor={{ false: "#767577", true: MyTheme.primaryAccent }}
        />
      </View>
      <View style={styles.row}>
        <AppText>{t("Offers")}</AppText>
        <Switch
          value={settings.offers}
          onValueChange={() => toggleSwitch("offers")}
          trackColor={{ false: "#767577", true: MyTheme.primaryAccent }}
        />
      </View>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
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
