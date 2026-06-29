import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

const apiBaseUrl = "http://localhost:3000/api/v1";

export const communityKeys = {
  all: ["communities"],
  my: () => [...communityKeys.all, "my"],
  categories: () => [...communityKeys.all, "categories"],
  verticalRails: () => [...communityKeys.all, "verticalRails"],
  horizontalRail: (category) => [...communityKeys.all, "horizontalRail", category]
};

// export const useMyCommunities = () => {
//   return useQuery({
//     queryKey: communityKeys.my(),
//     queryFn: async () => {
//       const res = await fetch(`${apiBaseUrl}/healthcheck`);
//       return res.json();
//     }
//   });
// };

// export const useRecommendedCommunities = () => {
//   return useQuery({
//     queryKey: communityKeys.recommended(),
//     queryFn: async () => {
//       const res = await fetch(`${apiBaseUrl}/healthcheck`);
//       return res.json();
//     }
//   });
// };

// export const useCommunityCategories = () => {
//   return useQuery({
//     queryKey: communityKeys.category(),
//     queryFn: async () => {
//       const res = await fetch(`${apiBaseUrl}/communities/categories`);
//       return res.json();
//     }
//   });
// };

// export const useCreateCommunity = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (newCommunityData) => {
//       const res = await fetch(`${apiBaseUrl}/healthcheck`, {
//         method: "POST",
//         body: JSON.stringify(newCommunityData)
//       });
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: communityKeys.all });
//     }
//   });
// };

export const useVerticalCommunityRails = () => {
  return useInfiniteQuery({
    queryKey: communityKeys.verticalRails(),
    queryFn: async ({ pageParam = null }) => {
      // Wenn wir einen Cursor haben, hängen wir ihn als Parameter an die URL
      const url = new URL(`${apiBaseUrl}/communities/rails`);
      if (pageParam) url.searchParams.append("rowCursor", pageParam);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Fehler beim Laden der Community-Rails");
      console.log("BACKEND ANTWORT FÜR RAILS:", res.json());
      return res.json();
    },
    // TanStack Query fragt hier: "Was ist der Cursor für den NÄCHSTEN Fetch?"
    // Wir lesen einfach dein exzellentes Backend-Response-Objekt aus!
    getNextPageParam: (lastPage) => {
      return lastPage.verticalPagination?.hasNextRowPage ? lastPage.verticalPagination.nextRowCursor : undefined; // undefined signalisiert TanStack Query, dass wir am Ende sind
    }
  });
};

// 2. Horizontales Scrollen (Lädt mehr Cards für EINE spezifische Kategorie)
export const useHorizontalCommunityRail = (category) => {
  return useInfiniteQuery({
    queryKey: communityKeys.horizontalRail(category),
    queryFn: async ({ pageParam = null }) => {
      const url = new URL(`${apiBaseUrl}/communities/rails`);
      url.searchParams.append("category", category);
      if (pageParam) url.searchParams.append("cardCursor", pageParam);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Fehler beim Laden der Kategorie ${category}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination?.hasNextCardPage ? lastPage.pagination.nextCardCursor : undefined;
    },
    enabled: !!category // Fetch nur ausführen, wenn wir eine Kategorie haben
  });
};

import { useState, useEffect, useCallback } from "react";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { recommendedCommunities } from "@/mocks/RecommendedCommunities";

const HORIZONTAL_PAGE_SIZE = 5;
const VERTICAL_PAGE_SIZE = 2;

const simulateFetch = (dataArray, page, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const paginatedData = dataArray.slice(startIndex, startIndex + pageSize);
      resolve(paginatedData);
    }, 1500);
  });
};

export const useCommunities = () => {
  const { t } = useTranslation("community");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const myCommunities = useStore((state) => state.myCommunities);
  const createCommunity = useStore((state) => state.createCommunity);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const fetchCommunitiesForCategory = useCallback(async (categoryKey, page) => {
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
            title: `${t("Discover")}: ${t("Topic")} ${sectionIndex + 1}`,
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
