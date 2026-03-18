import { useState, useEffect, useCallback } from "react";
import { mockProfile, mockActivities, mockTrophies, mockTutorialSteps } from "@/constants/MockData";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Für den Übergang initialisieren wir mit MockData, damit deine UI nicht crasht.
  // Später beim echten Backend startest du mit null oder leeren Arrays [].
  const [data, setData] = useState({
    profile: mockProfile,
    activities: mockActivities,
    trophies: mockTrophies,
    tutorialSteps: mockTutorialSteps
  });

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    // Später: const response = await api.get('/profile'); setData(response.data);
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
    isLoading,
    isRefreshing,
    refreshProfile
  };
};
