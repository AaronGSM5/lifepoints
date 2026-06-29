import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Pressable, ActivityIndicator, Animated } from "react-native";
import { Spacing } from "@/constants/Spacing";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppInput from "@/components/ui/AppInput";
import SectionHeader from "@/components/ui/SectionHeader";
import MyCommunityCard from "@/components/communities/MyCommunityCard";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import { useCommunities } from "@/hooks/useCommunities";
import EventHero from "@/components/home/EventHero";
import { router } from "expo-router";
import CreateCommunityForm from "@/components/forms/community/CreateCommunityForm";
import HorizontalSectionList from "@/components/communities/HorizontalSectionList";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";
import AnimatedScreenList from "@/components/layout/AnimatedScreenList";
import { useVerticalCommunityRails } from "@/hooks/useCommunities";

const SKELETON_DATA = [1, 2, 3];

export default function CommunitiesScreen() {
  const { myCommunities, createCommunity } = useCommunities();
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { t } = useTranslation("community");
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const {
    data: railsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingRails
  } = useVerticalCommunityRails();

  const isLoading = isLoadingRails;

  const loadedSections = useMemo(() => {
    if (!railsData) return [];
    // Geht durch alle geladenen Seiten und sammelt die "sections" Arrays ein
    return railsData.pages
      .flatMap((page) => page.sections || [])
      .map((section) => ({
        id: section.category, // Backend liefert "category" als Namen
        title: section.category.charAt(0).toUpperCase() + section.category.slice(1),
        type: "section",
        categoryKey: section.category,
        data: section.items // Die initialen Cards aus dem Backend
      }));
  }, [railsData]);

  const handleCreateCommunity = (data) => {
    createCommunity(data);
  };

  const listData = useMemo(() => {
    const topElements = [
      { id: "hero", type: "hero" },
      { id: "search", type: "search" },
      { id: "my_communities", type: "my_communities" }
    ];

    return [...topElements, ...loadedSections];
  }, [loadedSections, myCommunities, isLoading]);

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
              >
                {isLoading
                  ? SKELETON_DATA.map((i) => <MyCommunityCard key={`skeleton-mycom-${i}`} isLoading={true} />)
                  : myCommunities
                      .filter((c) => c !== null && c !== undefined)
                      .map((c, index) => (
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
                />
              </View>
            );
          }
          return (
            <HorizontalSectionList
              title={item.title}
              initialData={validSectionData}
              onLoadMore={() => console.log("Lade mehr horizontal für", item.categoryKey)}
              onPressItem={(community) => router.push(`/community/${community.id}`)}
            />
          );

        default:
          return null;
      }
    },
    [isLoading, myCommunities, isCreateModalVisible, MyTheme, t]
  );

  const renderMainFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.mainListLoader}>
          <ActivityIndicator size="large" color={MyTheme.primaryAccent} />
        </View>
      );
    }
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
        onCreate={handleCreateCommunity}
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
    mainListLoader: {
      paddingVertical: Spacing.md,
      justifyContent: "center",
      alignItems: "center"
    },
    endOfList: {
      paddingVertical: Spacing.xl,
      alignItems: "center"
    }
  });
