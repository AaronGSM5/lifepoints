import { useMutation, useQueryClient } from "@tanstack/react-query";

import { syncOptions } from "./syncOptions";

export const useSyncUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...syncOptions.syncUserMutation(),
    onSuccess: (mongoDbUser) => {
      queryClient.setQueryData(["user", "profile"], mongoDbUser);
    },
    onError: (error) => {
      console.error("User sync failed:", error);
    }
  });
};
