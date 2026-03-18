import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { MyTheme } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import AppText from "@/components/ui/AppText";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { Icon } from "@/components/icons/Icon";
import { mockRecommendedCommunities } from "@/constants/MockData";
import SectionHeader from "@/components/ui/SectionHeader";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import CreateCommunityCard from "@/components/communities/CreateCommunityCard";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  const renderHeader = useMemo(
    () => (
      <View>
        <AppInput icon="search" placeholder="Search communities..." value={searchQuery} onChangeText={setSearchQuery} />

        <View style={{ height: Spacing.md }} />
        <CreateCommunityCard />

        <SectionHeader title="My Communities" isLoading={isLoading} rightLabel="See all" onRightPress={() => {}} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {isLoading
            ? SKELETON_DATA.map((i) => <MyCommunityCard key={i} isLoading={isLoading} />)
            : myCommunities.map((item, index) => <MyCommunityCard key={index} item={item} isLoading={isLoading} />)}
        </ScrollView>

        <SectionHeader title="Recommended for you" isLoading={isLoading} />
      </View>
    ),
    [isLoading, searchQuery]
  );

  return (
    <ScreenWrapper scrollable={false}>
      <FlatList
        data={isLoading ? SKELETON_DATA : mockRecommendedCommunities}
        keyExtractor={(item, index) => (isLoading ? index.toString() : item.id?.toString() || index.toString())}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <RecommendedCommunity item={item} isLoading={isLoading} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.md }}
      />
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
  horizontalScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md
  }
});
