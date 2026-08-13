import { StyleSheet } from "react-native";

import { Icon } from "@/components/icons/Icon";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/hooks/useAppTheme";

import BaseCard from "../ui/BaseCard";

const CreateCommunityCard = ({ onPress }) => {
  const MyTheme = useAppTheme();

  return (
    <BaseCard style={styles.createCard}>
      <AppButton
        icon={<Icon name="add" color={MyTheme.background} />}
        iconPosition="center"
        size="sm"
        onPress={onPress}
      />
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  createCard: {
    width: 160,
    height: 140,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CreateCommunityCard;
