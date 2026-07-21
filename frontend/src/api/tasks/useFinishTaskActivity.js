import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../client/api";

const finishTaskActivityApi = async ({ activityId, status }) => {
  return await apiRequest(`/activities/task/${activityId}/${status}`, {
    method: "PATCH",
  });
};

export const useFinishTaskActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: finishTaskActivityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};