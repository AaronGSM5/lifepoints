import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { router } from "expo-router";

// import { useCommunities } from "@/api/communities/useCommunities";
import { useVerticalRails } from "@/api/communities/useVerticalRails";
import HorizontalSectionList from "@/components/communities/HorizontalSectionList";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import CreateCommunityForm from "@/components/forms/community/CreateCommunityForm";
import EventHero from "@/components/home/EventHero";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { capitalize, extractId } from "@/utils/helpers";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  // const { myCommunities, createCommunity } = useCommunities();
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { t } = useTranslation("community");
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const {
    data: railsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingRails
  } = useVerticalRails();

  const isLoading = isLoadingRails;

  const myCommunities = useMemo(() => [], []);

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

  // const handleCreateCommunity = (data) => {
  //   createCommunity(data);
  // };

  const listData = useMemo(() => {
    const topElements = [
      { id: "hero", type: "hero" },
      { id: "search", type: "search" },
      { id: "my_communities", type: "my_communities" }
    ];

    return [...topElements, ...loadedSections];
  }, [loadedSections]);

  const loadMoreSections = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "hero":
          return (
            <View style={styles.paddedContent}>
              <EventHero
                imageSource={require("../../../public/assets/createCommunityBanner.png")}
                isLoading={isLoading}
                onPress={() => setIsCreateModalVisible(true)}
              />
            </View>
          );

        case "search":
          return (
            <View style={styles.paddedContent}>
              <Pressable onPress={() => router.push("/search")}>
                <View pointerEvents="none">
                  <AppInput icon="search" placeholder={t("Search...")} bottomMargin={false} editable={false} blur />
                </View>
              </Pressable>
            </View>
          );

        case "my_communities":
          if (!myCommunities?.length && !isLoading)
            return <View style={{ marginTop: Spacing.md, marginBottom: Spacing.md }}></View>;
          return (
            <View style={styles.myCommunitiesSection}>
              <View style={styles.paddedContent}>
                <SectionHeader
                  title={t("My Communities")}
                  rightLabel={t("See all")}
                  rightLabelColor={MyTheme.primaryAccent}
                  onRightPress={() => console.log("mockClickReaction xD")}
                  isLoading={isLoading}
                />
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContentContainer}
                snapToInterval={160 + Spacing.md}
                snapToAlignment="start"
                decelerationRate="fast"
              >
                {isLoading
                  ? SKELETON_DATA.map((i) => <MyCommunityCard key={`skeleton-mycom-${i}`} isLoading={true} />)
                  : myCommunities
                      .filter((c) => c !== null && c !== undefined)
                      .map((c, index) => (
                        <MyCommunityCard
                          key={extractId(c) || index}
                          item={{ ...c, id: extractId(c) }}
                          onPress={() => router.push(`/mycommunity/${extractId(c)}`)}
                        />
                      ))}
              </ScrollView>
            </View>
          );

        case "section":
          const validSectionData = item.data?.filter((c) => c !== null) || [];
          if (validSectionData.length === 0 && !isLoading) return null;
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
                  snapToInterval={260 + Spacing.md}
                  snapToAlignment="start"
                  decelerationRate="fast"
                />
              </View>
            );
          }
          return (
            <HorizontalSectionList
              title={item.title}
              initialData={validSectionData}
              categoryKey={item.categoryKey}
              onPressItem={(community) => router.push(`/community/${extractId(community)}`)}
            />
          );

        default:
          return null;
      }
    },
    [isLoading, myCommunities, MyTheme, t, styles]
  );

  const renderMainFooter = () => {
    if (isFetchingNextPage) return <AppLoadingSpinner centered />;

    if (!hasNextPage && loadedSections.length > 0) {
      return (
        <View style={styles.endOfList}>
          <SectionHeader title={t("Thats all for now!")} center />
        </View>
      );
    }
    return <View style={{ height: Spacing.md }} />;
  };

  return (
    <ScreenWrapper scrollY={scrollY} scrollable={false} withPaddingSides={false} withPaddingTop={false}>
      <AnimatedScreenList
        scrollY={scrollY}
        data={listData}
        extraData={[myCommunities, isLoading]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadMoreSections}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderMainFooter}
      />
      <CreateCommunityForm
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        // onCreate={handleCreateCommunity}
      />
    </ScreenWrapper>
  );
}

const getStyles = () =>
  StyleSheet.create({
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
    endOfList: {
      paddingVertical: Spacing.xl,
      alignItems: "center"
    }
  });
