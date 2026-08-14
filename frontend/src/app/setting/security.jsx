import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Switch, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import ScreenTitle from "@/components/ui/ScreenTitle";
import SectionHeader from "@/components/ui/SectionHeader";
import Separator from "@/components/ui/Separator";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";

const handlePasswordChange = () => {
  Alert.alert("Erfolg", "Dein Passwort wurde erfolgreich aktualisiert.");
};

const handleDeleteAccount = () => {
  Alert.alert("Konto löschen", "Bist du sicher? Alle deine LifePoints gehen unwiderruflich verloren.", [
    { text: "Abbrechen", style: "cancel" },
    { text: "Löschen", style: "destructive", onPress: () => console.log("Delete") }
  ]);
};

export default function SecurityScreen() {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(true);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  return (
    <ScreenWrapper scrollable>
      <ScreenTitle title={t("Security & Login")} />
      <View style={styles.section}>
        <SectionHeader title={t("Change Password")} />
        <BaseCard>
          <AppInput
            label={t("Current Password")}
            placeholder="••••••••"
            secureTextEntry
            value={passwords.current}
            onChangeText={(txt) => setPasswords({ ...passwords, current: txt })}
          />
          <View style={{ height: Spacing.md }} />
          <AppInput
            label={t("New Password")}
            placeholder="••••••••"
            secureTextEntry
            value={passwords.new}
            onChangeText={(txt) => setPasswords({ ...passwords, new: txt })}
          />
          <View style={{ height: Spacing.md }} />
          <AppInput
            label={t("Confirm Password")}
            placeholder="••••••••"
            secureTextEntry
            value={passwords.confirm}
            onChangeText={(txt) => setPasswords({ ...passwords, confirm: txt })}
          />
          <AppButton
            title={t("Update Password")}
            onPress={handlePasswordChange}
            style={{ marginTop: Spacing.lg }}
            disabled={!passwords.new || passwords.new !== passwords.confirm}
            variant={"outline"}
          />
        </BaseCard>
      </View>

      <View style={styles.section}>
        <SectionHeader title={t("Security & Access")} />
        <BaseCard>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <AppText bold>{t("FaceID / Fingerprint")}</AppText>
              <AppText type="caption">{t("Faster Login")}</AppText>
            </View>
            <Switch value={isBiometricsEnabled} onValueChange={setIsBiometricsEnabled} trackColor={styles.switch} />
          </View>
          <Separator />
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <AppText bold>{t("Two-factor authentication")}</AppText>
              <AppText type="caption">{t("Additional protection via email")}</AppText>
            </View>
            <Switch value={isTwoFactorEnabled} onValueChange={setIsTwoFactorEnabled} trackColor={styles.switch} />
          </View>
        </BaseCard>
      </View>

      <View style={styles.section}>
        <AppButton
          title={t("Permanently delete account")}
          icon={<Icon name="trash" size={20} color={MyTheme.warning} />}
          onPress={handleDeleteAccount}
          borderStyle={{ borderWidth: 1, borderColor: addOpacity(MyTheme.warning, 0.6) }}
          textStyle={{ color: MyTheme.text }}
          variant={"outline"}
        />
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginBottom: Spacing.xl
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Spacing.md
    },
    rowContent: {
      flex: 1
    },
    switch: {
      false: "#767577",
      true: theme.primaryAccent
    }
  });
