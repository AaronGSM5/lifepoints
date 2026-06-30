import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl } from "./useProfileMutations";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch(`${apiBaseUrl}/notifications`);
      if (!res.ok) throw new Error("Fehler beim Laden der Notifications");
      const data = await res.json();
      return data.announcements || [];
    }
  });
};
