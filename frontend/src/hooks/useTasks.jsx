import { useState, useEffect, useCallback, useMemo } from "react";
import useStore from "@/store/useStore";

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tasks = useStore((state) => state.tasks);
  const recommendedTasks = useStore((state) => state.recommendedTasks);

  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
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
    const unique = [...new Set(tasks.map((c) => c.category))];
    return ["All", ...unique.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeCat.toLowerCase() !== "all") {
      result = result.filter((c) => c.category === activeCat.toLowerCase());
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return result;
  }, [tasks, activeCat, searchQuery]);

  return {
    tasks: filteredTasks,
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
