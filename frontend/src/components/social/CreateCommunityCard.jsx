import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

const CreateCommunityCard = ({ onPress }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  return (
    <View style={styles.createCard}>
      <AppButton
        icon={<Icon name="add" color={MyTheme.background} />}
        iconPosition="center"
        size="sm"
        onPress={onPress}
      />
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
    }
  });

export default CreateCommunityCard;
