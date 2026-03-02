import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { mockRecommendedCommunities } from "@/constants/MockData";

export default function CommunitiesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <ScreenWrapper scrollable>
      {/* Search Bar */}
      <AppInput icon="search" placeholder="Search communities..." value={searchQuery} onChangeText={setSearchQuery} />
      {/* Create Community Section */}
      <View style={styles.createCard}>
        <View style={styles.createCardLeft}>
          <View style={[styles.iconBox, { backgroundColor: "rgba(47, 196, 146, 0.1)" }]}>
            {/* Nutzt MyTheme.primaryAccent für das LifePoints-Grün */}
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

      {/* My Communities Section */}
      <View style={styles.sectionHeader}>
        <AppText type="title">My Communities</AppText>
        <AppButton variant="ghost" title={"See all"} size="sm" textStyle={{ color: MyTheme.primaryAccent }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {myCommunities.map((item, index) => (
          <View key={index} style={styles.communityCard}>
            <View style={[styles.cardIconBadge, { backgroundColor: item.color }]}>
              <MaterialIcons name={item.icon} size={24} color="#fff" />
            </View>
            <AppText bold style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </AppText>
            <AppText type="caption">{item.members}</AppText>
          </View>
        ))}
      </ScrollView>

      {/* Recommended Section */}
      <View style={[styles.sectionHeader, { marginTop: Spacing.md }]}>
        <AppText type="title">Recommended for you</AppText>
      </View>

      <View style={styles.recommendedList}>
        {mockRecommendedCommunities.map((item, index) => (
          <View key={index} style={styles.recommendedItem}>
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
              borderStyle={{ borderWidth: 1, borderColor: "rgba(47, 196, 146, 0.2)" }}
            />
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const myCommunities = [
  { title: "Early Risers", members: "1.2k Members", icon: "bolt", color: "#059669" },
  { title: "Code Runners", members: "850 Members", icon: "terminal", color: "#3b82f6" },
  { title: "Iron Will", members: "3.4k Members", icon: "fitness-center", color: "#ea580c" },
  { title: "Focus Flow", members: "2.1k Members", icon: "psychology", color: "#9333ea" }
];

const styles = StyleSheet.create({
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
    borderWidth: 1
  },
  createCardTitle: {
    marginBottom: Spacing.xs
  },
  createCardSubtitle: {
    fontSize: 12,
    color: MyTheme.muted
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md
  },
  horizontalScroll: {
    paddingBottom: Spacing.sm,
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg
  },
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
  cardTitle: {
    marginBottom: Spacing.xs
  },
  recommendedList: {
    gap: Spacing.md
  },
  recommendedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MyTheme.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md
  },
  recommendedTextContainer: {
    flex: 1
  },
  recommendedTitle: {
    marginBottom: Spacing.xs
  }
});
