import { useState, useEffect, useCallback } from "react";
import { mockFeedItems, mockQuests } from "@/constants/MockData";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState(mockFeedItems);
  const [quests, setQuests] = useState(mockQuests);

  const fetchHomeData = useCallback(async () => {
    setIsLoading(true);
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
