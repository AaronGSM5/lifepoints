import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppText from "@/components/ui/AppText";
import BaseCard from "@/components/ui/BaseCard";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { addOpacity } from "@/utils/colorHelpers";

const CreateCommunityCard = ({ onPress }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("community");

  return (
    <BaseCard style={styles.createCard} onPress={onPress} accessibilityLabel={t("Create community")}>
      <View style={[styles.iconCircle, { backgroundColor: addOpacity(MyTheme.primaryAccent, 0.16) }]}>
        <Icon name="add" color={MyTheme.primaryAccent} />
      </View>
      <AppText type="label" style={styles.label}>
        {t("Create community")}
      </AppText>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  createCard: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: Spacing.borderRadius.full,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    textAlign: "center"
  }
});

export default CreateCommunityCard;
