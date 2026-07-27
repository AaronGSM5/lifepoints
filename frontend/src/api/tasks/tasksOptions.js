import { queryOptions } from "@tanstack/react-query";

import { apiRequest } from "../client/api";

export const tasksKeys = {
  all: ["tasks"]
}

export const createTasksQueryOptions = () => {
  return queryOptions({
    queryKey: tasksKeys.all,
    queryFn: async () => {
      const data = await apiRequest("/tasks")
      return data || []
    }
  })
}