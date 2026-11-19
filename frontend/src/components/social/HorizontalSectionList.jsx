import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useHorizontalRail } from "@/api/communities/useHorizontalRail";
import RecommendedCommunity from "@/components/social/RecommendedCommunity";
import AppLoadingSpinner from "@/components/ui/AppLoadingSpinner";
import HorizontalRail, { RAIL_CARD_WIDTH } from "@/components/ui/HorizontalRail";

const HorizontalSectionList = memo(({ title, initialData, categoryKey, onPressItem }) => {
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
    ({ item }) => <RecommendedCommunity item={item} onPress={() => onPressItem(item)} />,
    [onPressItem]
  );

  const renderFooter = useCallback(
    () =>
      isFetchingNextPage ? (
        <View style={styles.footerLoader}>
          <AppLoadingSpinner centered />
        </View>
      ) : null,
    [isFetchingNextPage]
  );

  return (
    <HorizontalRail
      title={title}
      data={flatData}
      itemWidth={RAIL_CARD_WIDTH}
      renderItem={renderHorizontalItem}
      keyExtractor={(item) => item._id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      removeClippedSubviews
    />
  );
});
HorizontalSectionList.displayName = "HorizontalSectionList";

const styles = StyleSheet.create({
  footerLoader: {
    width: 100,
    justifyContent: "center"
  }
});

export default HorizontalSectionList;
