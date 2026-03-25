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
  };

  const sections = useMemo(
    () => [
      { id: "recommended", title: "Recommended for you", data: recommended },
      { id: "lifestyle", title: "Lifestyle & Food", data: recommended },
      { id: "trending", title: "Trending Right Now", data: recommended }
    ],
    [recommended]
  );

  const listData = useMemo(() => {
    const topElements = [
      { id: "hero", type: "hero" },
      { id: "search", type: "search" },
      { id: "my_communities", type: "my_communities" }
    ];

    if (isLoading) {
      return [...topElements, { id: "skeleton1", type: "skeleton" }, { id: "skeleton2", type: "skeleton" }];
    }

    return [...topElements, ...sections.map((section) => ({ ...section, type: "section" }))];
  }, [sections, isLoading]);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "hero":
        return (
          <View style={[styles.paddedContent, { paddingTop: Spacing.md }]}>
            <EventHero
              imageSource={require("../../../public/assets/creativeBanner.png")}
              isLoading={isLoading}
              onPress={() => setIsCreateModalVisible(true)}
            />
          </View>
        );

      case "search":
        return (
          <View style={[styles.paddedContent, styles.stickySearchWrapper]}>
            <AppInput
              icon="search"
              placeholder="Search communities..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              blur
            />
          </View>
        );

      case "my_communities":
        if (!myCommunities?.length && !isLoading) return null;
        return (
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
                : myCommunities.map((c, index) => (
                    <MyCommunityCard
                      key={index}
                      item={c}
                      isLoading={isLoading}
                      onPress={() => router.push(`/community/${c.id}`)}
                    />
                  ))}
            </ScrollView>
          </View>
        );

      case "section":
        return (
          <View style={styles.sectionContainer}>
            <View style={styles.paddedContent}>
              <SectionHeader title={item.title} isLoading={isLoading} />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}
              snapToInterval={260 + Spacing.md}
              decelerationRate="fast"
            >
              {item.data.map((community, index) => (
                <RecommendedCommunity
                  key={community.id || index}
                  item={community}
                  onPress={() => router.push(`/community/${community.id}`)}
                />
              ))}
            </ScrollView>
          </View>
        );

      case "skeleton":
        return (
          <View style={styles.sectionContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}
            >
              {SKELETON_DATA.map((i) => (
                <RecommendedCommunity key={i} isLoading={true} />
              ))}
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
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
  stickySearchWrapper: {
    paddingVertical: Spacing.sm,
    zIndex: 10
  },
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
