import { View, StyleSheet, TouchableOpacity } from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import { mockSettings } from "@/constants/MockData";
import { Icon } from "@/components/icons/Icon";
import { MyTheme } from "@/constants/Colors";

export default function SettingsScreen() {
  return (
    <ScreenWrapper scrollable>
      <AppText type="h1" style={{ marginBottom: Spacing.md }}>
        Settings
      </AppText>

      {mockSettings.map((cat) => (
        <View key={cat.title} style={styles.section}>
          <AppText style={styles.sectionHeader}>{cat.title.toUpperCase()}</AppText>

          <View style={styles.group}>
            {cat.settings.map((setting, index) => (
              <View key={setting}>
                <TouchableOpacity style={styles.item} activeOpacity={0.7}>
                  <AppText type="title">{setting}</AppText>
                  <Icon name={"right"} />
                </TouchableOpacity>

                {index < cat.settings.length - 1 && <View style={styles.separator} />}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.muted,
    marginLeft: 16
  }
});
