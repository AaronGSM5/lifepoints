import { useState } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import { useTranslation } from "react-i18next";

const SettingsRow = ({ setting, isLast, onPress }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const [isToggled, setIsToggled] = useState(setting.defaultValue || false);
  const { t } = useTranslation("settings");

  return (
    <View>
      <Pressable
        onPress={() => {
          if (setting.type === "toggle") {
            setIsToggled(!isToggled);
          } else {
            onPress(setting);
          }
        }}
        style={({ pressed }) => [styles.item, pressed && setting.type !== "info" && { backgroundColor: MyTheme.glas }]}
      >
        {/* Icon & Text */}
        <View style={styles.itemLeft}>
          <Icon name={setting.icon} color={setting.danger ? MyTheme.warning : MyTheme.text} />
          <AppText type="title" style={setting.danger ? { color: MyTheme.warning } : {}}>
            {t(setting.label)}
          </AppText>
        </View>

        {/* Indikators / Values / Switches */}
        <View style={styles.itemRight}>
          {setting.value && (
            <AppText type="caption" style={styles.valueText}>
              {setting.value}
            </AppText>
          )}

          {setting.type === "toggle" && (
            <Switch
              value={isToggled}
              onValueChange={setIsToggled}
              trackColor={{ false: "#3f3f46", true: MyTheme.primaryAccent }}
              thumbColor={"#fff"}
            />
          )}

          {(setting.type === "link" || setting.type === "bottom-sheet") && (
            <Icon name="right" color={MyTheme.muted} size={20} />
          )}
        </View>
      </Pressable>

      {!isLast && <View style={styles.separator} />}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Spacing.sm + 4,
      paddingHorizontal: Spacing.md,
      minHeight: 52
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12
    },
    itemRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8
    },
    valueText: {
      opacity: 0.7
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      marginHorizontal: Spacing.md
    }
  });

export default SettingsRow;
