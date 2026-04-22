import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper, { useFloatingNavbarPadding } from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import SectionHeader from "@/components/ui/SectionHeader";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import { useCommunities } from "@/hooks/useCommunities";
import EventHero from "@/components/home/EventHero";
import { router } from "expo-router";
import CreateCommunityForm from "@/components/forms/community/CreateCommunityForm";
import HorizontalSectionList from "@/components/communities/HorizontalSectionList";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  const { myCommunities, recommended, fetchCommunitiesForCategory, fetchMoreSections, isLoading } = useCommunities();
  const bottomPadding = useFloatingNavbarPadding();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const [dynamicSections, setDynamicSections] = useState([]);
  const [verticalPage, setVerticalPage] = useState(1);
  const [isMoreSectionsLoading, setIsMoreSectionsLoading] = useState(false);
  const [allSectionsLoaded, setAllSectionsLoaded] = useState(false);

  const handleCreateCommunity = (data) => {
    console.log("Community wird erstellt:", data);
  };

  const loadMoreSections = useCallback(async () => {
    if (isMoreSectionsLoading || allSectionsLoaded || isLoading) return;

    setIsMoreSectionsLoading(true);
    const nextPage = verticalPage + 1;
    console.log(`Screen: Lade weitere vertikale Sektionen, Seite ${nextPage}`);

    try {
      const newSections = await fetchMoreSections(nextPage);

      if (newSections && newSections.length > 0) {
        setDynamicSections((prev) => [...prev, ...newSections]);
        setVerticalPage(nextPage);
      } else {
        setAllSectionsLoaded(true);
      }
    } catch (error) {
      console.error("Error loading more vertical sections", error);
    } finally {
      setIsMoreSectionsLoading(false);
    }
  }, [verticalPage, isMoreSectionsLoading, allSectionsLoaded, isLoading, fetchMoreSections]);

  const listData = useMemo(() => {
    const topElements = [
      { id: "hero", type: "hero" },
      { id: "search", type: "search" },
      { id: "my_communities", type: "my_communities" }
    ];

    const staticSections = [
      { id: "recommended", categoryKey: "recommended_you", title: "Recommended for you", data: recommended },
      { id: "lifestyle", categoryKey: "lifestyle_food", title: "Lifestyle & Food", data: recommended },
      { id: "trending", categoryKey: "trending_now", title: "Trending Right Now", data: recommended }
    ].map((section) => ({ ...section, type: "section" }));

    const loadedSections = dynamicSections.map((section) => ({ ...section, type: "section" }));

    return [...topElements, ...staticSections, ...loadedSections];
  }, [recommended, dynamicSections]);

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "hero":
          return (
            <View style={[styles.paddedContent, { paddingTop: Spacing.md }]}>
              <EventHero
                imageSource={require("../../../public/assets/createCommunityBanner.png")}
                isLoading={isLoading}
                onPress={() => setIsCreateModalVisible(true)}
              />
            </View>
          );

        case "search":
          return (
            <View style={[styles.paddedContent, styles.stickySearchWrapper]}>
              <Pressable onPress={() => router.push("/search")}>
                <View pointerEvents="none">
                  <AppInput icon="search" placeholder="Search..." bottomMargin={false} editable={false} blur />
                </View>
              </Pressable>
            </View>
          );

        case "my_communities":
          if (!myCommunities?.length && !isLoading) return null;
          return (
            <View style={styles.myCommunitiesSection}>
              <View style={styles.paddedContent}>
                <SectionHeader
                  title="My Communities"
                  rightLabel="See all"
                  onRightPress={() => console.log("mockClickReaction xD")}
                />
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContentContainer}
              >
                {isLoading
                  ? SKELETON_DATA.map((i) => <MyCommunityCard key={`skeleton-mycom-${i}`} isLoading={true} />)
                  : myCommunities.map((c, index) => (
                      <MyCommunityCard
                        key={c.id || index}
                        item={c}
                        onPress={() => router.push(`/mycommunity/${c.id}`)}
                      />
                    ))}
              </ScrollView>
            </View>
          );

        case "section":
          if (isLoading) {
            return (
              <View style={styles.sectionContainer}>
                <View style={styles.paddedContent}>
                  <SectionHeader title={item.title} isLoading={true} />
                </View>
                <FlatList
                  horizontal
                  data={SKELETON_DATA}
                  contentContainerStyle={styles.horizontalScrollContentContainer}
                  renderItem={() => <RecommendedCommunity isLoading={true} />}
                />
              </View>
            );
          }
          return (
            <HorizontalSectionList
              title={item.title}
              initialData={item.data}
              onLoadMore={(page) => fetchCommunitiesForCategory(item.categoryKey || item.id, page)}
              onPressItem={(community) => router.push(`/community/${community.id}`)}
            />
          );

        default:
          return null;
      }
    },
    [isLoading, myCommunities, fetchCommunitiesForCategory]
  );

  const renderMainFooter = () => {
    if (isMoreSectionsLoading) {
      return (
        <View style={styles.mainListLoader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
    if (allSectionsLoaded && listData.length > 5) {
      return (
        <View style={styles.endOfList}>
          <SectionHeader title="Thats all for now! 👋" center />
        </View>
      );
    }
    return <View style={{ height: Spacing.md }} />;
  };

  return (
    <ScreenWrapper scrollable={false} withPaddingSides={false} withPaddingTop={false}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        onEndReached={loadMoreSections}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderMainFooter}
        removeClippedSubviews={true}
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
    paddingTop: Spacing.sm,
    zIndex: 10
  },
  headerContainer: {
    paddingBottom: Spacing.md
  },
  myCommunitiesSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md
  },
  paddedContent: {
    paddingHorizontal: Spacing.md
  },
  horizontalScrollContentContainer: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md
  },
  sectionContainer: {
    marginBottom: Spacing.lg
  },
  mainListLoader: {
    paddingVertical: Spacing.xl,
    justifyContent: "center",
    alignItems: "center"
  },
  endOfList: {
    paddingVertical: Spacing.xl,
    alignItems: "center"
  }
});
