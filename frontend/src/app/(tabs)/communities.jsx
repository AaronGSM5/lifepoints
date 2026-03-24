import React, { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import SectionHeader from "@/components/ui/SectionHeader";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
// import CreateCommunityCard from "@/components/communities/CreateCommunityCard";
import { useCommunities } from "@/hooks/useCommunities";
import EventHero from "@/components/home/EventHero";
import { router } from "expo-router";
import CreateCommunityForm from "@/components/communities/CreateCommunityForm";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  const { myCommunities, recommended, searchQuery, setSearchQuery, isLoading } = useCommunities();
  const bottomPadding = useFloatingNavbarPadding();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleCreateCommunity = (data) => {
    console.log("Community wird erstellt:", data);
    // Hier später dein API-Call
  };

  const sections = useMemo(
    () => [
      { id: "recommended", title: "Recommended for you", data: recommended },
      { id: "lifestyle", title: "Lifestyle & Food", data: recommended },
      { id: "trending", title: "Trending Right Now", data: recommended }
    ],
    [recommended]
  );

  const renderHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.paddedContent}>
          <EventHero
            imageSource={require("../../../public/assets/creativeBanner.png")}
            isLoading={isLoading}
            onPress={() => setIsCreateModalVisible(true)}
          />
        </View>
        <View style={[styles.paddedContent, styles.searchWrapper]}>
          <AppInput
            icon="search"
            placeholder="Search communities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {(myCommunities?.length > 0 || isLoading) && (
          <View style={styles.myCommunitiesSection}>
            <View style={styles.paddedContent}>
              <SectionHeader
                title="My Communities"
                isLoading={isLoading}
                rightLabel="See all"
                onRightPress={() => console.log("mockClickReaction xD")}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}
            >
              {isLoading
                ? SKELETON_DATA.map((i) => <MyCommunityCard key={i} isLoading={isLoading} />)
                : myCommunities.map((item, index) => (
                    <MyCommunityCard
                      key={index}
                      item={item}
                      isLoading={isLoading}
                      onPress={() => router.push(`/community/${item.id}`)}
                    />
                  ))}
            </ScrollView>
          </View>
        )}
      </View>
    ),
    [isLoading, searchQuery, myCommunities]
  );

  const renderSection = ({ item: section }) => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.paddedContent}>
          <SectionHeader title={section.title} isLoading={isLoading} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
          snapToInterval={260 + Spacing.md}
          decelerationRate="fast"
        >
          {isLoading
            ? SKELETON_DATA.map((i) => <RecommendedCommunity key={i} isLoading={true} />)
            : section.data.map((community, index) => (
                <RecommendedCommunity
                  key={community.id || index}
                  item={community}
                  onPress={() => router.push(`/community/${community.id}`)}
                />
              ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false}>
      <FlatList
        data={isLoading ? [{ id: "skeleton1" }, { id: "skeleton2" }] : sections}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
      />
      <CreateCommunityForm
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={handleCreateCommunity}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: Spacing.md
  },
  myCommunitiesSection: {
    marginBottom: Spacing.md
  },
  sectionContainer: {
    marginBottom: Spacing.lg + 8
  },
  paddedContent: {
    paddingHorizontal: Spacing.md
  },
  scrollContentContainer: {
    paddingHorizontal: Spacing.md
  }
});
