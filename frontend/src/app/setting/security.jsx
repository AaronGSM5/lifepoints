import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppText from "@/components/ui/AppText";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function SecurityScreen() {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("settings");
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(true);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handlePasswordChange = () => {
    Alert.alert("Erfolg", "Dein Passwort wurde erfolgreich aktualisiert.");
  };

  const handleDeleteAccount = () => {
    Alert.alert("Konto löschen", "Bist du sicher? Alle deine LifePoints gehen unwiderruflich verloren.", [
      { text: "Abbrechen", style: "cancel" },
      { text: "Löschen", style: "destructive", onPress: () => console.log("Delete") }
    ]);
  };

  return (
    <ScreenWrapper scrollable>
      <ScreenTitle title={t("Security & Login")} />
      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          {t("Change Password")}
        </AppText>
        <View style={styles.card}>
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
          />
        </View>
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          {t("Security & Access")}
        </AppText>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <AppText bold>{t("FaceID / Fingerprint")}</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                {t("Faster Login")}
              </AppText>
            </View>
            <Switch
              value={isBiometricsEnabled}
              onValueChange={setIsBiometricsEnabled}
              trackColor={{ false: "#767577", true: MyTheme.primaryAccent }}
            />
          </View>

          <View style={[styles.row, { borderTopWidth: 1, borderTopColor: "#f2f2f7" }]}>
            <View style={styles.rowContent}>
              <AppText bold>{t("Two-factor authentication")}</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                {t("Additional protection via email")}
              </AppText>
            </View>
            <Switch
              value={isTwoFactorEnabled}
              onValueChange={setIsTwoFactorEnabled}
              trackColor={{ false: "#767577", true: MyTheme.primaryAccent }}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Icon name="trash" size={20} color={MyTheme.warning} />
          <AppText bold style={{ color: MyTheme.warning, marginLeft: Spacing.sm }}>
            {t("Permanently delete account")}
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginBottom: Spacing.xl
    },
    sectionTitle: {
      marginBottom: Spacing.md
    },
    card: {
      backgroundColor: theme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: theme.secondary
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
    deleteButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.md,
      backgroundColor: "white",
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.warning
    }
  });
