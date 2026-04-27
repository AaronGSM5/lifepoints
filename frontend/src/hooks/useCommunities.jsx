import { useState, useEffect, useCallback } from "react";
import useStore from "@/store/useStore";

const HORIZONTAL_PAGE_SIZE = 5;
const VERTICAL_PAGE_SIZE = 2;

const simulateFetch = (dataArray, page, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const paginatedData = dataArray.slice(startIndex, startIndex + pageSize);
      console.log(`Mock API: Geladen Seite ${page} (Größe ${pageSize}), ${paginatedData.length} Elemente`);
      resolve(paginatedData);
    }, 1500);
  });
};

export const useCommunities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const myCommunities = useStore((state) => state.communities.myCommunities);
  const recommendedCommunities = useStore((state) => state.communities.recommendedCommunities);
  const createCommunity = useStore((state) => state.createCommunity);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const fetchCommunitiesForCategory = useCallback(async (categoryKey, page) => {
    console.log(`Hook: Lade Seite ${page} für horizontale Kategorie: ${categoryKey}`);

    let dataToPaginate = [];
    if (categoryKey === "recommended_you") {
      dataToPaginate = recommendedCommunities;
    } else {
      dataToPaginate = [...recommendedCommunities].sort(() => 0.5 - Math.random());
    }

    const newData = await simulateFetch(dataToPaginate, page, HORIZONTAL_PAGE_SIZE);
    return newData;
  }, []);

  const fetchMoreSections = useCallback(async (page) => {
    console.log(`Hook: Lade neue vertikale Sektionen, Seite ${page}`);

    return new Promise((resolve) => {
      setTimeout(async () => {
        const newSectionsWithData = [];

        for (let i = 0; i < VERTICAL_PAGE_SIZE; i++) {
          const sectionIndex = (page - 1) * VERTICAL_PAGE_SIZE + i;
          const sectionId = `dyn-sec-${sectionIndex}`;
          const categoryKey = `topic_${sectionIndex}`;

          const firstPageData = await simulateFetch(recommendedCommunities, 1, HORIZONTAL_PAGE_SIZE);

          newSectionsWithData.push({
            id: sectionId,
            title: `Discover: Topic ${sectionIndex + 1}`,
            categoryKey: categoryKey,
            data: firstPageData
          });
        }
        resolve(newSectionsWithData);
      }, 2000);
    });
  }, []);

  return {
    myCommunities,
    recommended: recommendedCommunities,
    createCommunity,
    searchQuery,
    setSearchQuery,
    isLoading,
    fetchCommunitiesForCategory,
    fetchMoreSections
  };
};
