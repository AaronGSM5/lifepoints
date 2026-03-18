import { useState, useEffect, useCallback } from "react";
import { mockRecommendedCommunities, mockMyCommunities } from "@/constants/MockData";

export const useCommunities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [myCommunities, setMyCommunities] = useState(mockMyCommunities);
  const [recommended, setRecommended] = useState(mockRecommendedCommunities);

  const fetchCommunities = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1700);
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return {
    myCommunities,
    recommended,
    searchQuery,
    setSearchQuery,
    isLoading
  };
};
