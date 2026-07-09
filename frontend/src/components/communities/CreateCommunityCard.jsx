import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/addOpacity";

// DISCLAIMER DISCLAIMER DISCLAIMER DISCLAIMER DISCLAIMER
//                Currently not in use
// DISCLAIMER DISCLAIMER DISCLAIMER DISCLAIMER DISCLAIMER

const CreateCommunityCard = () => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);

  return (
    <View
      style={[
        styles.createCard,
        {
          backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1),
          borderColor: addOpacity(MyTheme.primaryAccent, 0.25)
        }
      ]}
    >
      <View style={styles.createCardLeft}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: addOpacity(MyTheme.primaryAccent, 0.1),
              borderColor: addOpacity(MyTheme.primaryAccent, 0.2)
            }
          ]}
        >
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
      borderWidth: 1,
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
      borderWidth: 1
    },
    createCardTitle: { marginBottom: Spacing.xs },
    createCardSubtitle: { fontSize: 12, color: theme.muted }
  });

export default CreateCommunityCard;
