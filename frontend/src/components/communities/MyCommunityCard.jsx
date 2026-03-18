import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";

const MyCommunityCard = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <View style={[styles.communityCard, { borderColor: "transparent" }]}>
        <Skeleton colorMode="dark" width={48} height={48} radius={Spacing.borderRadius.md} />
        <View style={{ height: Spacing.md }} />
        <Skeleton colorMode="dark" width={80} height={14} />
        <View style={{ height: Spacing.xs }} />
        <Skeleton colorMode="dark" width={60} height={10} />
      </View>
    );
  }

  return (
    <View style={styles.communityCard}>
      <View style={[styles.cardIconBadge, { backgroundColor: item.color }]}>
        <MaterialIcons name={item.icon} size={24} color="#fff" />
      </View>
      <AppText bold style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </AppText>
      <AppText type="caption">{item.members}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  communityCard: {
    width: 140,
    backgroundColor: MyTheme.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: Spacing.md,
    padding: Spacing.md,
    marginRight: Spacing.md
  },
  cardIconBadge: {
    width: 48,
    height: 48,
    borderRadius: Spacing.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md
  },
  cardTitle: { marginBottom: Spacing.xs }
});

export default MyCommunityCard;
