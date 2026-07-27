import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Switch, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";
import Separator from "../ui/Separator";

const SettingsRow = memo(({ setting, isLast, onPress, onToggle, value }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("settings");

  const handlePress = () => {
    if (setting.type === "toggle") {
      onToggle?.(!value);
    } else {
      onPress?.(setting);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.item, pressed && setting.type !== "info" && { backgroundColor: MyTheme.glas }]}
      >
        <View style={styles.itemLeft}>
          <Icon name={setting.icon} color={setting.danger ? MyTheme.warning : MyTheme.text} />
          <AppText type="title" style={setting.danger ? { color: MyTheme.warning } : {}}>
            {t(setting.label)}
          </AppText>
        </View>

        <View style={styles.itemRight}>
          {setting.value && (
            <AppText type="caption" style={styles.valueText}>
              {setting.value}
            </AppText>
          )}

          {setting.type === "toggle" && (
            <Switch
              value={!!value}
              onValueChange={onToggle}
              trackColor={{ false: "#3f3f46", true: MyTheme.primaryAccent }}
              thumbColor={"#fff"}
            />
          )}

          {(setting.type === "link" || setting.type === "bottom-sheet") && (
            <Icon name="right" color={MyTheme.muted} size={20} />
          )}
        </View>
      </Pressable>

      {!isLast && <Separator />}
    </View>
  );
});
SettingsRow.displayName = "SettingsRow";

const getStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.md
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Spacing.sm + 4,
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
    }
  });

export default SettingsRow;
