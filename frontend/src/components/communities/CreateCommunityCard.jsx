import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";

const CreateCommunityCard = () => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);

  return (
    <View style={styles.createCard}>
      <View style={styles.createCardLeft}>
        <View style={[styles.iconBox, { backgroundColor: "rgba(47, 196, 146, 0.1)" }]}>
          <Icon name="newFolder" color={MyTheme.primaryAccent} />
        </View>
        <View>
          <AppText bold style={styles.createCardTitle}>
            Create Community
          </AppText>
          <AppText style={styles.createCardSubtitle}>Start your own hub</AppText>
        </View>
      </View>
      <AppButton
        icon={<Icon name="add" color={MyTheme.background} />}
        iconPosition="center"
        size="sm"
        bgColor={MyTheme.primaryAccent}
      />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    createCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(47, 196, 146, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(47, 196, 146, 0.25)",
      borderRadius: Spacing.borderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.lg
    },
    createCardLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md
    },
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: Spacing.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(47, 196, 146, 0.2)"
    },
    createCardTitle: { marginBottom: Spacing.xs },
    createCardSubtitle: { fontSize: 12, color: theme.muted }
  });

export default CreateCommunityCard;
