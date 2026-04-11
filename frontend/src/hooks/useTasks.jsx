import { useState, useEffect, useCallback, useMemo } from "react";
import { mockTasks, recommendedTasks as mockRecommended } from "@/constants/MockData";

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [recommendedTasks, setRecommendedTasks] = useState([]);

  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    // Simulierter API Call
    setTimeout(() => {
      setTasks(mockTasks);
      setRecommendedTasks(mockRecommended);
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

  // Kategorien dynamisch aus den Tasks generieren
  const categories = useMemo(() => {
    const unique = [...new Set(tasks.map((c) => c.category))];
    return ["All", ...unique.map((c) => c.charAt(0).toUpperCase() + c.slice(1))];
  }, [tasks]);

  // Tasks filtern nach Kategorie UND Suchbegriff
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
