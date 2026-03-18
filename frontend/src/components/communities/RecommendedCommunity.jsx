import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";

const RecommendedCommunity = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.recommendedItem}>
        <Skeleton colorMode="dark" width={48} height={48} radius={Spacing.borderRadius.md} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton colorMode="dark" width="60%" height={16} />
          <Skeleton colorMode="dark" width="90%" height={12} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.recommendedItem}>
      <View style={[styles.iconBox, { backgroundColor: item.bgColor, borderColor: item.borderColor }]}>
        <MaterialIcons name={item.icon} size={28} color={item.iconColor} />
      </View>
      <View style={styles.recommendedTextContainer}>
        <AppText bold style={styles.recommendedTitle}>
          {item.title}
        </AppText>
        <AppText type="caption">{item.desc}</AppText>
      </View>
      <AppButton
        size="sm"
        icon={<Icon name="add" size={20} color={MyTheme.primaryAccent} />}
        iconPosition="center"
        bgColor={"rgba(47, 196, 146, 0.1)"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MyTheme.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.md
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Spacing.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  },
  recommendedTextContainer: { flex: 1 },
  recommendedTitle: { marginBottom: Spacing.xs }
});

export default RecommendedCommunity;
