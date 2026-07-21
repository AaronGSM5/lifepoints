import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { questCatalog } from "@/constants/QuestCatalog";
import { tasksCatalog } from "@/constants/TasksCatalog";
import { recommendedTasks } from "@/mocks/FeaturedTasks";
import { capitalize } from "@/utils/helpers";

export const useTasks = () => {
  const { t } = useTranslation("tasks");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [quests] = useState(questCatalog);

  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = useCallback(async () => {
    // setIsLoading(true);
    // Simulierter API Call
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  const refreshTasks = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(tasksCatalog.map((c) => c.category))];

    return [
      { id: "all", label: t("categories.all", "Alle") },
      ...uniqueCategories.map((c) => ({
        id: c,
        label: t(`categories.${c}`, capitalize(c))
      }))
    ];
  }, [t]);

  const filteredTasks = useMemo(() => {
    let result = tasksCatalog;

    if (activeCat !== "all") {
      result = result.filter((c) => c.category === activeCat);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return result;
  }, [activeCat, searchQuery]);

  return {
    tasks: filteredTasks,
    quests,
    recommendedTasks,
    categories,
    activeCat,
    setActiveCat,
    searchQuery,
    setSearchQuery,
    isLoading,
    isRefreshing,
    refreshTasks
  };
};
