import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import SectionHeader from "@/components/ui/SectionHeader";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import CreateCommunityCard from "@/components/communities/CreateCommunityCard";
import { useCommunities } from "@/hooks/useCommunities";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  const { myCommunities, recommended, searchQuery, setSearchQuery, isLoading } = useCommunities();
  const bottomPadding = useFloatingNavbarPadding();

  const renderHeader = useMemo(
    () => (
      <View>
        <AppInput icon="search" placeholder="Search communities..." value={searchQuery} onChangeText={setSearchQuery} />

        <View style={{ height: Spacing.md }} />
        <CreateCommunityCard />

        <SectionHeader
          title="My Communities"
          isLoading={isLoading}
          rightLabel="See all"
          onRightPress={() => console.log("mockClickReaction xD")}
        />

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
        data={isLoading ? SKELETON_DATA : recommended}
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
