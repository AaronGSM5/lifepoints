// import { useCallback, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// import { useQuery } from "@tanstack/react-query";

// import { recommendedCommunities } from "@/mocks/RecommendedCommunities";
// import useStore from "@/store/useStore";
// import { createMyCommunitiesOptions } from "./communitiesOptions";



// export const useCommunities = () => useQuery(createMyCommunitiesOptions());

// const HORIZONTAL_PAGE_SIZE = 5;
// const VERTICAL_PAGE_SIZE = 2;

// const simulateFetch = (dataArray, page, pageSize) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const startIndex = (page - 1) * pageSize;
//       const paginatedData = dataArray.slice(startIndex, startIndex + pageSize);
//       resolve(paginatedData);
//     }, 1500);
//   });
// };

// export const useCommunities = () => {
//   const { t } = useTranslation("community");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const myCommunities = useStore((state) => state.myCommunities);
//   const createCommunity = useStore((state) => state.createCommunity);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1200);

//     return () => clearTimeout(timer);
//   }, []);

//   const fetchCommunitiesForCategory = useCallback(async (categoryKey, page) => {
//     let dataToPaginate = [];
//     if (categoryKey === "recommended_you") {
//       dataToPaginate = recommendedCommunities;
//     } else {
//       dataToPaginate = [...recommendedCommunities].sort(() => 0.5 - Math.random());
//     }

//     const newData = await simulateFetch(dataToPaginate, page, HORIZONTAL_PAGE_SIZE);
//     return newData;
//   }, []);

//   const fetchMoreSections = useCallback(
//     async (page) => {
//       return new Promise((resolve) => {
//         setTimeout(async () => {
//           const newSectionsWithData = [];

//           for (let i = 0; i < VERTICAL_PAGE_SIZE; i++) {
//             const sectionIndex = (page - 1) * VERTICAL_PAGE_SIZE + i;
//             const sectionId = `dyn-sec-${sectionIndex}`;
//             const categoryKey = `topic_${sectionIndex}`;

//             const firstPageData = await simulateFetch(recommendedCommunities, 1, HORIZONTAL_PAGE_SIZE);

//             newSectionsWithData.push({
//               id: sectionId,
//               title: `${t("Discover")}: ${t("Topic")} ${sectionIndex + 1}`,
//               categoryKey: categoryKey,
//               data: firstPageData
//             });
//           }
//           resolve(newSectionsWithData);
//         }, 2000);
//       });
//     },
//     [t]
//   );

//   return {
//     myCommunities,
//     recommended: recommendedCommunities,
//     createCommunity,
//     searchQuery,
//     setSearchQuery,
//     isLoading,
//     fetchCommunitiesForCategory,
//     fetchMoreSections
//   };
// };
