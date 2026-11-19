import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { router } from "expo-router";

import { useVerticalRails } from "@/api/communities/useVerticalRails";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import HorizontalSectionList from "@/components/social/HorizontalSectionList";
import MyCommunitiesSection from "@/components/social/MyCommunitiesSection";
import RecommendedCommunity from "@/components/social/RecommendedCommunity";
import AppInput from "@/components/ui/AppInput";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import EmptyView from "@/components/ui/EmptyView";
import EventCard from "@/components/ui/EventCard";
import HorizontalRail, { RAIL_CARD_WIDTH } from "@/components/ui/HorizontalRail";
import { SEGMENT_OFFSET } from "@/components/ui/NavigationRow";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { COMMUNITIES_HERO_DATA } from "@/mocks/HeroData";
import useStore from "@/store/useStore";
import { capitalize } from "@/utils/textHelpers";

const SKELETON_DATA = [1, 2, 3];

const ExploreTab = ({ scrollY }) => {
  const MyTheme = useAppTheme();
  const { t } = useTranslation("community");

  const {
    data: railsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useVerticalRails();

  const myCommunities = useStore((state) => state.myCommunities);
  const loadedSections = useMemo(() => {
    if (!railsData) return [];
    return railsData.pages
      .flatMap((page) => page.sections || [])
      .map((section) => ({
        id: section.category,
        title: t(section.category, capitalize(section.category)),
        type: "section",
        categoryKey: section.category,
        data: section.items.map((item) => ({
          ...item,
          id: item._id
        }))
      }));
  }, [railsData, t]);

  const listData = useMemo(() => {
    const topElements = [
      { id: "event", type: "event" },
      { id: "search", type: "search" },
      { id: "my_communities", type: "my_communities" }
    ];

    if (isError) return [...topElements, { id: "error", type: "error" }];
    if (isLoading) return [...topElements, { id: "skeleton", type: "skeleton" }];
    return [...topElements, ...loadedSections];
  }, [loadedSections, isError, isLoading]);

  const loadMoreSections = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSearchPress = useCallback(() => router.push("/search"), []);
  const handleCommunityPress = useCallback((community) => router.push(`/community/${community._id}`), []);
  const handleMyCommunityPress = useCallback(
    (community) => router.push(`/mycommunity/${community._id || community.id}`),
    []
  );

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "event":
          return (
            <View style={[styles.paddedContent, styles.topOffset]}>
              <EventCard event={COMMUNITIES_HERO_DATA[0]} label={t("common:Event")} />
            </View>
          );

        case "search":
          return (
            <View style={[styles.paddedContent, styles.searchSpacing]}>
              <Pressable onPress={handleSearchPress} accessibilityRole="search" accessibilityLabel={t("Search...")}>
                <View pointerEvents="none">
                  <AppInput icon="search" placeholder={t("Search...")} bottomMargin={false} editable={false} blur />
                </View>
              </Pressable>
            </View>
          );

        case "my_communities":
          if (!myCommunities?.length && !isLoading) {
            return (
              <View style={styles.paddedContent}>
                <SectionHeader title={t("My Communities")} />
                <EmptyView
                  icon="globe"
                  iconSize={24}
                  iconColor={MyTheme.primaryAccent}
                  title={t("Find your first community")}
                  description={t("Browse the topics below and join a group that motivates you.")}
                  containerStyle={styles.compactEmpty}
                />
              </View>
            );
          }
          return <MyCommunitiesSection data={myCommunities} isLoading={isLoading} onPress={handleMyCommunityPress} />;

        case "error":
          return (
            <View style={styles.paddedContent}>
              <EmptyView
                icon="infoCircle"
                iconColor={MyTheme.warning}
                title={t("common:Could not load content")}
                description={t("common:Please check your internet connection and try again.")}
                actionTitle={t("common:Try again")}
                onAction={refetch}
              />
            </View>
          );

        case "skeleton":
          return (
            <HorizontalRail
              title=" "
              isLoading
              data={SKELETON_DATA}
              itemWidth={RAIL_CARD_WIDTH}
              keyExtractor={(entry) => `skeleton-${entry}`}
              renderItem={() => <RecommendedCommunity isLoading />}
            />
          );

        case "section": {
          const validSectionData = item.data?.filter(Boolean) || [];
          if (!validSectionData.length) return null;
          return (
            <HorizontalSectionList
              title={item.title}
              initialData={validSectionData}
              categoryKey={item.categoryKey}
              onPressItem={handleCommunityPress}
            />
          );
        }

        default:
          return null;
      }
    },
    [t, handleSearchPress, myCommunities, isLoading, MyTheme, handleMyCommunityPress, refetch, handleCommunityPress]
  );

  const renderMainFooter = useCallback(() => {
    if (isFetchingNextPage) return <AppLoadingSpinner centered />;

    if (!hasNextPage && loadedSections.length > 0) {
      return (
        <View style={styles.endOfList}>
          <SectionHeader title={t("Thats all for now!")} center textStyle={{ color: MyTheme.muted }} />
        </View>
      );
    }
    return <View style={styles.footerSpacer} />;
  }, [hasNextPage, isFetchingNextPage, loadedSections.length, t, MyTheme.muted]);

  return (
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
  );
};

const styles = StyleSheet.create({
  paddedContent: {
    paddingHorizontal: Spacing.md
  },
  topOffset: {
    marginTop: SEGMENT_OFFSET
  },
  searchSpacing: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg
  },
  compactEmpty: {
    minHeight: 0,
    paddingVertical: Spacing.md
  },
  endOfList: {
    paddingVertical: Spacing.xl,
    alignItems: "center"
  },
  footerSpacer: {
    height: Spacing.md
  }
});

export default ExploreTab;
