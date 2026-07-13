import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "../icons/Icon";
import AppText from "../ui/AppText";

const HistoryItem = memo(({ title, onPress }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("common");
  return (
    <TouchableOpacity style={styles.historyItem} onPress={onPress}>
      <Icon name="history" size={20} color={MyTheme.muted} />
      <AppText>{t(title)}</AppText>
    </TouchableOpacity>
  );
});
HistoryItem.displayName = "HistoryItem";

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md
  }
});

export default HistoryItem;
