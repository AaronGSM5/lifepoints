import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { useVerticalRails } from "@/api/communities/useVerticalRails";
import HorizontalSectionList from "@/components/communities/HorizontalSectionList";
import MyCommunitiesSection from "@/components/communities/MyCommunitiesSection";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import CreateCommunityForm from "@/components/forms/community/CreateCommunityForm";
import HeroCarousel from "@/components/home/HeroCarousel";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import AppInput from "@/components/ui/AppInput";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import useStore from "@/store/useStore";
import { capitalize, extractId } from "@/utils/helpers";

const SKELETON_DATA = [1, 2, 3];

const COMMUNITIES_HERO_DATA = [
  {
    id: "1",
    image: require("@/../public/assets/events/achtsamkeit2.png"),
    title: "Sommer Party",
    eventLink: "/event/123"
  },
  {
    id: "2",
    image: require("@/../public/assets/events/sportevent.png"),
    title: "Tech Meetup",
    eventLink: "/event/456"
  }
];

const ExploreTab = ({ scrollY }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const {
    data: railsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingRails
  } = useVerticalRails();

  const isLoading = isLoadingRails;

  const myCommunities = useStore((state) => state.myCommunities);

  const loadedSections = useMemo(() => {
    if (!railsData) return [];
    return railsData.pages
      .flatMap((page) => page.sections || [])
      .map((section) => ({
        id: section.category,
        title: capitalize(section.category),
        type: "section",
        categoryKey: section.category,
        data: section.items.map((item) => ({
          ...item,
          id: extractId(item)
        }))
      }));
  }, [railsData]);

  const listData = useMemo(() => {
    const topElements = [
      { id: "hero", type: "hero" },
      { id: "search", type: "search" },
      { id: "my_communities", type: "my_communities" }
    ];

    return [...topElements, ...loadedSections];
  }, [loadedSections]);

  const loadMoreSections = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleHeroPress = useCallback(() => setIsCreateModalVisible(true), []);
  const handleSearchPress = useCallback(() => router.push("/search"), []);
  const handleCommunityPress = useCallback((community) => router.push(`/community/${extractId(community)}`), []);
  const handleMyCommunityPress = useCallback((community) => router.push(`/mycommunity/${extractId(community)}`), []);

  const renderSkeletonItem = useCallback(() => <RecommendedCommunity isLoading={true} />, []);

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "hero":
          return (
            <View style={{ marginTop: Spacing.md + 44 + Spacing.md }}>
              <HeroCarousel data={COMMUNITIES_HERO_DATA} isLoading={isLoading} onPressItem={handleHeroPress} />
            </View>
          );

        case "search":
          return (
            <View style={styles.paddedContent}>
              <Pressable onPress={handleSearchPress}>
                <View pointerEvents="none">
                  <AppInput icon="search" placeholder={t("Search...")} bottomMargin={false} editable={false} blur />
                </View>
              </Pressable>
            </View>
          );

        case "my_communities":
          if (!myCommunities?.length && !isLoading) {
            return <View style={styles.emptyMyCommunities} />;
          }
          return <MyCommunitiesSection data={myCommunities} isLoading={isLoading} onPress={handleMyCommunityPress} />;

        case "section":
          const validSectionData = item.data?.filter(Boolean) || [];
          if (validSectionData.length === 0 && !isLoading) return null;
          if (isLoading) {
            return (
              <View style={styles.sectionContainer}>
                <View style={styles.paddedContent}>
                  <SectionHeader title={t(item.title)} isLoading={true} />
                </View>
                <FlatList
                  horizontal
                  data={SKELETON_DATA}
                  contentContainerStyle={styles.horizontalScrollContentContainer}
                  renderItem={renderSkeletonItem}
                  snapToInterval={260 + Spacing.md}
                  snapToAlignment="start"
                  decelerationRate="fast"
                />
              </View>
            );
          }
          return (
            <HorizontalSectionList
              title={t(item.title)}
              initialData={validSectionData}
              categoryKey={item.categoryKey}
              onPressItem={handleCommunityPress}
            />
          );

        default:
          return null;
      }
    },
    [
      isLoading,
      handleHeroPress,
      handleSearchPress,
      handleMyCommunityPress,
      handleCommunityPress,
      renderSkeletonItem,
      myCommunities,
      t,
      styles
    ]
  );

  const renderMainFooter = useCallback(() => {
    if (isFetchingNextPage) return <AppLoadingSpinner centered />;

    if (!hasNextPage && loadedSections.length > 0) {
      return (
        <View style={styles.endOfList}>
          <SectionHeader title={t("Thats all for now!")} center />
        </View>
      );
    }
    return <View style={styles.footerSpacer} />;
  }, [hasNextPage, isFetchingNextPage, loadedSections.length, styles, t]);

  return (
    <>
      <AnimatedScreenList
        scrollY={scrollY}
        data={listData}
        extraData={[myCommunities, isLoading]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadMoreSections}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderMainFooter}
        withTopPadding={false}
      />
      <CreateCommunityForm visible={isCreateModalVisible} onClose={() => setIsCreateModalVisible(false)} />
    </>
  );
};

const getStyles = () =>
  StyleSheet.create({
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
    endOfList: {
      paddingVertical: Spacing.xl,
      alignItems: "center"
    },
    emptyMyCommunities: {
      marginTop: Spacing.md,
      marginBottom: Spacing.md
    },
    footerSpacer: {
      height: Spacing.md
    }
  });

export default ExploreTab;
