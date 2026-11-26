import { useCallback, useEffect, useMemo, useState } from "react";

import { FEATURES } from "@/constants/FeatureFlags";
import { mockFeedItems } from "@/mocks/FeedData";
import useStore from "@/store/useStore";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const feedItems = useStore((state) => state.feedItems);
  const setFeedItems = useStore((state) => state.setFeedItems);
  const myPosts = useStore((state) => state.myPosts);

  useEffect(() => {
    if (!feedItems?.length) {
      setIsLoading(true);
      setFeedItems(mockFeedItems);
      setIsLoading(false);
    }
  }, [feedItems, setFeedItems]);

  const refreshHomeData = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setFeedItems(mockFeedItems);
      setIsRefreshing(false);
    }, 1000);
  }, [setFeedItems]);

  // MVP: eigene Posts zuerst, Video-Posts nur wenn aktiviert
  const visibleFeedItems = useMemo(() => {
    const baseItems = feedItems.length > 0 ? feedItems : mockFeedItems;
    return [...(myPosts || []), ...baseItems].filter((item) => FEATURES.videoPosts || item.type !== "video");
  }, [feedItems, myPosts]);

  return {
    feedItems: visibleFeedItems,
    isLoading,
    isRefreshing,
    refreshHomeData
  };
};
