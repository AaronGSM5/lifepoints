import { memo } from "react";
import { StyleSheet } from "react-native";
import BaseCard from "../ui/BaseCard";
import AppText from "../ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const SelectableOptionCard = memo(({ children, label, isSelected, onPress }) => {
  const MyTheme = useAppTheme();
  
  return (
    <BaseCard
      style={[
        styles.card,
        isSelected && { borderColor: MyTheme.primaryAccent }
      ]}
      onPress={onPress}
    >
      {children}
      <AppText bold={isSelected} disabled={!isSelected} style={styles.cardText}>
        {label}
      </AppText>
    </BaseCard>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)"
  },
  cardText: {
    marginTop: Spacing.md
  }
});

export default SelectableOptionCard;