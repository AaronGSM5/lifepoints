import { useState, useEffect, useCallback, useMemo } from "react";
import { rewardsCatalog } from "@/constants/RewardsCatalog";

const ITEMS_PER_PAGE = 6;

export const useShop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [rewards, setRewards] = useState(rewardsCatalog);
  const [activeCat, setActiveCat] = useState("all");
  const [page, setPage] = useState(1);

  const fetchShop = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const refreshShop = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setIsRefreshing(false);
    }, 1500);
  }, []);

  const fetchMore = useCallback(async () => {
    if (isFetchingMore || isLoading || isRefreshing) return;

    setIsFetchingMore(true);

    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }, 1000);
  }, [isFetchingMore, isLoading, isRefreshing]);

  useEffect(() => {
    setPage(1);
  }, [activeCat]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  const filteredRewards = useMemo(() => {
    return rewards
      .filter((c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase())
      .slice(0, page * ITEMS_PER_PAGE);
  }, [rewards, activeCat, page]);

  const hasMore = useMemo(() => {
    const totalFiltered = rewards.filter(
      (c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase()
    ).length;
    return filteredRewards.length < totalFiltered;
  }, [rewards, activeCat, filteredRewards]);

  const categories = useMemo(() => {
    const unique = [...new Set(rewards.map((c) => c.category))];
    return ["All", ...unique.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];
  }, [rewards]);

  return {
    rewards: filteredRewards,
    activeCat,
    setActiveCat,
    categories,
    isLoading,
    isRefreshing,
    refreshShop,
    fetchMore: hasMore ? fetchMore : () => {},
    isFetchingMore
  };
};
