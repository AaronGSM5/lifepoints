import { useQuery } from "@tanstack/react-query"

import { createCommunityDetailOptions } from "./communitiesOptions"

export const useCommunityDetail = (id) => {
  return useQuery(createCommunityDetailOptions(id))
}