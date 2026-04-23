import React, { useState } from "react";
import { View, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";

export default function SecurityScreen() {
  const styles = getStyles();
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
    <ScreenWrapper scrollable withPaddingTop={false}>
      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          Passwort ändern
        </AppText>
        <View style={styles.card}>
          <AppInput
            label="Aktuelles Passwort"
            placeholder="••••••••"
            secureTextEntry
            value={passwords.current}
            onChangeText={(txt) => setPasswords({ ...passwords, current: txt })}
          />
          <View style={{ height: Spacing.md }} />
          <AppInput
            label="Neues Passwort"
            placeholder="••••••••"
            secureTextEntry
            value={passwords.new}
            onChangeText={(txt) => setPasswords({ ...passwords, new: txt })}
          />
          <View style={{ height: Spacing.md }} />
          <AppInput
            label="Passwort bestätigen"
            placeholder="••••••••"
            secureTextEntry
            value={passwords.confirm}
            onChangeText={(txt) => setPasswords({ ...passwords, confirm: txt })}
          />
          <AppButton
            title="Passwort aktualisieren"
            onPress={handlePasswordChange}
            style={{ marginTop: Spacing.lg }}
            disabled={!passwords.new || passwords.new !== passwords.confirm}
          />
        </View>
      </View>

      <View style={styles.section}>
        <AppText type="title" style={styles.sectionTitle}>
          Sicherheit & Zugriff
        </AppText>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <AppText bold>FaceID / Fingerabdruck</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                Schnellerer Login
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
              <AppText bold>Zwei-Faktor-Authentifizierung</AppText>
              <AppText type="caption" style={{ color: MyTheme.muted }}>
                Zusätzlicher Schutz per E-Mail
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
        <AppText type="title" style={[styles.sectionTitle, { color: MyTheme.warning }]}>
          Gefahrenbereich
        </AppText>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Icon name="trash" size={20} color={MyTheme.warning} />
          <AppText bold style={{ color: MyTheme.warning, marginLeft: Spacing.sm }}>
            Konto dauerhaft löschen
          </AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
    section: {
      marginBottom: Spacing.xl
    },
    sectionTitle: {
      marginBottom: Spacing.md
    },
    card: {
      backgroundColor: MyTheme.primary,
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: MyTheme.secondary
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
      borderColor: MyTheme.warning
    }
  });
