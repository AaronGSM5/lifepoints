import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../client/api";

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
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};