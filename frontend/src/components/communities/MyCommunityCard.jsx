import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import BaseCard from "../ui/BaseCard";

const MyCommunityCard = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <BaseCard style={styles.communityCard}>
        <Skeleton colorMode="dark" width={48} height={48} radius={Spacing.borderRadius.md} />
        <View style={{ height: Spacing.md }} />
        <Skeleton colorMode="dark" width={80} height={14} />
        <View style={{ height: Spacing.xs }} />
        <Skeleton colorMode="dark" width={60} height={10} />
      </BaseCard>
    );
  }

  return (
    <BaseCard style={styles.communityCard}>
      <View style={[styles.cardIconBadge, { backgroundColor: item.color, shadowColor: item.color }]}>
        <MaterialIcons name={item.icon} size={28} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <AppText bold style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText type="caption">{item.members}</AppText>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  communityCard: {
    width: 150,
    marginRight: Spacing.md
  },
  cardIconBadge: {
    width: 60,
    height: 60,
    borderRadius: Spacing.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  textContainer: {
    gap: 2
  },
  cardTitle: {
    fontSize: 15
  }
});

export default MyCommunityCard;
