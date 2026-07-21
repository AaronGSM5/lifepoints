import { useCallback, useEffect, useState } from "react";

import { feedItems as mockFeedItems } from "@/mocks/FeedData";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems] = useState(mockFeedItems);

  const fetchHomeData = useCallback(async () => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const refreshHomeData = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return {
    feedItems,
    isLoading,
    isRefreshing,
    refreshHomeData
  };
};
