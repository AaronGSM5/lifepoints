import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import SectionHeader from "@/components/ui/SectionHeader";
import { Spacing } from "@/constants/Spacing";

// Zwei Standardbreiten für horizontale Karten in der ganzen App
export const RAIL_TILE_WIDTH = 160;
export const RAIL_CARD_WIDTH = 260;

/**
 * Section-Header + horizontale Liste mit Snap, einheitlichem Padding (md) und Gap (md).
 * Weitere FlatList-Props (onEndReached, ListFooterComponent, ...) werden durchgereicht.
 */
const HorizontalRail = memo(
  ({
    title,
    headerProps,
    data,
    renderItem,
    keyExtractor,
    itemWidth = RAIL_CARD_WIDTH,
    isLoading,
    style,
    ...listProps
  }) => {
    const renderWrappedItem = useCallback(
      (info) => <View style={{ width: itemWidth }}>{renderItem(info)}</View>,
      [itemWidth, renderItem]
    );

    return (
      <View style={[styles.section, style]}>
        {title && <SectionHeader title={title} isLoading={isLoading} style={styles.header} {...headerProps} />}
        <FlatList
          horizontal
          data={data}
          renderItem={renderWrappedItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content}
          snapToInterval={itemWidth + Spacing.md}
          snapToAlignment="start"
          decelerationRate="fast"
          {...listProps}
        />
      </View>
    );
  }
);
HorizontalRail.displayName = "HorizontalRail";

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.lg
  },
  header: {
    paddingHorizontal: Spacing.md
  },
  content: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md
  }
});

export default HorizontalRail;
