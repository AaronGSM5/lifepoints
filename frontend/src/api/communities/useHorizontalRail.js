import { useInfiniteQuery } from "@tanstack/react-query";

import { createHorizontalRailOptions } from "./communitiesOptions";

export const useHorizontalRail = (category) => {
  return useInfiniteQuery({
    ...createHorizontalRailOptions(category), getNextPageParam: (lastPage) => {
      return lastPage.pagination?.hasNextCardPage ? lastPage.pagination.nextCardCursor : undefined
    }
  });
};