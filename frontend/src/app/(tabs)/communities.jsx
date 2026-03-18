import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import { mockRecommendedCommunities } from "@/constants/MockData";
import SectionHeader from "@/components/ui/SectionHeader";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import CreateCommunityCard from "@/components/communities/CreateCommunityCard";
import { mockMyCommunities } from "@/constants/MockData";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const bottomPadding = useFloatingNavbarPadding();

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
            : mockMyCommunities.map((item, index) => <MyCommunityCard key={index} item={item} isLoading={isLoading} />)}
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
        contentContainerStyle={{ paddingBottom: bottomPadding }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  horizontalScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md
  }
});
