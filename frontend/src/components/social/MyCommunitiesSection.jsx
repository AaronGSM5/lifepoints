import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import HorizontalRail, { RAIL_TILE_WIDTH } from "@/components/ui/HorizontalRail";

import MyCommunityCard from "./MyCommunityCard";

const SKELETON_DATA = [1, 2, 3];

const MyCommunitiesSection = memo(({ data, isLoading, onPress }) => {
  const { t } = useTranslation("community");

  const renderItem = useCallback(
    ({ item }) => (
      <MyCommunityCard isLoading={isLoading} item={item} onPress={isLoading ? undefined : () => onPress(item)} />
    ),
    [isLoading, onPress]
  );

  if (!isLoading && !data?.length) return null;

  return (
    <HorizontalRail
      title={t("My Communities")}
      isLoading={isLoading}
      data={isLoading ? SKELETON_DATA : data}
      itemWidth={RAIL_TILE_WIDTH}
      keyExtractor={(item, index) => (isLoading ? `skel-${index}` : String(item._id || item.id))}
      renderItem={renderItem}
    />
  );
});
MyCommunitiesSection.displayName = "MyCommunitiesSection";

export default MyCommunitiesSection;
