import { useState, useEffect, useCallback } from "react";
import { mockTrophies, mockTutorialSteps } from "@/constants/MockData";
import useStore from "@/store/useStore";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const profile = useStore((state) => state.profile);
  const [data, setData] = useState({
    trophies: mockTrophies,
    tutorialSteps: mockTutorialSteps
  });

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const refreshProfile = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    ...data,
    profile,
    isLoading,
    isRefreshing,
    refreshProfile
  };
};
