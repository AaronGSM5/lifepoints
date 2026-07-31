import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const CreateCommunityCard = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  return (
    <View style={styles.createCard}>
      <View style={styles.createCardContent}>
        <AppText bold style={{ textAlign: "center" }}>
          Create Community
        </AppText>
        <AppButton icon={<Icon name="add" color={MyTheme.background} />} iconPosition="center" size="sm" />
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    createCard: {
      width: 150,
      height: 180,
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 2,
      borderColor: theme.primary,
      backgroundColor: theme.glas,
      justifyContent: "center",
      alignItems: "center"
    },
    createCardContent: {
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.sm
    }
  });

export default CreateCommunityCard;
