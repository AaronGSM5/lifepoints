import { useQuery } from "@tanstack/react-query";

import { createNotificationsQueryOptions } from "./notificationsOptions";

export const useNotifications = () => {
  return useQuery(createNotificationsQueryOptions())
}