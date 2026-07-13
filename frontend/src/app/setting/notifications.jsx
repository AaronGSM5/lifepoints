import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

export default function NotificationsScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    offers: true
  });

  const toggleSwitch = useCallback((key) => {
    triggerHaptic();
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <ScreenWrapper>
      <ScreenTitle title={t("Notifications")} />
      <View style={styles.row}>
        <AppText>{t("Push Notifications")}</AppText>
        <Switch
          value={settings.push}
          onValueChange={() => toggleSwitch("push")}
          trackColor={{ false: MyTheme.muted, true: MyTheme.primaryAccent }}
        />
      </View>
      <View style={styles.row}>
        <AppText>{t("Email")}</AppText>
        <Switch
          value={settings.email}
          onValueChange={() => toggleSwitch("email")}
          trackColor={{ false: MyTheme.muted, true: MyTheme.primaryAccent }}
        />
      </View>
      <View style={styles.row}>
        <AppText>{t("Offers")}</AppText>
        <Switch
          value={settings.offers}
          onValueChange={() => toggleSwitch("offers")}
          trackColor={{ false: MyTheme.muted, true: MyTheme.primaryAccent }}
        />
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.lg
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.separator
    }
  });
