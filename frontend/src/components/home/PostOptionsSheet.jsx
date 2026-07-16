import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseBottomSheet from "@/components/ui/BaseBottomSheet";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppBadge from "../ui/AppBadge";
import Separator from "../ui/Separator";

const OptionItem = memo(({ icon, label, onPress, color, badge, disabled }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getOptionStyles(MyTheme), [MyTheme]);
  return (
    <TouchableOpacity style={[styles.optionRow, disabled && styles.disabledRow]} onPress={onPress} disabled={disabled}>
      <View style={styles.optionContent}>
        <Icon name={icon} color={color || MyTheme.text} />
        <AppText bold style={color ? { color } : {}}>
          {label}
        </AppText>
      </View>
      {badge && <AppBadge label={badge} variant="primary" />}
    </TouchableOpacity>
  );
});
OptionItem.displayName = "OptionItem";

export default function PostOptionsSheet({ isVisible, onClose, isOwner }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");

  const warningColor = MyTheme.warning || "#ff4444";

  return (
    <BaseBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {isOwner ? (
          <>
            <OptionItem icon="pencil" label={t("Beitrag bearbeiten")} onPress={onClose} />
            <OptionItem icon="archive" label={t("Archivieren")} onPress={onClose} />
            <OptionItem icon="statsChart" label={t("Insights")} disabled badge={"Coming Soon"} />
            <Separator />
            <OptionItem icon="trash" label={t("Beitrag löschen")} onPress={onClose} color={warningColor} />
          </>
        ) : (
          <>
            <OptionItem
              icon="target"
              label={t("Zugehörige Aufgabe ansehen")}
              onPress={onClose}
              color={MyTheme.primaryAccent}
            />
            <Separator />
            <OptionItem icon="mute" label={t("Nutzer stummschalten")} onPress={onClose} />
            <OptionItem icon="dislike" label={t("Interessiert mich nicht")} onPress={onClose} />
            <Separator />
            <OptionItem icon="alert" label={t("Beitrag melden")} onPress={onClose} color={warningColor} />
            <OptionItem icon="userX" label={t("Nutzer blockieren")} onPress={onClose} color={warningColor} />
          </>
        )}
      </View>
    </BaseBottomSheet>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg
    }
  });

const getOptionStyles = () =>
  StyleSheet.create({
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Spacing.md
    },
    optionContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md
    },
    disabledRow: {
      opacity: 0.7
    }
  });
