import { queryOptions } from "@tanstack/react-query";

import { apiRequest } from "../client/api";

export const notificationsKeys = {
  all: ["notifications"],
};

export const createNotificationsQueryOptions = () => {
  return queryOptions({
    queryKey: notificationsKeys.all,
    queryFn: async () => {
      const data = await apiRequest("/notifications");
      return data.announcements || [];
    }
  });
};
