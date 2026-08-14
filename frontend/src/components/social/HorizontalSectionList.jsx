import React, { memo, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useHorizontalRail } from "@/api/communities/useHorizontalRail";
import RecommendedCommunity from "@/components/social/RecommendedCommunity";
import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";
import { useAppTheme } from "@/hooks/useAppTheme";

import AppLoadingSpinner from "../ui/AppLoadingSpinner";

const CARD_WIDTH = 260;
const SNAP_INTERVAL = CARD_WIDTH + Spacing.md;

const HorizontalSectionList = memo(({ title, initialData, categoryKey, onPressItem }) => {
  const MyTheme = useAppTheme();
  const styles = useMemo(() => getStyles(MyTheme), [MyTheme]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useHorizontalRail(categoryKey);

  const flatData = useMemo(() => {
    if (data?.pages && data.pages.length > 0 && data.pages[0].data) {
      return data.pages.flatMap((page) => page.data || []);
    }
    return initialData || [];
  }, [data, initialData]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderHorizontalItem = useCallback(
    ({ item }) => (
      <View style={styles.cardWrapper}>
        <RecommendedCommunity item={item} onPress={() => onPressItem(item)} />
      </View>
    ),
    [styles.cardWrapper, onPressItem]
  );

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <AppLoadingSpinner centered />
        </View>
      );
    }
    return <View style={styles.footerSpacer} />;
  }, [isFetchingNextPage, styles.footerSpacer, styles.footerLoader]);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.paddedContent}>
        <SectionHeader title={title} />
      </View>
      <FlatList
        horizontal
        data={flatData}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item._id}
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
});
HorizontalSectionList.displayName = "HorizontalSectionList";

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
    cardWrapper: {
      width: CARD_WIDTH,
      marginRight: Spacing.md
    },
    footerLoader: {
      width: 100
    },
    footerSpacer: {
      width: Spacing.md
    }
  });

export default HorizontalSectionList;
