import { View, StyleSheet, Alert } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { settingsSections } from "@/constants/SettingsConfig";
import { useRouter } from "expo-router";
import BaseCard from "@/components/ui/BaseCard";
import SettingsRow from "@/components/settings/SettingsRow";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation("settings");

  const handlePress = (item) => {
    switch (item.type) {
      case "link":
        if (item.route) router.push(item.route);
        break;
      case "action":
        if (item.actionName === "clearCache") {
          Alert.alert("Cache Cleared", "Temporary files have been removed.");
        } else if (item.actionName === "deleteAccount") {
          Alert.alert("Delete Account?", "This action cannot be undone. All your Lifepoints will be lost.", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => console.log("API Call to delete user") }
          ]);
        }
        break;
      case "toggle":
      case "info":
        break;
      default:
        console.warn(`No handler defined for type: ${item.type}`);
    }
  };

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
