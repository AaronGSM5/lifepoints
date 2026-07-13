import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/Spacing";
import { extractId } from "@/utils/helpers";

import MyCommunityCard from "./MyCommunityCard";
import SectionHeader from "../ui/SectionHeader";

const SKELETON_DATA = [1, 2, 3];

const MyCommunitiesSection = memo(({ data, isLoading, onPress }) => {
  const { t } = useTranslation("community");

  const renderItem = useCallback(
    ({ item }) => (
      <MyCommunityCard isLoading={isLoading} item={item} onPress={isLoading ? undefined : () => onPress(item)} />
    ),
    [isLoading, onPress]
  );

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <View style={styles.myCommunitiesSection}>
      <View style={styles.paddedContent}>
        <SectionHeader title={t("My Communities")} isLoading={isLoading} />
      </View>
      <FlatList
        horizontal
        data={isLoading ? SKELETON_DATA : data}
        keyExtractor={(item, index) => (isLoading ? `skel-${index}` : extractId(item))}
        renderItem={renderItem}
        contentContainerStyle={styles.horizontalScrollContentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});
MyCommunitiesSection.displayName = "MyCommunitiesSection";

const styles = StyleSheet.create({
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
  }
});

export default MyCommunitiesSection;
