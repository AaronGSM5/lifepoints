import { useQuery } from "@tanstack/react-query"

import { createTasksQueryOptions } from "./tasksOptions"

export const useTasks = () => {
  return useQuery(createTasksQueryOptions())
}