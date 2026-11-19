import { useCallback, useEffect, useState } from "react";

import { mockFeedItems } from "@/mocks/FeedData";
import useStore from "@/store/useStore";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const feedItems = useStore((state) => state.feedItems);
  const setFeedItems = useStore((state) => state.setFeedItems);

  useEffect(() => {
    if (!feedItems?.length) {
      setIsLoading(true)
      setFeedItems(mockFeedItems);
      setIsLoading(false)
    }
  }, [feedItems, setFeedItems]);

  const refreshHomeData = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setFeedItems(mockFeedItems);
      setIsRefreshing(false);
    }, 1000);
  }, [setFeedItems]);

  return {
    feedItems: feedItems.length > 0 ? feedItems : mockFeedItems,
    isLoading,
    isRefreshing,
    refreshHomeData
  };
};
