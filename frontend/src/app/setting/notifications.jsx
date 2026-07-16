import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, View } from "react-native";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import Separator from "@/components/ui/Separator";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { triggerHaptic } from "@/utils/haptics";

const options = [
  { id: "push", i18nKey: "Push Notifications" },
  { id: "email", i18nKey: "Email" },
  { id: "offers", i18nKey: "Offers" }
];

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
      {options.map((option, index) => {
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        return (
          <React.Fragment key={option.id}>
            <View style={[styles.row, isFirst && { paddingTop: 0 }]}>
              <AppText>{t(option.i18nKey)}</AppText>
              <Switch
                value={settings[option.id]}
                onValueChange={() => toggleSwitch(option.id)}
                trackColor={styles.switch}
              />
            </View>
            {!isLast && <Separator />}
          </React.Fragment>
        );
      })}
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Spacing.md
    },
    switch: {
      false: theme.muted,
      true: theme.primaryAccent
    }
  });
