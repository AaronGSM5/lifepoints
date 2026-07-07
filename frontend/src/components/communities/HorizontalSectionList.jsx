import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useHorizontalRail } from "@/api/communities/useHorizontalRail";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";
import { extractId } from "@/utils/helpers";

import AppLoadingSpinner from "../ui/AppLoadingSpinner";

const HorizontalSectionList = ({ title, initialData, categoryKey, onPressItem }) => {
  const MyTheme = useAppTheme();
  const styles = getStyles(MyTheme);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useHorizontalRail(categoryKey);

  const flatData = useMemo(() => {
    if (data?.pages && data.pages.length > 0 && data.pages[0].data) {
      return data.pages.flatMap((page) => page.data || []);
    }
    return initialData || [];
  }, [data, initialData]);

  const CARD_WIDTH = 260;
  const SNAP_INTERVAL = CARD_WIDTH + Spacing.md;

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderHorizontalItem = ({ item }) => (
    <View style={{ width: CARD_WIDTH, marginRight: Spacing.md }}>
      <RecommendedCommunity item={item} onPress={() => onPressItem(item)} />
    </View>
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.horizontalLoader}>
          <AppLoadingSpinner />
        </View>
      );
    }
    return <View style={{ width: Spacing.md }} />;
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.paddedContent}>
        <SectionHeader title={title} />
      </View>
      <FlatList
        horizontal
        data={flatData}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => extractId(item)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContentContainer}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    sectionContainer: {
      marginBottom: Spacing.lg
    },
    paddedContent: {
      paddingHorizontal: Spacing.md
    },
    horizontalScrollContentContainer: {
      paddingLeft: Spacing.md,
      alignItems: "center"
    },
    horizontalLoader: {
      width: 100,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default HorizontalSectionList;
