import { useState, useEffect, useCallback, useMemo } from "react";
import { rewardsCatalog } from "@/constants/RewardsCatalog";

export const useShop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rewards, setRewards] = useState(rewardsCatalog);
  const [activeCat, setActiveCat] = useState("all");

  const fetchShop = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const refreshShop = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  }, []);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  const filteredRewards = useMemo(() => {
    return rewards.filter((c) => activeCat.toLowerCase() === "all" || c.category === activeCat.toLowerCase());
  }, [rewards, activeCat]);

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
    refreshShop
  };
};
