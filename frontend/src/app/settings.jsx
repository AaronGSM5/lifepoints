import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import SettingsRow from "@/components/settings/SettingsRow";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { settingsSections } from "@/constants/SettingsConfig";
import { Spacing } from "@/constants/Spacing";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation("settings");

  const executeAction = useCallback(
    (actionName) => {
      if (actionName === "clearCache") {
        Alert.alert(t("Cache Cleared"), t("Temporary files have been removed."));
      } else if (actionName === "deleteAccount") {
        Alert.alert(t("Delete Account?"), t("This action cannot be undone. All your Lifepoints will be lost."), [
          { text: t("Cancel"), style: "cancel" },
          { text: t("Delete"), style: "destructive", onPress: () => console.log("API Call to delete user") }
        ]);
      }
    },
    [t]
  );

  const handlePress = useCallback(
    (item) => {
      switch (item.type) {
        case "link":
          if (item.route) router.push(item.route);
          break;
        case "action":
          executeAction(item.actionName);
          break;
        case "toggle":
        case "info":
          break;
        default:
          console.warn(`No handler defined for type: ${item.type}`);
      }
    },
    [router, executeAction]
  );

  return (
    <ScreenWrapper scrollable>
      {settingsSections.map((cat) => (
        <View key={cat.title} style={styles.section}>
          <AppText type="caption" style={styles.sectionHeader}>
            {t(cat.title).toUpperCase()}
          </AppText>

          <BaseCard padding={0}>
            {cat.data.map((setting, index) => (
              <SettingsRow
                key={setting.id}
                setting={setting}
                isLast={index === cat.data.length - 1}
                onPress={handlePress}
              />
            ))}
          </BaseCard>
        </View>
      ))}
      <View>
        <AppText type="caption" style={{ textAlign: "center" }}>
          Lifepoints App Version 1.0.0
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.md
  },
  sectionHeader: {
    marginLeft: Spacing.xs,
    marginBottom: Spacing.xs
  }
});
