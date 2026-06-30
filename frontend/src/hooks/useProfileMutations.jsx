import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileKeys, apiBaseUrl } from "./useProfileQueries";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch(`${apiBaseUrl}/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });

      if (!res.ok) throw new Error("Fehler beim Speichern des Profils");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me });
    }
  });
};
