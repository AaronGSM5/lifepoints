import { useState, useEffect, useCallback } from "react";
import { trophiesCatalog } from "@/constants/TrophiesCatalog";
import { onboardingGuideSteps } from "@/constants/OnboardingGuideSteps";
import { mockCustomizables } from "@/mocks/Customizables";
import useStore from "@/store/useStore";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const profile = useStore((state) => state.profile);
  const [data, setData] = useState({
    trophies: trophiesCatalog,
    tutorialSteps: onboardingGuideSteps,
    customizables: [...mockCustomizables.frames, ...mockCustomizables.badges]
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
