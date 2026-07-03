import { useCallback, useEffect, useState } from "react";

import { questCatalog } from "@/constants/QuestCatalog";
import { feedItems as mockFeedItems } from "@/mocks/FeedData";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems] = useState(mockFeedItems);
  const [quests] = useState(questCatalog);

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
    quests,
    isLoading,
    isRefreshing,
    refreshHomeData
  };
};
