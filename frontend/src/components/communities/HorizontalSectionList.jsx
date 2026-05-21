import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { Spacing } from "@/constants/Spacing";
import SectionHeader from "@/components/ui/SectionHeader";
import RecommendedCommunity from "@/components/communities/RecommendedCommunity";
import { MyTheme } from "@/constants/Colors";

const HorizontalSectionList = ({ title, initialData, onLoadMore, onPressItem }) => {
  const [data, setData] = useState(initialData || []);
  const [page, setPage] = useState(1);
  const [localLoading, setLocalLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const CARD_WIDTH = 260;
  const SNAP_INTERVAL = CARD_WIDTH + Spacing.md;

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  const handleEndReached = async () => {
    if (localLoading || allLoaded || !onLoadMore) return;

    setLocalLoading(true);
    const nextPage = page + 1;
    console.log(`Loading page ${nextPage} for horizontal list: ${title}`);

    try {
      const newData = await onLoadMore(nextPage);
      if (newData && newData.length > 0) {
        setData((prev) => [...prev, ...newData]);
        setPage(nextPage);
      } else {
        setAllLoaded(true);
      }
    } catch (error) {
      console.error("Error loading more horizontal data", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const renderHorizontalItem = ({ item }) => (
    <View style={{ width: CARD_WIDTH, marginRight: Spacing.md }}>
      <RecommendedCommunity item={item} onPress={() => onPressItem(item)} />
    </View>
  );

  const renderFooter = () => {
    if (localLoading) {
      return (
        <View style={styles.horizontalLoader}>
          <ActivityIndicator size="small" color={MyTheme.primaryAccent} />
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
        data={data}
        renderItem={renderHorizontalItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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

const styles = StyleSheet.create({
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
