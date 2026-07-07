import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { rewardsCatalog } from "@/constants/RewardsCatalog";
import { capitalize } from "@/utils/helpers";

const ITEMS_PER_PAGE = 6;

export const useShop = () => {
  const { t } = useTranslation("shop");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [rewards] = useState(rewardsCatalog);
  const [activeCat, setActiveCat] = useState("all");
  const [page, setPage] = useState(1);

  const fetchShop = useCallback(async () => {
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

  const handleCategoryChange = useCallback((newCat) => {
    setActiveCat(newCat);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(rewards.map((c) => c.category))];
    return [
      { id: "all", label: t("categories.all", "Alle") },
      ...uniqueCategories.map((c) => ({
        id: c,
        label: t(`categories.${c}`, capitalize(c))
      }))
    ];
  }, [rewards, t]);

  const filteredRewards = useMemo(() => {
    return rewards.filter((c) => activeCat === "all" || c.category === activeCat).slice(0, page * ITEMS_PER_PAGE);
  }, [rewards, activeCat, page]);

  const hasMore = useMemo(() => {
    const totalFiltered = rewards.filter((c) => activeCat === "all" || c.category === activeCat).length;
    return filteredRewards.length < totalFiltered;
  }, [rewards, activeCat, filteredRewards]);

  return {
    rewards: filteredRewards,
    activeCat,
    setActiveCat: handleCategoryChange,
    categories,
    isLoading,
    isRefreshing,
    refreshShop,
    fetchMore: hasMore ? fetchMore : () => {},
    isFetchingMore
  };
};
