import { useState, useEffect, useCallback } from "react";
import { mockFeedItems } from "@/constants/MockData";

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState(mockFeedItems);

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
    isLoading,
    isRefreshing,
    refreshHomeData
  };
};
