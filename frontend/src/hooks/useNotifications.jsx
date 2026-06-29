import { useQuery } from "@tanstack/react-query";

const apiBaseUrl = "http://localhost:3000/api/v1";

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
