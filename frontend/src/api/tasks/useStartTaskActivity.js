import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../client/api";
import { tasksKeys } from "./tasksOptions";

const startTaskActivityApi = async (taskId) => {
  return await apiRequest(`/activities/task/${taskId}`, {
    method: "POST",
  });
};

export const useStartTaskActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTaskActivityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};