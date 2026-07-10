import { queryOptions } from "@tanstack/react-query";

import { apiRequest } from "../client/api";

export const communityKeys = {
  all: ["communities"],
  my: () => [...communityKeys.all, "my"],
  categories: () => [...communityKeys.all, "categories"],
  verticalRails: () => [...communityKeys.all, "verticalRails"],
  horizontalRail: (category) => [...communityKeys.all, "horizontalRail", category],
  detail: (id) => [...communityKeys.all, "detail", id]
};

export const createMyCommunitiesOptions = () => queryOptions({
  queryKey: communityKeys.my(),
  queryFn: async () => await apiRequest("/communities")
})

export const createVerticalRailsOptions = () =>
  queryOptions({
    queryKey: communityKeys.verticalRails(),
    queryFn: async ({ pageParam = null }) => {
      const endpoint = pageParam ? `/communities/rails?rowCursor=${pageParam}` : "/communities/rails";
      return await apiRequest(endpoint);
    },
  });

export const createHorizontalRailOptions = (category) =>
  queryOptions({
    queryKey: communityKeys.horizontalRail(category),
    queryFn: async ({ pageParam = null }) => {
      const endpoint = pageParam
        ? `/communities/rails?category=${category}&cardCursor=${pageParam}`
        : `/communities/rails?category=${category}`;
      return await apiRequest(endpoint);
    },
    enabled: !!category,
  });

export const createCommunityDetailOptions = (id) => queryOptions({
  queryKey: communityKeys.detail(id),
  queryFn: async () => await apiRequest(`/communities/detail/${id}`),
  enabled: !!id
})