import { useInfiniteQuery } from "@tanstack/react-query";

import { createVerticalRailsOptions } from "./communitiesOptions";

export const useVerticalRails = () => {
  return useInfiniteQuery({
    ...createVerticalRailsOptions(),
    getNextPageParam: (lastPage) => lastPage.verticalPagination?.hasNextRowPage ? lastPage.verticalPagination.nextRowCursor : undefined,
  });
};