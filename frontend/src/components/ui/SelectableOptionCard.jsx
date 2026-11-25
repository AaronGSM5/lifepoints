import { memo } from "react";
import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppText from "../ui/AppText";
import BaseCard from "../ui/BaseCard";

const SelectableOptionCard = memo(({ children, label, isSelected, onPress }) => {
  const MyTheme = useAppTheme();

  return (
    <BaseCard
      style={[styles.card, { borderColor: isSelected ? MyTheme.primaryAccent : "transparent" }]}
      onPress={onPress}
    >
      {children}
      <AppText bold={isSelected} disabled={!isSelected} style={styles.cardText}>
        {label}
      </AppText>
    </BaseCard>
  );
});
SelectableOptionCard.displayName = "SelectableOptionCard";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2
  },
  cardText: {
    marginTop: Spacing.md
  }
});

export default SelectableOptionCard;
