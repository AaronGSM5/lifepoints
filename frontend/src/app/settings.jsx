import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { mockSettings } from "@/constants/MockData";
import { Icon } from "@/components/icons/Icon";
import { MyTheme } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

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
      case "bottom-sheet":
        if (item.actionName === "openThemePicker") {
          console.log("Open Theme Picker Modal");
        }
        break;

      default:
        console.warn(`No handler defined for type: ${item.type}`);
    }
  };

  return (
    <ScreenWrapper scrollable>
      <AppText type="h1" style={{ marginBottom: Spacing.md }}>
        Settings
      </AppText>

      {mockSettings.map((cat) => (
        <View key={cat.title} style={styles.section}>
          <AppText style={styles.sectionHeader}>{cat.title.toUpperCase()}</AppText>

          <View style={styles.group}>
            {cat.data.map((setting, index) => (
              <View key={setting.id}>
                <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => handlePress(setting)}>
                  <View style={styles.itemLeft}>
                    <Icon name={setting.icon} color={setting.danger ? "red" : "white"} />
                    <AppText type="title" style={setting.danger ? { color: "red" } : {}}>
                      {setting.label}
                    </AppText>
                  </View>
                  {setting.type === "link" && <Icon name={"right"} />}
                </TouchableOpacity>

                {index < cat.data.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.md
  },
  sectionHeader: {
    fontSize: 13,
    color: MyTheme.muted,
    marginLeft: Spacing.lg,
    marginBottom: Spacing.xs
  },
  group: {
    backgroundColor: MyTheme.primary,
    borderRadius: Spacing.borderRadius.md,
    marginHorizontal: Spacing.md,
    overflow: "hidden"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.md,
    minHeight: 44
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12 // Abstand zwischen Icon und Text
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.muted,
    marginLeft: Spacing.md
  }
});
