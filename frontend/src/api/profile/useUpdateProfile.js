import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileKeys } from "./profileOptions";
import { apiRequest } from "../client/api";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData) => {
      return await apiRequest("/profile/update", {
        method: "PATCH",
        body: JSON.stringify(updatedData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me });
    }
  });
};
