import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseBottomSheet from "@/components/ui/BaseBottomSheet";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppBadge from "../ui/AppBadge";

export default function PostOptionsSheet({ isVisible, onClose, isOwner }) {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("home");

  const renderOwnerOptions = () => (
    <>
      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Edit-Logic */ onClose();
        }}
      >
        <Icon name="pencil" color={MyTheme.text} />
        <AppText bold>{t("Beitrag bearbeiten")}</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Archiv-Logic */ onClose();
        }}
      >
        <Icon name="archive" color={MyTheme.text} />
        <AppText bold>{t("Archivieren")}</AppText>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionRow, styles.disabledRow]} activeOpacity={1}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md }}>
          <Icon name="statsChart" color={MyTheme.muted} />
          <AppText bold style={{ color: MyTheme.muted }}>
            {t("Insights")}
          </AppText>
        </View>
        <AppBadge label={"Coming Soon"} variant="primary" textStyle={{ color: MyTheme.text }} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Delete-Logic */ onClose();
        }}
      >
        <Icon name="trash" color={MyTheme.warning || "#ff4444"} />
        <AppText bold style={{ color: MyTheme.warning || "#ff4444" }}>
          {t("Beitrag löschen")}
        </AppText>
      </TouchableOpacity>
    </>
  );

  const renderViewerOptions = () => (
    <>
      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Quest-Logic */ onClose();
        }}
      >
        <Icon name="target" color={MyTheme.primaryAccent} />
        <AppText bold style={{ color: MyTheme.primaryAccent }}>
          {t("Zugehörige Aufgabe ansehen")}
        </AppText>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Mute-Logic */ onClose();
        }}
      >
        <Icon name="mute" color={MyTheme.text} />
        <AppText bold>{t("Nutzer stummschalten")}</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Algo-Logic */ onClose();
        }}
      >
        <Icon name="dislike" color={MyTheme.text} />
        <AppText bold>{t("Interessiert mich nicht")}</AppText>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Report-Logic */ onClose();
        }}
      >
        <Icon name="alert" color={MyTheme.warning || "#ff4444"} />
        <AppText bold style={{ color: MyTheme.warning || "#ff4444" }}>
          {t("Beitrag melden")}
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionRow}
        onPress={() => {
          /* Block-Logic */ onClose();
        }}
      >
        <Icon name="userX" color={MyTheme.warning || "#ff4444"} />
        <AppText bold style={{ color: MyTheme.warning || "#ff4444" }}>
          {t("Nutzer blockieren")}
        </AppText>
      </TouchableOpacity>
    </>
  );

  return (
    <BaseBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>{isOwner ? renderOwnerOptions() : renderViewerOptions()}</View>
    </BaseBottomSheet>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.md,
      gap: Spacing.md
    },
    disabledRow: {
      opacity: 0.75,
      justifyContent: "space-between"
    },
    textWithBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.separator,
      marginVertical: Spacing.xs
    }
  });
